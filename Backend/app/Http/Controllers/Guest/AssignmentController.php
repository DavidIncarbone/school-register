<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Course;
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

        $dir = request()->dir ?? 'asc';
        $sort = request()->sort ?? 'by_assignment_date';

        $user = request()->user();
        $result = [];

        if ($user->type == 'teacher') {
            $teacher = Teacher::where('email', $user->email)->firstOrFail();
            $subjectId = $teacher->subject_id;
            $courseId = request()->course_id;
            $teacher->courses()->findOrFail($courseId);

            $result = Assignment::where("subject_id", $subjectId)
                ->where("course_id", $courseId)
                ->with(['course']);
        } elseif ($user->type == "student") {
            $student = Student::where('email', $user->email)->firstOrFail();
            $courseId = $student->course_id;

            $result = Assignment::where("course_id", $courseId);

            if (request()->subject_id) {
                $subjectId = request()->subject_id;
                Course::find($courseId)->subjects()->findOrFail($subjectId);
                $result->where("subject_id", $subjectId);
            }

            $result->with(['subject']);
        }

        if ($sort === 'by_assignment_date') {
            $result->orderBy("assignment_date", $dir);
        } elseif ($sort === 'by_deadline') {
            $result->orderBy("deadline", $dir);
        }

        return response()->json($result->paginate(4));
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
            'message' => 'Assignment creato con successo',
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
    public function update(Request $request, Assignment $assignment)
    {
        $request->validate([
            // 'assignment_id' => ['integer', 'min:1'],
            'body' => ['string', 'min:1', 'max:255'],
            'assignment_date' => ['date'],
            'deadline' => ['date'],
        ]);

        $user = $request->user();

        $teacher = Teacher::where("email", $user->email)->firstOrFail();

        // $course = $teacher->courses()->findOrFail($request->course_id);

        // $assignment->course_id = $course->id;
        // $assignment->subject_id = $teacher->subject_id;
        $assignment->body = $request->body;
        $assignment->assignment_date = $request->assignment_date;
        $assignment->deadline = $request->deadline;

        $isClean = $assignment->isClean();
        Log::info($isClean);

        $assignment->update();

        return response()->json([
            'success' => true,
            'message' => 'Assignment modificato con successo',
            'data' => $assignment,
            'isClean' => $isClean
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->deleteOrFail();
        return response()->json([], 204);
    }
}