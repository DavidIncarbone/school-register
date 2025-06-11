<?php

namespace Database\Factories;

use App\Models\Presence;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use PhpParser\Node\Expr\Cast\Bool_;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Presence>
 */
class PresenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $studentsCount = Student::all()->count();

        return [
            "student_id" => rand(1, $studentsCount),
            "is_present" => (bool)rand(0, 1),
            "date" => fake()->dateTimeBetween('-1 year', "now"),
        ];
    }
}