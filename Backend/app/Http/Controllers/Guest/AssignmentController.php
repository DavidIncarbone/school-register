<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            "course_id" => ["integer", "min:1"],
            "subject_id" => ["integer", "min:1"],
            "sort" => ['string', 'in:by_assignment_date,by_deadline'],
            "dir" => ['string', 'in:asc,desc'],
        ]);

        $user = request()->user();

        if ($user->type == 'teacher') {

            $teacher = Teacher::where('email', $user->email)->firstOrFail();

            $subjectId = $teacher->subject_id;
            $courseId = request()->course_id;
            $teacher->courses()->findOrFail($courseId);
            $assignments = Assignment::where("subject_id", $subjectId)->where("course_id", $courseId)->get();

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $assignments,
            ], 200);
        } else if ($user->type == "student") {
            $student = Student::where('email', $user->email)->firstOrFail();
            $courseId = $student->course_id;
            $subjectId = request()->subject_id;
            $student->subjects()->findOrFail($subjectId);

            $assignments = Assignment::where("course_id", $courseId)->where("subject_id", $subjectId)->get();

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $assignments,
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'course_id' => ['required', 'integer', 'min:1'],
            'body' => ['required', 'string', 'min:1', 'max:255'],
            'assignment_date' => ['required', 'date'],
            'deadline' => ['required', 'date'],
        ]);

        $user = $request->user();

        $teacher = Teacher::where("email", $user->email)->firstOrFail();

        $course = $teacher->courses()->findOrFail($request->course_id);

        $newAssignment = new Assignment();

        $newAssignment->course_id = $course->id;
        $newAssignment->subject_id = $teacher->subject_id;
        $newAssignment->body = $request->body;
        $newAssignment->assignment_date = $request->assignment_date;
        $newAssignment->deadline = $request->deadline;

        $newAssignment->save();

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $newAssignment,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}