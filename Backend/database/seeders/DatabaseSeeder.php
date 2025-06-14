<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\Grade;
use App\Models\LessonSchedule;
use App\Models\Presence;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Database\Factories\PresenceFactory;
use Database\Seeders\Pivot\CourseSubjectSeeder;
use Database\Seeders\pivot\CourseTeacherSeeder;
use Database\Seeders\pivot\StudentSubjectSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use PhpParser\Node\Expr\AssignRef;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // crea materie, per ogni materia 
        $subjectsCount = 10;
        Subject::factory($subjectsCount)->create()->each(function ($subject) {
            //  - crea uno o piu teacher
            Teacher::factory(rand(1, 3))->create(["subject_id" => $subject->id]);
        });

        // crea i corsi, per ogni corso:
        Course::factory(12)->create()->each(function ($course) use ($subjectsCount) {
            $courseId = $course->id;
            // - assegna 6-10 materie
            for ($i = 1; $i <= rand(6, $subjectsCount); $i++) {
                // per ogni materia:
                // - prendi un teacher random di quella materia e assegnalo al corso
                $subjectId = $i;
                $course->subjects()->attach($subjectId);
                $teacher = Teacher::where('subject_id', $subjectId)->inRandomOrder()
                    ->first();
                $teacher->courses()->attach($courseId);

                for ($j = 1; $j <= 5; $j++) {
                    // - crea max 5 lesson schedule
                    $subject = Subject::find($subjectId);
                    if (rand(0, 1)) {
                        LessonSchedule::factory()->create([
                            'course_id' => $courseId,
                            'subject_id' => $subjectId,
                            'course_name' => $course->name,
                            'subject_name' => $subject->name,
                            'day' => $j
                        ]);
                    }

                    // - crea max 5 degli assignments
                    if (rand(0, 1)) {
                        Assignment::factory()->create([
                            'course_id' => $courseId,
                            'subject_id' => $subjectId,
                        ]);
                    }
                }
            }
            // crea studenti, per ogni studente:
            Student::factory(30)->create(['course_id' =>  $courseId])->each(function ($student) use ($course) {
                // - crea delle presenze a partire da una settimana fa ad oggi
                for ($i = 7; $i >= 0; $i--) {
                    Presence::factory()->create([
                        'student_id' => $student->id,
                        'date' => Carbon::now()->subDays($i)->toDateString(),
                    ]);
                }
                // - crea un voto per ogni sua materia
                $course->subjects()->each(function ($subject) use ($student) {
                    Grade::create([
                        'student_id' => $student->id,
                        'subject_id' => $subject->id,
                        'grade' => rand(15, 30),
                        'date' => fake()->dateTimeBetween('-1 week', 'now'),

                    ]);
                });
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
        $coursesIds = $subject->courses()->inRandomOrder()->limit(3)->get()->pluck('id')->toArray();
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
        for ($i = 7; $i >= 0; $i--) {
            Presence::factory()->create([
                'student_id' => $studentExample->id,
                'date' => Carbon::now()->subDays($i)->toDateString(),
            ]);
        }
        // - crea un voto per ogni sua materia
        $course->subjects()->each(function ($subject) use ($studentExample) {
            Grade::create([
                'student_id' => $studentExample->id,
                'subject_id' => $subject->id,
                'grade' => rand(15, 30),
                'date' => fake()->dateTimeBetween('-1 week', 'now'),

            ]);
        });
    }
}