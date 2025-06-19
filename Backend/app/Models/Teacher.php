<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    /** @use HasFactory<\Database\Factories\TeacherFactory> */
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'first_name',
        'last_name',
        'email'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withTimestamps();
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function notes()
    {
        return $this->belongsToMany(Student::class, 'notes')->using(Note::class)->withPivot('body');
    }
}