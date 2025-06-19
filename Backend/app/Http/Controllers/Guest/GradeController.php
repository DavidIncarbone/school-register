<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;

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
            $grades = Grade::where('exam_id', $examId)->get();
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