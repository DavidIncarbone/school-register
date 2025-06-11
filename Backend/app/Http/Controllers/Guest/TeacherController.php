<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // * user->type = student => vede i dettagli dei professori del corso che partecipano
        // * user->type = teacher => vede solo la propria scheda

        // * filtri non servono ? perche al massimo un corso avra tot <~ 6 teachers
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        // ? valutare in seguito
        // user->type = student => aggiungere policy in cui il teacher insegna ad un corso in cui partecipa uno studente
        // e mostra il teacher

        // user->type = teacher => aggiungere policy in cui il teacher in input corrisponde alla scheda del teacher dello user loggato
        // e mostra solo se stesso

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Richiesta effettuata con successo',
        //     'data' => $teacher->load("courses"),
        // ], 200);
    }
}