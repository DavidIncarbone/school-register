<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();

        $student = Student::where('email', $user->email)->firstOrFail();

        $course = Course::findOrFail($student->course_id);

        $subjects = $course->subjects()->get();

        return response()->json([
            'success' => true,
            'message' => "Operazione effettuata con successo",
            'data' =>  $subjects,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        $subject->load(['lesson_schedules', 'exams']);

        return response()->json([
            'success' => true,
            'message' => "Operazione effettuata con successo",
            'data' =>  $subject,
        ]);
    }
}