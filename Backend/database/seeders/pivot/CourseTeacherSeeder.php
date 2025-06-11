<?php

namespace Database\Seeders\pivot;

use App\Models\Course;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseCount = Course::all()->count();
        $teachersCount = Teacher::all()->count();
        for ($i = 1; $i < $teachersCount; $i++) {
            $teacher = Teacher::find($i);
            for ($j = 1; $j < rand(1, $courseCount); $j++) {
                $teacher->courses()->attach($j);
            }
        }
    }
}
