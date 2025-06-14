<?php

namespace Database\Factories;

use App\Models\Presence;
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

        return [
            "student_id" => 1,
            "is_present" => (bool)rand(0, 1),
            "date" => fake()->dateTimeBetween('-1 year', "now"),
        ];
    }
}