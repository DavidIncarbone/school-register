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


        // 1. ricavare lo user loggato tramite request()
        $user = request()->user();
        // 2. interpolare la query degli student in base al tipo di utente (student, teacher, admin)

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
