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
            'course_id' => 'required|integer|exists:courses,id',
            "dir" => ['string', 'in:asc,desc'],
        ]);
        $courseId = request()->course_id;
        $dir = request()->dir ?? 'desc';

        $teacher = $this->getTeacher();
        $teacher->courses()->findOrFail($courseId);

        $exams = Exam::where('course_id', request()->course_id)
            ->where('subject_id', $teacher->subject_id)
            ->orderBy('date', $dir)->get();

        return response()->json([
            "success" => true,
            "message" => "Operazione effettuata con successo",
            'data' => $exams
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'topic' => 'required|string|min:1|max:255',
            'date' => 'required|date'
        ]);
        $courseId = $request->course_id;
        $topic = $request->topic;
        $date = $request->date;

        $teacher = $this->getTeacher();
        $teacher->courses()->findOrFail($courseId);

        $newExam =  Exam::create([
            'course_id' => $courseId,
            'subject_id' => $teacher->subject_id,
            'topic' => $topic,
            'date' => $date,
        ]);

        return response()->json([
            "success" => true,
            "message" => "Esame creato con successo",
            'data' => $newExam,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $this->checkExam($exam);

        return response()->json([
            "success" => true,
            "message" => "Operazione effettuata con successo",
            'data' => $exam
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        $request->validate([
            'topic' => 'string|min:1|max:255',
            'date' => 'date'
        ]);
        $topic = $request->topic ?? $exam->topic;
        $date = $request->date ?? $exam->date;

        $this->checkExam($exam);

        $exam->update([
            'topic' => $topic,
            'date' => $date,
        ]);

        return response()->json([
            "success" => true,
            "message" => "Esame modificato con successo",
            'data' => $exam,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Exam $exam)
    {
        $this->checkExam($exam);

        $exam->deleteOrFail();

        return response()->json([], 204);
    }

    private function getTeacher()
    {
        $user = request()->user();
        $teacher = Teacher::where("email", $user->email)->firstOrFail();
        return $teacher;
    }

    private function checkExam(Exam $exam)
    {

        $teacher = $this->getTeacher();


        $teacher->courses()->findOrFail($exam->course_id);

        if ($exam->subject_id != $teacher->subject_id) {
            return response()->json([
                "success" => false,
                "message" => "Operazione non autorizzata",
            ], 401);
        }
    }
}