<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        request()->validate([
            "student_id" => ['integer', 'exists:students,id'],
            "course_id" => ["integer", "exists:courses,id"],
            "date" => ["date"],
        ]);

        $user = request()->user();
        Log::info($user->email);

        $query = Presence::query();

        $coursesIds = Teacher::where("email", $user->email)->first()->courses()->pluck("course_id")->toArray();

        if (request()->student_id) {

            $student = Student::find(request()->student_id);

            if (!in_array($student->course_id, $coursesIds)) {
                return response()->json([
                    "success" => false,
                    "message" => "Studente non presente tra i corsi di questo teacher"
                ], 400);
            }

            $query->where("student_id", request()->student_id);

            $presences = $query->orderBy("date", "desc")->paginate(20);

            return response()->json(
                $presences
            );
        } elseif (request()->course_id) {
            if (!in_array(request()->course_id, $coursesIds)) {
                return response()->json([
                    "success" => false,
                    "message" => "Questo teacher non insegna nel corso selezionato"
                ], 400);
            }

            $studentsIds = Student::where("course_id", request()->course_id)->get()->pluck("id")->toArray();

            if (request()->date) {
                $query->where("date", request()->date);
            }
            $presences = $query->whereIn("student_id", $studentsIds)->orderBy("date", "desc")->paginate(20);

            return response()->json([
                $presences,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "students_ids" => ["required", "array"],
                "are_presents" => ["required", "array"]
            ]
        );
        $i = 0;
        foreach (request()->students_ids as $studentId) {
            $newPresence = new Presence;
            $newPresence->student_id = $studentId;
            $newPresence->date = Carbon::today();
            $newPresence->is_present = request()->are_presents[$i];
            $i++;
            $newPresence->save();
        }
        return response()->json([
            "success" => true,
            "message" => "Presenze aggiunte con successo",
        ], 201);
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
    public function update(Request $request, Presence $presence)
    {
        $request->validate(
            [

                "is_present" => ["required", "boolean"]
            ]
        );

        $presence->is_present = request()->is_present;

        $presence->update();

        return response()->json([
            "success" => true,
            "message" => "Presenza modificata con successo",
            "data" => $presence
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
