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
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
