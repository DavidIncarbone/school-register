<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        // * SIMULAZIONE
        // 1. ricavare lo user loggato tramite request()
        // !  $user = request()->user();
        $user = "utente autenticato";
        $userType = "student";
        // 2. interpolare la query degli student in base al tipo di utente (student, teacher, admin)
        if ($userType == "student") {
            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => Student::where('tax_id', $user->tax_id)->first(),
            ], 200);
        } elseif ($userType == "teacher") {
            $fields = request()->validate([
                "course_id" => "required|integer|min:1",
                "last_name" => "string|max:100"
            ]);

            $query = Student::query();

            if (isset($fields['last_name'])) {
                $query->where("last_name", "like", $fields['last_name'] . "%");
            }
            if (isset($fields['course_id'])) {
                $query->where("course_id", $fields['course_id']);
            }
            $students = $query->get();
            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $students,
            ], 200);
        } elseif ($userType == "admin") {
            $students = Student::paginate(30);
            return $students;
        } else
            return response()->json("lohacker", 400);



        $fields = request()->validate([
            "course_id" => "integer|min:1",
            "last_name" => "string|max:100"
        ]);

        $query = Student::query();

        if (isset($fields['last_name'])) {
            $query->where("last_name", "like", $fields['last_name'] . "%");
        }
        if (isset($fields['course_id'])) {
            $query->where("course_id", $fields['course_id']);
        }

        $students = $query->paginate(30);


        return response()->json($students);
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
