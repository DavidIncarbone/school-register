<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mockery\Matcher\Subset;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'credits'
    ];

    public function subjects()
    {
        return $this->belongsToMany(Subject::class)->withTimestamps();
    }
    public function lessonSchedules()
    {
        return $this->belongsToMany(Subject::class, 'lesson_schedules')->using(LessonSchedule::class)->withPivot(['course_name', 'subject_name', 'day', 'lesson_time']);
    }
    public function assignments()
    {
        return $this->belongsToMany(Subject::class, "assignments")->using(Assignment::class)->withPivot(["body", "assignment_date", "deadline"]);
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class)->withTimestamps();
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}