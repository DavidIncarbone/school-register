<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
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

        $query = Course::query();

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

        $courses = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'total_count' => count($courses),
            'data' => $courses,
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

        $newCourse = new Course();

        $newCourse->name = request()->name;
        $newCourse->description = request()->description;

        $newCourse->save();

        return response()->json([
            "success" => true,
            "message" => "Corso aggiunto con successo",
            "data" => $newCourse
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $course,
        ]);
    }

    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            "name" => ["required", "string", "min:1", "max:100"],
            "description" => ["required", "string", "min:1", "max:255"]
        ]);


        $course->name = $request->name;
        $course->description = $request->description;

        $course->update();

        return response()->json([
            "success" => true,
            "message" => "Corso modificato con successo",
            "data" => $course
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->teachers()->detach();
        $course->subjects()->detach();
        $course->deleteOrFail();
        return response()->json([], 204);
    }
}
