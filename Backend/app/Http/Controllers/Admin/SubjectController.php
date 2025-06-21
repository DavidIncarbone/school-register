<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            "name" => ["string", "max:100", "min:1"],
            "description" => ["string", "max:255", "min:1"],
            "sort" => ["string", "in:by_name,by_description,by_created_at,by_updated_at", "max:255"],
            "dir" => ["string", "in:asc,desc"],
        ]);

        $query = Subject::query();

        if (request()->name) {
            $name = request()->name;
            $name = trim($name);
            $query->where("name", 'like',  request()->name . "%");
        }


        if (request()->description) {
            $query->where("description", "like", request()->description . "%");
        }

        if (request()->sort) {
            $sort = request()->sort;
            $dir = request()->dir ?? "asc";
            if ($sort == "by_name") {
                $query->orderBy("name", $dir);
            } elseif ($sort == "by_description") {
                $query->orderBy("description", $dir);
            } elseif ($sort == "by_created_at") {
                $query->orderBy("created_at", $dir);
            } elseif ($sort == "by_updated_at") {
                $query->orderBy("updated_at", $dir);
            }
        }

        $subjects = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'total_count' => count($subjects),
            'data' => $subjects,
        ], 200);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => ["required", "string", "min:1", "max:100"],
            "description" => ["required", "string", "min:1", "max:255"]
        ]);

        $newSubject = new Subject();

        $newSubject->name = request()->name;
        $newSubject->description = request()->description;

        $newSubject->save();

        return response()->json([
            "success" => true,
            "message" => "Materia aggiunta con successo",
            "data" => $newSubject
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $subject,
        ]);
    }

    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            "name" => ["required", "string", "min:1", "max:100"],
            "description" => ["required", "string", "min:1", "max:255"]
        ]);


        $subject->name = $request->name;
        $subject->description = $request->description;

        $subject->update();

        return response()->json([
            "success" => true,
            "message" => "Materia modificata con successo",
            "data" => $subject
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->courses()->detach();
        $subject->students()->detach();
        $subject->deleteOrFail();
        return response()->json([], 204);
    }
}
