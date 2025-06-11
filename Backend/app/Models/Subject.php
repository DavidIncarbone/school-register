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

    public function students()
    {
        return $this->belongsToMany(Student::class)->withTimestamps();;
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withTimestamps();
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function calendar()
    {
        return $this->belongsToMany(Course::class)->withPivot(['day', 'lesson_time'])->withTimestamps();
    }
}