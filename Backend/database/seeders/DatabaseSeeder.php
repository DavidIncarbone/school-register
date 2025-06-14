<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\LessonSchedule;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Database\Seeders\Pivot\CourseSubjectSeeder;
use Database\Seeders\pivot\CourseTeacherSeeder;
use Database\Seeders\pivot\StudentSubjectSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            SubjectSeeder::class,
            CourseSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            // PresenceSeeder::class,

            // PIVOT

            CourseSubjectSeeder::class,
            CourseTeacherSeeder::class,
            StudentSubjectSeeder::class,
        ]);

        $teacherExample = Teacher::find(1);
        $subjectsCount = Subject::all()->count();
        $teacherExample->courses()->each(function ($course) use ($subjectsCount, $teacherExample) {
            for ($i = 1; $i <= rand(1, $subjectsCount); $i++) {

                LessonSchedule::create([
                    'course_id' => $course->id,
                    'subject_id' => $teacherExample->subject_id,
                    'course_name' => $course->name,
                    'subject_name' => Subject::find($teacherExample->subject_id)->name,
                    "day" => rand(1, 5),
                    "lesson_time" => rand(1, 8),
                ]);
            }
        });
    }
}