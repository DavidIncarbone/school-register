<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $email = $request->user()->email;
        $teacher = Teacher::where("email", $email)->firstOrFail();

        $courses = $teacher->courses()->with('subjects')->withCount("students")->get();

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $courses,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        // Log::info($course);
        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $course,
        ], 200);
    }
}