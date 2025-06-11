<?php

namespace Database\Seeders\pivot;

use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class StudentSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studentsCount = Student::all()->count();

        $subjects = Subject::all();
        for ($i = 1; $i < $studentsCount; $i++) {
            $student = Student::find($i);
            $courseId = $student->course_id;
            $course = Course::find($courseId);
            $subjectsIds = $course->subjects->pluck("id")->unique()->toArray();
            foreach ($subjectsIds as $id) {
                $student->subjects()->attach($id, [
                    "vote" => rand(1, 10),
                    "date" => Carbon::now(),
                ]);
            }
        }
    }
}
