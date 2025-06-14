<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonSchedule extends Model
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