<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'credits'
    ];

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class)->withTimestamps();
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class)->distinct('subject_id')->withTimestamps();
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function calendar()
    {
        return $this->belongsToMany(Subject::class)->withPivot(['day', 'lesson_time'])->withTimestamps();
    }
}
