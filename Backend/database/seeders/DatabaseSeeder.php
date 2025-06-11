<?php

namespace Database\Seeders;

use App\Models\Course;
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
            PresenceSeeder::class,

            // PIVOT

            CourseSubjectSeeder::class,
            CourseTeacherSeeder::class,
            StudentSubjectSeeder::class,
        ]);
    }
}
