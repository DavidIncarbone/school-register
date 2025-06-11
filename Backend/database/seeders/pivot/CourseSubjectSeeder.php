<?php

namespace Database\Seeders\Pivot;

use App\Models\Course;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coursesCount = Course::all()->count();
        $subjectsCount = Subject::all()->count();

        for ($i = 1; $i <= $coursesCount; $i++) {
            $course = Course::find($i);

            for ($j = 1; $j <= 4; $j++)
                $course->subjects()->attach(rand(1, $subjectsCount), [
                    "day" => "monday",
                    "lesson_time" => $j,
                ]);
            for ($j = 1; $j <= 4; $j++)
                $course->subjects()->attach($j, [
                    "day" => "tuesday",
                    "lesson_time" => $j,
                ]);
            for ($j = 1; $j <= 4; $j++)
                $course->subjects()->attach($j, [
                    "day" => "wednesday",
                    "lesson_time" => $j,
                ]);
        }
    }
}
