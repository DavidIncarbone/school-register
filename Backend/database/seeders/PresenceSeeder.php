<?php

namespace Database\Seeders;

use App\Models\Presence;
use App\Models\Student;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class PresenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {
        $studentsCount = Student::all()->count();

        for ($i = 0; $i < $studentsCount; $i++) {

            Presence::factory(5)->create()->each(function ($presence) use ($i) {

                $presence->student_id = $i + 1;
                $presence->update();
            });
        }
    }
}