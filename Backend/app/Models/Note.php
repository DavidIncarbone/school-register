<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Note extends Pivot
{
    protected $table = "notes";

    protected $fillable = [
        "student_id",
        "teacher_id",
        "body",
    ];
}