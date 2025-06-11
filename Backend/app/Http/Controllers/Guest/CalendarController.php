<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class CalendarController extends Controller
{
    public function index()
    {

        request()->validate([
            'show_week' => 'boolean',
        ]);

        $showWeek = request()->show_week ?? false;

        $user = request()->user();

        if ($user->type === "teacher") {
            $teacher = Teacher::where("email", $user->email)->first();
            $coursesIds = $teacher->courses->pluck('id')->toArray();
            $day = Carbon::now()->format("l");

            $subject = Subject::findOrFail($teacher->subject_id);

            $calendar = $subject->calendar()
                ->wherePivotIn('course_id', $coursesIds)
                ->wherePivot('subject_id', $subject->id);

            if (!$showWeek) {
                $calendar->wherePivot('day', 'like', strtolower($day));
            }

            $results = $calendar->get()->pluck('pivot');

            return response()->json($results);
        } elseif ($user->type === "student") {
            $student = Student::where("email", $user->email)->first();
            $course = Course::findOrFail($student->course_id);

            $calendar = $course->calendar()->wherePivot("course_id", $course->id);
            $results = $calendar->get()->pluck('pivot');
            return response()->json($results);
        }
    }
}