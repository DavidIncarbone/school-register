<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\LessonSchedule;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class LessonScheduleController extends Controller
{
    public function index()
    {

        // fixme: non utilizzare attach ma direttamente il modello LessonSchedule
        request()->validate([
            'show_week' => 'boolean',
        ]);

        $showWeek = request()->show_week ?? false;

        $user = request()->user();

        if ($user->type === "teacher") {
            $teacher = Teacher::where("email", $user->email)->first();
            $coursesIds = $teacher->courses->pluck('id')->toArray();


            $subject = Subject::findOrFail($teacher->subject_id);

            $lessonSchedules = LessonSchedule::whereIn('course_id', $coursesIds)->where('subject_id', $subject->id);

            if (!$showWeek) {
                $day = Carbon::now()->format("l");
                $lessonSchedules->where('day', 'like', strtolower($day));
            }

            $results = $lessonSchedules->get();

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $results
            ]);
        } elseif ($user->type === "student") {

            $student = Student::where("email", $user->email)->first();
            $course = Course::findOrFail($student->course_id);
            $lessonSchedules = LessonSchedule::where("course_id", $course->id);
            $results = $lessonSchedules->get();
            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $results
            ]);
        }
    }
}