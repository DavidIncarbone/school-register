<?php

namespace Database\Seeders;

use App\Models\Course;
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
        $courseCount = Course::all()->count();
        Teacher::factory(20)->create()->each(function ($t) use ($courseCount) {
            $t->courses()->attach(rand(1, $courseCount));
            // $t->update();
        });
    }
}