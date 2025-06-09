<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $fields = request()->validate([
        //     "tax_code" => ["required", "string", "max:50"]
        // ]);

        // Log::info($fields);

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Richiesta effettuata con successo',
        //     'data' => Teacher::where("tax_code", $fields["tax_code"])->with("courses")->get(),
        // ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $teacher->load("courses"),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        //
    }
}
