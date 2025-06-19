<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class LessonSchedule extends Pivot
{
    use HasFactory;

    protected $table = 'lesson_schedules'; // <-- nome della tabella nel database

    protected $fillable = [
        'course_id',
        'subject_id',
        'course_name',
        'subject_name',
        'day',
        'lesson_time'
    ];
}