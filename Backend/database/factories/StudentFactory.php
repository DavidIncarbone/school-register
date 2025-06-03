<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $courseCount = Course::all()->count();

        return [
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "tax_id" => fake()->unique()->word(),
            "course_id" => rand(1, $courseCount),
        ];
    }
}