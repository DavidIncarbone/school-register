<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseCount = Course::all()->count();
        Student::factory()->create([
            "course_id" => 5,
            "first_name" => "Danilo",
            "last_name" => "Insegno",
            "email" => "insegno@example.com"
        ]);
        Student::factory(200)->create();
    }
}
