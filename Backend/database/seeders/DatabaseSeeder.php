<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Student;
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

        User::factory()->createMany([[
            'name' => 'AJ',
            'email' => 'aj@example.com',
            'type' => 'admin',
            'password' => 'ciaociao'
        ], [
            'name' => 'David',
            'email' => 'david@example.com',
            'type' => 'admin',
            'password' => 'ciaociao'
        ], [
            'name' => 'Danilo',
            'email' => 'mosca@example.com',
            'type' => 'teacher',
            'password' => 'ciaociao'
        ], [
            'name' => 'Luigi',
            'email' => 'raciti@example.com',
            'type' => 'student',
            'password' => 'ciaociao'
        ]],);

        $this->call([
            CourseSeeder::class,
            SubjectSeeder::class,
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
            "email" => "mosca@example.com"
        ]);


        for ($i = 0; $i < rand(2, $courseCount); $i++) {
            $teacher->courses()->attach($i + 1);
        }
        Student::factory()->create([
            "course_id" => rand(1, $courseCount),
            "first_name" => "Danilo",
            "last_name" => "Raciti",
            "email" => "raciti@example.com"
        ]);
    }
}