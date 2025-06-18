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
        'first_name',
        'last_name',
        'email',
    ];

    public function presences()
    {
        return $this->hasMany(Presence::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function notes()
    {
        return $this->belongsToMany(Teacher::class, 'notes')->using(Note::class)->withPivot('body');
    }
}