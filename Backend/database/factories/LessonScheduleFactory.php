<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LessonSchedule>
 */
class LessonScheduleFactory extends Factory
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
            'course_name' => 'default_course_name',
            'subject_name' => 'default_subject_name',
            'day' => rand(1, 5),
            'lesson_time' => rand(1, 8)
        ];
    }
}