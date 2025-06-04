<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{
    public function retrieveTeacherFromMail()
    {
        // ricavo la mail dal corpo della richiesta
        $fields = request()->validate([
            'email' => 'required|email',
        ]);
        $email = $fields['email'];
        // faccio una query al DB (teachers) per mail
        $user = User::where("email", $email)->first();
        if (isset($user)) {
            return response()->json(["message" => "ah coglioneee sei gia registratoooo"], 401);
        }

        $teacher = Teacher::where("email", $email)->firstOrFail();
        // se esiste mando un 204 no content (success)
        return response()->json($teacher, 200);
        // se non esiste mando un 404 not found (error)
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fields = request()->validate([
            "tax_code" => ["required", "string", "max:50"]
        ]);

        Log::info($fields);

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => Teacher::where("tax_code", $fields["tax_code"])->with("courses")->get(),
        ], 200);
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