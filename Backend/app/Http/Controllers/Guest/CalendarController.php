<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class CalendarController extends Controller
{
    public function index()
    {

        // corso, materia, giorno(oggi)

        $user = request()->user();
        $teacher = Teacher::where("email", $user->email)->first();
        $coursesIds = $teacher->courses->pluck('id')->toArray();
        $subject = Subject::findOrFail($teacher->subject_id);
        $subjectId = $subject->id;
        $today = Carbon::now()->format("l");
        Log::info($today);

        $todaySchedule = $subject->calendar()
            ->wherePivotIn('course_id', $coursesIds)
            ->wherePivot('subject_id', $subjectId)
            ->wherePivot('day', 'like', strtolower($today))
            ->get()->pluck('pivot');

        return response()->json($todaySchedule);
    }
}