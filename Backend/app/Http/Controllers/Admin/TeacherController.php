<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
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
            "search" => ["string", "max:100", "min:1"],
            "sort" => ["string", "in:by_first_name,by_last_name,by_email,by_created_at,by_updated_at", "max:255"],
            "dir" => ["string", "in:asc,desc"],
            "course_id" => ["integer", "min:1"],
            "subject_id" => ["integer", "min:1"]
        ]);

        $query = Teacher::query();

        if (request()->search) {
            $name = request()->search;

            $name = trim($name);
            $nameArr = explode(" ", $name);
            $first = $nameArr[0] ?? "";
            $last = $nameArr[1] ?? "";

            if (!$last) {
                $query->where("first_name", "like", $name . "%")->orWhere("last_name", "like", $name . "%")->orWhere("email", "like", $name . "%");
            } else {

                $queryCount = Teacher::where("first_name", 'like', $first . "%")->where("last_name", 'like', $last . '%')->count();
                if ($queryCount == 0) {
                    $query->where("first_name", 'like',  $last . "%")->where("last_name", 'like',  $first . '%');
                } else {
                    $query->where("first_name", 'like',  $first . "%")->where("last_name", 'like',  $last . '%');
                }
            }
        }

        if (request()->sort) {

            $sort = substr(request()->sort, 3);
            $dir = request()->dir ?? "asc";
            $query->orderBy($sort, $dir);
        }


        if (request()->course_id) {
            $courseId = request()->course_id;
            $query->whereHas('courses', function ($q) use ($courseId) {
                $q->where('course_id', $courseId);
            });
        }

        if (request()->subject_id) {
            $query->where("subject_id", request()->subject_id);
        }

        $teachers = $query->paginate(30);

        $teachers->load("courses");

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
            "subject_id" => ["required", "string", "min:1"],
            "courses_ids" => ["required", "array"],
            // "courses_ids.*" => ["required", "integer", "min:1"]

        ]);


        $data = $request->all();

        $emailDB = Teacher::all()->pluck("email")->toArray();

        if (in_array($data["email"], $emailDB)) {
            return response()->json([
                "error" => "conflict",
                "field" => "email",
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

        if (isset(request()->courses_ids)) {
            $newTeacher->courses()->attach(request()->courses_ids);
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
            "first_name" => ["string", "max:100", "min:1"],
            "last_name" => ["string", "max:100", "min:1"],
            "email" => ["string", "max:100", "min:1", "lowercase"],
            "subject_id" => ["integer", "min:1"],
            "course_id" => ["integer", "min:1"]

        ]);

        $data = $request->all();
        $originalTeacher = Teacher::where("email", $data["email"])->findOrFail()->toArray();
        $isSame = false;

        $teacher["first_name"] = $data["first_name"];
        $teacher->last_name = $data["last_name"];
        $teacher->email = $data["email"];
        $teacher->subject_id = $data["subject_id"];

        $teacherUnchanged = $teacher->isClean();


        $teacher->update();

        if (isset($data["course_id"])) {
            $teacher->courses()->sync($data["course_id"]);
        }

        return response()->json([
            "success" => true,
            "message" => "Insegnante modificato con successo",
            "data" => $teacher,
            "modified" => $isSame
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
