<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjectsCount = Subject::all()->count();
        Teacher::factory()->create([
            "subject_id" => rand(1, $subjectsCount),
            "first_name" => "Luigi",
            "last_name" => "Mosca",
            "email" => "mosca@example.com"
        ]);

        Teacher::factory(20)->create();/*->each(function ($t) use ($courseCount) {
            $t->courses()->attach(rand(1, $courseCount));
        });*/
    }
}
