<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

//  !vedere bene come si relazione alle altre tabelle
class Exam extends Pivot
{
    use HasFactory;

    protected $table = "exams";

    protected $fillable = [
        'course_id',
        'subject_id',
        'topic',
        'date',
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}