<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'subject_id',
        'body',
        'assignment_date',
        'deadline'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}