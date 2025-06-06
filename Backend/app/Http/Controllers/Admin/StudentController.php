<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
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

        $query = Student::query();

        if (request()->name) {
            $name = request()->name;

            $name = trim($name); // rimuove spazi all'inizio e alla fine
            $nameArr = explode(" ", $name); // divide la stringa per spazio
            $first = $nameArr[0] ?? ""; // primo elemento
            $last = $nameArr[1] ?? ""; // secondo elemento, se esiste


            $queryCount = Student::where("first_name", 'like', $first . "%")->where("last_name", 'like', $last . '%')->count();
            if ($queryCount == 0) {
                $query->where("first_name", 'like',  $last . "%")->where("last_name", 'like',  $first . '%');
            } else {
                $query->where("first_name", 'like',  $first . "%")->where("last_name", 'like',  $last . '%');
            }
        }

        // name = eugenio

        if (request()->email) {
            $query->where("email", "like", request()->email . "%");
        }
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

        $students = $query->paginate(5);

        return response()->json(

            $students
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
