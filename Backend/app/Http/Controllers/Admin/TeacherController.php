<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        $teachers = $query->paginate(30);

        return response()->json(
            $teachers
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "first_name" => ["required", "string", "max:100", "min:1"],
            "last_name" => ["required", "string", "max:100", "min:1"],
            "email" => ["required", "string", "max:100", "min:1", "lowercase"],
            "subject_id" => ["required", "integer", "min:1"],
            "course_id" => ["required", "integer", "min:1"]

        ]);


        $data = $request->all();

        $emailDB = Teacher::all()->pluck("email")->toArray();

        if (in_array($data["email"], $emailDB)) {
            return response()->json([
                "error" => "conflict",
                "message" => "Email già registrata"
            ], 409);
        }
        Log::info($data);

        $newTeacher = new Teacher();

        $newTeacher->first_name = $data["first_name"];
        $newTeacher->last_name = $data["last_name"];
        $newTeacher->email = $data["email"];
        $newTeacher->subject_id = $data["subject_id"];

        $newTeacher->save();

        if (isset(request()->course_id)) {
            $newTeacher->courses()->attach(request()->course_id);
        }

        return response()->json([
            "success" => true,
            "message" => "Insegnante aggiunto con successo",
            "data" => $newTeacher
        ]);
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
    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            "first_name" => ["required", "string", "max:100", "min:1"],
            "last_name" => ["required", "string", "max:100", "min:1"],
            "email" => ["required", "string", "max:100", "min:1", "lowercase"],
            "subject_id" => ["required", "integer", "min:1"],
            "course_id" => ["required", "integer", "min:1"]

        ]);


        $data = $request->all();

        $teacher->first_name = $data["first_name"];
        $teacher->last_name = $data["last_name"];
        $teacher->email = $data["email"];
        $teacher->subject_id = $data["subject_id"];

        $teacher->update();

        if (isset($data["course_id"])) {
            $teacher->courses()->sync($data["course_id"]);
        }

        return response()->json([
            "success" => true,
            "message" => "Insegnante modificato con successo",
            "data" => $teacher
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->courses()->detach();
        $teacher->notes()->detach();
        $teacher->deleteOrFail();
        return response()->json([], 204);
    }
}
