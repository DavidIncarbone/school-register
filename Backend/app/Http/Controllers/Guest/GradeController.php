<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            'exam_id' => 'required|integer|min:1'
        ]);
        $examId = request()->exam_id;

        $user = request()->user();

        if ($user->type === "teacher") {
            $grades = Grade::where('exam_id', $examId)
                ->with(['exam', 'student'])
                ->join('students', 'grades.student_id', '=', 'students.id')
                ->orderBy('students.last_name')
                ->select('grades.*') // Per evitare conflitti di colonne
                ->get();
            return response()->json([
                'success' => true,
                'message' => "Operazione effettuata con successo",
                'data' =>  $grades,
            ]);
        } elseif ($user->type === "student") {
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "exam_id" => ["required", "integer", "min:1"],
                "students_ids" => ["required", "array"],
                "grades" => ["required", "array"]
            ]
        );
        $examId = $request->exam_id;
        $studentsIds = $request->students_ids;
        $grades = $request->grades;

        $exam = Exam::findOrFail($examId);
        $this->checkExam($exam);

        $i = 0;
        foreach ($studentsIds as $studentId) {
            Grade::create([
                'exam_id' => $examId,
                'student_id' => $studentId,
                'grade' => $grades[$i],
            ]);
            $i++;
        }
        return response()->json([
            "success" => true,
            "message" => "Voti aggiunti con successo",
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
    public function update(Request $request, Grade $grade)
    {
        Log::info('test update');
        $this->checkGrade($grade);

        $request->validate(['grade' => 'required|integer|min:1|max:30']);

        $grade->updateOrFail([
            'grade' => $request->grade
        ]);

        return response()->json([
            "success" => true,
            "message" => "Voto modificato con successo",
            'data' => $grade
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function getTeacher()
    {
        $user = request()->user();
        $teacher = Teacher::where("email", $user->email)->firstOrFail();
        return $teacher;
    }

    private function checkGrade(Grade $grade)
    {
        $teacher = $this->getTeacher();

        $examId = $grade->exam_id;
        $exam = Exam::findOrFail($examId);


        $teacher->courses()->findOrFail($exam->course_id);

        if ($exam->subject_id != $teacher->subject_id) {
            return response()->json([
                "success" => false,
                "message" => "Operazione non autorizzata",
            ], 401);
        }
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