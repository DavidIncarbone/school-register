<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::factory(10)->create()->each(function ($course) {
            for ($i = 0; $i < rand(6, 8); $i++) {
                $subject = Subject::factory()->create();
                $course->subjects()->attach($subject->id);
            }
        });
    }
}