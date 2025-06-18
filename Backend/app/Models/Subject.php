<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withTimestamps();
    }
    public function lessonSchedules()
    {
        return $this->belongsToMany(Subject::class, 'lesson_schedules')->using(LessonSchedule::class)->withPivot(['day', 'lesson_time'])->withTimestamps();
    }
    public function assignments()
    {
        return $this->belongsToMany(Course::class, "assignments")->using(Assignment::class)->withPivot(["body", "assignment_date", "deadline"])->withtimestamps();
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function exams()
    {
        return $this->belongsToMany(Student::class, 'exams')->using(Exam::class)->withPivot(['topic', 'grade', 'date']);
    }
}