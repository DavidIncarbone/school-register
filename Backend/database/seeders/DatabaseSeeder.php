<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Luigi Mosca',
            'email' => 'admin@example.com',
            'password' => 'ciaociao'
        ]);

        $this->call([
            SubjectSeeder::class,
            CourseSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            PresenceSeeder::class,
        ]);

        $subjectsCount = Subject::all()->count();
        $courseCount = Course::all()->count();
        $teacher = Teacher::factory()->create([
            "subject_id" => rand(1, $subjectsCount),
            "first_name" => "Luigi",
            "last_name" => "Mosca",
            "email" => "admin@example.com"

        ]);

        // $nCourses = 

        for ($i = 0; $i < rand(2, $courseCount); $i++) {
            $teacher->courses()->attach($i + 1);
        }
    }
}