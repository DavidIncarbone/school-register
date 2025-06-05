<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'course_id',
        // 'tax_code',
        'first_name',
        'last_name',
        'email',
    ];



    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }

    public function presences()
    {
        return $this->hasMany(Presence::class);
    }
}