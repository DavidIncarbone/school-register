<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Container\Attributes\Log as AttributesLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = request()->user();
        if ($user->type == "teacher") {

            $teacher = Teacher::where("email", $user->email)->first();

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $teacher,
            ]);
        } else if ($user->type == "student") {
            $student = Student::where("email", $user->email)->firstOrFail();
            $teachers = Course::where("id", $student->course_id)->firstOrFail()->teachers;

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $teachers,
            ]);

            Log::info($teachers);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        // ? valutare in seguito
        // user->type = student => aggiungere policy in cui il teacher insegna ad un corso in cui partecipa uno studente
        // e mostra il teacher

        $user = request()->user();

        if ($user->type == "teacher") {

            $currentTeacher = Teacher::where("email", $user->email)->first();

            if ($currentTeacher->email != $teacher->email) {
                return response()->json([
                    "success" => false,
                    "message" => "Questo insegnante non può accedere ai dettagli degli altri insegnanti",
                ]);
            }

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $currentTeacher
            ]);
        } else if ($user->type == "student") {

            $student = Student::where("email", $user->email)->first();

            $coursesIds = $teacher->courses->pluck("id")->toArray();

            if (!in_array($student->course_id, $coursesIds)) {
                return response()->json([
                    "success" => false,
                    "message" => "Lo studente corrente non può visualizzare i dettagli di questo insegnante",
                ]);
            }

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $teacher
            ]);
        };
    }
}
