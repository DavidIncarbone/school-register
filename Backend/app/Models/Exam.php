<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//  !vedere bene come si relazione alle altre tabelle
class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_id',
        'course_id',
        'topic',
        'grade',
        'date',
    ];
}