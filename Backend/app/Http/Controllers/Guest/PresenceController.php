<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // controllo del user type (tramite middleware)
        // * caso in cui voglio vedere le presenze di uno studente
        // da input, ricavo l'id dello studente
        // controllo che lo studente faccia parte di uno dei corsi del teacher
        // e in output mostro le presenze i quali hanno student_id dello studente

        // * caso in cui voglio vedere le presenze di un corso di una data specifica
        // da input ricavo l'id del corso e la data (in formato data)
        // controllo che l'id del corso faccia parte dei corsi del teacher
        // ricavo gli studenti che partecipano a quel corso
        // e in output mostro le presenze i quali hanno student_id degli studenti e la data dall'input
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