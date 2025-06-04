<?php

namespace App\Http\Controllers;

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
        // * SIMULAZIONE
        // 1. ricavare lo user loggato tramite request()
        // !  $user = request()->user();
        $user = request()->user();
        Log::info($user);
        $userType = $user->type;

        // 2. interpolare la query degli student in base al tipo di utente (student, teacher, admin)
        if ($userType == "student") {
            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => Student::where('tax_code', $user->tax_code)->first(),
            ], 200);
        } elseif ($userType == "teacher") {
            $fields = request()->validate([
                "course_id" => "required|integer|min:1",
                "last_name" => "string|max:100"
            ]);

            $coursesIds = Teacher::where("email", $user->email)->first()->courses()->pluck("course_id")->toArray();

            Log::info($coursesIds);

            $query = Student::query();

            if (!in_array($fields["course_id"], $coursesIds)) {
                return response()->json([], 400);
            }

            if (isset($fields['last_name'])) {
                $query->where("last_name", "like", $fields['full_name'] . "%");
            }

            $query->where("course_id", $fields['course_id']);

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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->all();
        $newUser = new User();
        $newUser->type = $data["type"];
        $newUser->name = $data["name"];
        $newUser->email = $data["email"];
        $newUser->password = $data["password"];
        $newUser->tax_code = $data["tax_code"];

        $newUser->save();
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