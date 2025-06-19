<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Assignment extends Pivot
{
    use HasFactory;

    protected $table = 'assignments';

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
}