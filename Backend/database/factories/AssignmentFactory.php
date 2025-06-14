<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => 1,
            'subject_id' => 1,
            'body' => fake()->sentence(100),
            'assignment_date' => fake()->dateTimeBetween('-1 week', 'now'),
            'deadline' => fake()->dateTimeBetween('+2 days', '+1 week'),
        ];
    }
}