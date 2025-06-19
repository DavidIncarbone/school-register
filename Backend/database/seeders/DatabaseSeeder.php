<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\LessonSchedule;
use App\Models\Note;
use App\Models\Presence;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // crea materie, per ogni materia 
        $subjectsCount = 4;
        Subject::factory($subjectsCount)->create()->each(function ($subject) {
            //  - crea uno o piu teacher
            Teacher::factory(rand(1, 1))->create(["subject_id" => $subject->id]);
        });

        // crea i corsi, per ogni corso:
        Course::factory(6)->create()->each(function ($course) use ($subjectsCount) {
            $courseId = $course->id;
            // - assegna 6-10 materie
            for ($i = 1; $i <= $subjectsCount; $i++) {
                // per ogni materia:
                // - prendi un teacher random di quella materia e assegnalo al corso
                $subjectId = $i;
                $subject = Subject::find($subjectId);
                $course->subjects()->attach($subjectId);
                $teacher = Teacher::where('subject_id', $subjectId)->inRandomOrder()
                    ->first();
                $teacher->courses()->attach($courseId);

                for ($j = 1; $j <= 5; $j++) {
                    // - crea max 5 lesson schedule
                    LessonSchedule::factory()->create([
                        'course_id' => $courseId,
                        'subject_id' => $subjectId,
                        'course_name' => $course->name,
                        'subject_name' => $subject->name,
                        'day' => $j
                    ]);

                    // - crea max 5 assignments
                    Assignment::factory()->create([
                        'course_id' => $courseId,
                        'subject_id' => $subjectId,
                    ]);
                }

                // - crea due esami
                for ($k = 1; $k <= 2; $k++) {
                    Exam::factory()->create([
                        'course_id' => $courseId,
                        'subject_id' => $subjectId,
                        'topic' => fake()->sentence(2),
                        'date' => fake()->dateTimeBetween('-1 week', '-1 day'),
                    ]);
                }
            }
            // crea studenti, per ogni studente:
            Student::factory(20)->create(['course_id' =>  $courseId])->each(function ($student) use ($course) {
                // - crea delle presenze a partire da una settimana fa ad oggi
                for ($i = 7; $i >= 0; $i--) {
                    Presence::factory()->create([
                        'student_id' => $student->id,
                        'date' => Carbon::now()->subDays($i)->toDateString(),
                    ]);
                }

                // - crea un voto per ogni esame del corso
                $course->exams()->each(function ($exam) use ($student) {
                    Grade::create([
                        'exam_id' => $exam->id,
                        'student_id' => $student->id,
                        'grade' => rand(15, 30),
                    ]);
                });

                // Log::info($student->course());
                // - crea una nota (bias)
                if (fake()->boolean(20)) {

                    $randTeacher = Course::find($student->course_id)->teachers()->inRandomOrder()->first();

                    Note::create([
                        'student_id' => $student->id,
                        'teacher_id' => $randTeacher->id,
                        'body' => fake()->sentence(6),
                    ]);
                }
            });
        });

        // creazione profili abilitati
        $this->call([
            UserSeeder::class,
        ]);

        // teacher prova
        $subject = Subject::inRandomOrder()->first();
        $subjectId = $subject->id;
        $teacherExample = Teacher::create([
            'first_name' => 'danilo',
            'last_name' => 'mosca',
            'email' => 'mosca@example.com',
            'subject_id' => $subjectId,
        ]);
        $coursesIds = $subject->courses()->inRandomOrder()->limit(6)->get()->pluck('id')->toArray();
        foreach ($coursesIds as $courseId) {
            $teacherExample->courses()->attach($courseId);
        }

        // student prova
        $course = Course::inRandomOrder()->first();
        $courseId = $course->id;
        $studentExample = Student::create([
            'first_name' => 'luigi',
            'last_name' => 'raciti',
            'email' => 'raciti@example.com',
            'course_id' => $courseId,
        ]);
        // - crea delle presenze a partire da una settimana fa ad oggi
        for ($i = 7; $i > 1; $i--) {
            Presence::factory()->create([
                'student_id' => $studentExample->id,
                'date' => Carbon::now()->subDays($i)->toDateString(),
            ]);
        }
        // - crea un voto per ogni esame di ogni sua materia
        $course->exams()->each(function ($exam) use ($studentExample) {
            Grade::create([
                'exam_id' => $exam->id,
                'student_id' => $studentExample->id,
                'grade' => rand(15, 30),
            ]);
        });
    }
}