<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    /** @use HasFactory<\Database\Factories\PresenceFactory> */
    use HasFactory;

    protected $fillable = [
        "student_id",
        "is_present",
        "date",
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}