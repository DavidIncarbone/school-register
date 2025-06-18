<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    // todo: da finire! riflettere bene sulla logica e su COSA MOSTRARE in base al userType
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            'course_id' => 'integer|exists:courses,id',
            'subject_id' => 'integer|exists:subjects,id',
            "sort" => ['string', 'in:by_date,by_grade,by_student_id'],
            "dir" => ['string', 'in:asc,desc'],
        ]);

        $dir = request()->dir ?? 'asc';
        $sort = request()->sort ?? 'by_date';

        $user = request()->user();

        if ($user->type === "teacher") {
            $teacher = Teacher::where("email", $user->email)->firstOrFail();
            // ! controllo di course_id required
            $exams = Exam::where('course_id', request()->course_id)->where('subject_id', $teacher->subject_id);
            return response()->json($exams->get());
        } elseif ($user->type === "student") {
            $student = Student::where("email", $user->email)->firstOrFail();
            // ! controllo di subject_id required
            $exams = Exam::where('student_id', $student->id)->where('subject_id', request()->subject_id);
            return response()->json($exams->get());
        }

        // $exams->orderBy()
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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