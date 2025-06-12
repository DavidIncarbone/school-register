<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();
        Log::info($user);
        $userType = $user->type;
        $userEmail = $user->email;

        // 2. interpolare la query degli student in base al tipo di utente (student, teacher, admin)
        if ($userType == "student") {

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => Student::where('email', $userEmail)->first(),
            ], 200);
        } elseif ($userType == "teacher") {
            request()->validate([
                "course_id" => "required|integer|min:1",
                "name" => ["string", "max:100", "nullable"],
                "email" => ["string", "max:100", "min:1", "lowercase"],
                "sort" => ["string", "in:by_id,by_first_name,by_last_name,by_email,by_created_at,by_updated_at", "max:255"],
                "dir" => ["string", "in:asc,desc"],
            ]);

            $coursesIds = Teacher::where("email", $user->email)->first()->courses()->pluck("course_id")->toArray();


            if (!in_array(request()->course_id, $coursesIds)) {
                return response()->json([
                    "success" => false,
                    "message" => "Il teacher corrente non insegna in questo corso",
                ], 400);
            }

            $query = Student::query();
            $query->where("course_id", request()->course_id);

            if (request()->name) {
                $name = request()->name;

                // fare controllo name === typeof number (controllo per id/matricola)
                $name = trim($name);
                $nameArr = explode(" ", $name);
                $first = $nameArr[0] ?? "";
                $last = $nameArr[1] ?? "";

                $queryCount = Student::where("course_id", request()->course_id)->where("first_name", 'like', $first . "%")->where("last_name", 'like', $last . '%')->count();
                if ($queryCount == 0) {
                    $query->where("first_name", 'like',  $last . "%")->where("last_name", 'like',  $first . '%');
                } else {
                    $query->where("first_name", 'like',  $first . "%")->where("last_name", 'like',  $last . '%');
                }
            }

            if (request()->email) {
                $query->where("email", "like", request()->email . "%");
            }

            if (request()->sort) {
                $sort = request()->sort;
                $dir = request()->dir ?? "asc";
                if ($sort == "by_id") {
                    $query->orderBy("id", $dir);
                } elseif ($sort == "by_first_name") {
                    $query->orderBy("first_name", $dir);
                } elseif ($sort == "by_last_name") {
                    $query->orderBy("last_name", $dir);
                } elseif ($sort == "by_email") {
                    $query->orderBy("email", $dir);
                } elseif ($sort == "by_created_at") {
                    $query->orderBy("created_at", $dir);
                } elseif ($sort == "by_updated_at") {
                    $query->orderBy("updated_at", $dir);
                }
            }

            $students = $query->get();
            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $students,
            ], 200);
        } else
            return response()->json("Tipo di utente non riconosciuto", 400);
    }

    public function show(Student $student)
    {

        $user = request()->user();

        if ($user->type == "teacher") {

            $teacher = Teacher::where("email", $user->email)->first();

            $coursesIds = $teacher->courses()->pluck("course_id")->toArray();

            if (!in_array($student->course_id, $coursesIds)) {
                return response()->json([
                    "success" => false,
                    "message" => "Studente non presente nei corsi di questo teacher"
                ]);
            }

            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $student
            ]);
        } else if ($user->type == "student") {

            $currentStudent = Student::where("email", $user->email)->first();

            if ($student->email != $currentStudent->email) {
                return response()->json([
                    "success" => false,
                    "message" => "Questo studente non può accedere ai dettagli degli altri studenti",
                ]);
            }
            return response()->json([
                "success" => true,
                "message" => "Richiesta effettuata con successo",
                "data" => $currentStudent
            ]);
        }
    }
}
