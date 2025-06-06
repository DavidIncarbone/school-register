<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            "name" => ["string", "max:100", "min:1"],
            "email" => ["string", "max:100", "min:1", "lowercase"],
            "sort" => ["string", "in:by_first_name,by_last_name,by_email,by_created_at,by_updated_at", "max:255"],
            "dir" => ["string", "in:asc,desc"],
        ]);

        $query = Teacher::query();

        if (request()->name) {
            $name = request()->name;

            $name = trim($name);
            $nameArr = explode(" ", $name);
            $first = $nameArr[0] ?? "";
            $last = $nameArr[1] ?? "";

            $queryCount = Teacher::where("first_name", 'like', $first . "%")->where("last_name", 'like', $last . '%')->count();
            if ($queryCount == 0) {
                $query->where("first_name", 'like',  $last . "%")->where("last_name", 'like',  $first . '%');
            } else {
                $query->where("first_name", 'like',  $first . "%")->where("last_name", 'like',  $last . '%');
            }
        }

        if (request()->email) {
            $query->where("email", "like", request()->email . "%");
        }

        // Teacher::findOrFail(0);
        if (request()->sort) {
            $sort = request()->sort;
            $dir = request()->dir ?? "asc";
            if ($sort == "by_first_name") {
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

        $teachers = $query->paginate(5);

        return response()->json(
            $teachers
        );
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
    public function show(Teacher $teacher)
    {
        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $teacher,
        ]);
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
    public function destroy(Teacher $teacher)
    {
        $teacher->courses()->detach();
        $teacher->deleteOrFail();
        return response()->json([], 204);
    }
}
