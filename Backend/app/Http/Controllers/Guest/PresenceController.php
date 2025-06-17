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

        $query = Presence::query();

        if ($user->type === 'teacher') {
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

                $presences = $query->orderBy("date", "desc")->paginate(30);

                foreach ($presences as $presence) {

                    $student = Student::where("id", $presence->student_id)->firstOrFail();

                    $presence->student_first_name = $student->first_name;
                    $presence->student_last_name = $student->last_name;
                    $presence->student_email = $student->email;
                };
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

                // ! rendere required date qui
                if (request()->date) {
                    $query->where("date", request()->date);
                }
                $presences = $query
                    ->join('students', 'presences.student_id', '=', 'students.id')
                    ->whereIn('student_id', $studentsIds)
                    ->orderBy('students.last_name', 'asc') // oppure "desc"
                    ->select('presences.*') // necessario per non rompere la paginazione
                    ->paginate(30)
                    ->through(function ($presence) {
                        $student = Student::findOrFail($presence->student_id);
                        $presence->student_first_name = $student->first_name;
                        $presence->student_last_name = $student->last_name;
                        $presence->student_email = $student->email;
                        return $presence;
                    });

                return response()->json($presences);
                // $presences = $query->whereIn("student_id", $studentsIds)->orderBy("date", "desc")->paginate(30);

                // foreach ($presences as $presence) {

                //     $student = Student::where("id", $presence->student_id)->firstOrFail();

                //     $presence->student_first_name = $student->first_name;
                //     $presence->student_last_name = $student->last_name;
                //     $presence->student_email = $student->email;
                // };
                // return response()->json(
                //     $presences->sortBy("student_last_name")->values(),
                // );
            }
        } elseif ($user->type === "student") {
            $student = Student::where("email", $user->email)->first();
            // todo: limitare ricerca per anno scolastico corrente
            $presences = Presence::where('student_id', $student->id)->orderBy('date', 'desc')->get();
            $totalRecordsCount = count($presences);
            $presenceCount = Presence::where("student_id", $student->id)->where("is_present", 1)->count();
            $presencesPercentage = round($presenceCount / $totalRecordsCount, 2);
            // $presencesPercentage = $totalRecordsCount > 0 ? round(($presenceCount / $totalRecordsCount) * 100) : 0;

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'total_days' => $totalRecordsCount,
                'total_presences' => $presenceCount,
                'presences_percentage' => $presencesPercentage,
                'data' => $presences,
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
        Log::info(Carbon::now()->locale('en')->dayName);
        $day = Carbon::now()->locale('en')->dayName;
        if (!in_array(strtolower($day), ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])) {
            return response()->json([
                "success" => false,
                "message" => "Non è possibile aggiungere presenze di " . $day,
            ], 400);
        };
        foreach (request()->students_ids as $studentId) {
            $newPresence = new Presence;
            $newPresence->student_id = $studentId;
            // ! testing
            // $newPresence->date = Carbon::today()->addDay(1);
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
}