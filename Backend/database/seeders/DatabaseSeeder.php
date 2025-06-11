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

        $this->call([
            UserSeeder::class,
            CourseSeeder::class,
            SubjectSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            PresenceSeeder::class,
        ]);

        $coursesCount = Course::all()->count();

        for ($i = 1; $i <= $coursesCount; $i++) {
            $course = Course::find($i);

            for ($j = 1; $j <= 4; $j++)
                $course->subjects()->attach($j, [
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
            // $course->subjects()->attach(2, [
            //     "day" => "tuesday",
            //     "lesson_time" => "2",
            // ]);
            // $course->subjects()->attach(3, [
            //     "day" => "wednesday",
            //     "lesson_time" => "3",
            // ]);
        }
    }
}