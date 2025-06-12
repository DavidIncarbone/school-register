<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        request()->validate([
            "date" => ["date"],
        ]);

        $query = Presence::query();

        if (request()->date) {
            $query->where("date", request()->date)->get();
        }

        $presences = $query->paginate(30);

        return response()->json([
            $presences
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "student_id" => ["required", "integer"],
                "date" => ["required", "date"],
                "is_present" => ["required", "boolean"]
            ]
        );

        $data = $request->all();

        $data["date"] = Carbon::createFromFormat('d-m-Y', $data['date'])->format('Y-m-d');

        $newPresence = new Presence;

        $newPresence->student_id = $data["student_id"];
        $newPresence->date = $data["date"];
        $newPresence->is_present = $data["is_present"];

        $newPresence->save();

        return response()->json([
            "success" => true,
            "message" => "Presenza aggiunta con successo",
            "data" => $newPresence
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Presence $presence)
    {
        return response()->json([
            'success' => true,
            'message' => 'Richiesta effettuata con successo',
            'data' => $presence,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Presence $presence)
    {
        $data = $request->validate(
            [
                "student_id" => ["required", "integer"],
                "date" => ["required", "date"],
                "is_present" => ["required", "boolean"]
            ]
        );

        $data["date"] = Carbon::createFromFormat('d-m-Y', $data['date'])->format('Y-m-d');

        $presence->student_id = $data["student_id"];
        $presence->date = $data["date"];
        $presence->is_present = $data["is_present"];

        $presence->update();

        return response()->json([
            'success' => true,
            'message' => 'Presenza modificata con successo',
            'data' => $presence,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Presence $presence)
    {
        $presence->deleteOrFail();
        return response()->json([], 204);
    }
}
