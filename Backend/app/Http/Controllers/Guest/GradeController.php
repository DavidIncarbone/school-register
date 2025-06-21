<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GradeController extends Controller
{

    public function gradesAverages()
    {
        $user = request()->user();

        if ($user->type === "student") {
            $student = Student::where('email', $user->email)->first();

            $averages = Grade::join('exams', 'grades.exam_id', '=', 'exams.id')
                ->join('subjects', 'exams.subject_id', '=', 'subjects.id')
                ->select('subjects.name as subject_name', DB::raw('AVG(grades.grade) as average_grade'))
                ->where('grades.student_id', $student->id)
                ->groupBy('exams.subject_id')
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Operazione effettuata con successo",
                'data' =>  $averages,
            ]);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = request()->user();

        if ($user->type === "teacher") {
            request()->validate([
                'exam_id' => 'required|integer|min:1'
            ]);
            $examId = request()->exam_id;
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
            request()->validate([
                'subject_id' => 'required|integer|min:1'
            ]);
            $student = Student::where('email', $user->email)->first();

            $courseId = $student->course_id;
            $subjectId = request()->subject_id;

            $examsIds = Exam::where('course_id', $courseId)->where('subject_id', $subjectId)->get()->pluck('id')->toArray();

            $grades = Grade::where('student_id', $student->id)
                ->whereIn('exam_id', $examsIds)->with(['exam'])
                ->join('exams', 'grades.exam_id', '=', 'exams.id')
                ->orderBy('exams.date', 'desc')
                ->select('grades.*')
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Operazione effettuata con successo",
                'data' =>  $grades,
            ]);
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grade $grade)
    {
        $examId = $grade->exam_id;
        $exam = Exam::findOrFail($examId);

        $this->checkExam($exam);

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