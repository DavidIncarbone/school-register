<?php

namespace App\Http\Controllers\Guest;

use App\Events\AnnouncementSent;
use App\Events\ExampleTest;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::all();
        return response()->json([
            "success" => true,
            "message" => "Operazione effettuata con successo",
            "data" => $announcements,
        ]);
    }

    public function store()
    {
        request()->validate(["body" => ["required", "string", 'min:1']]);

        $body = request()->body;

        $newAnnouncement = Announcement::create(["body" => $body]);

        broadcast(new AnnouncementSent($newAnnouncement));

        return response()->json([
            "success" => true,
            "message" => "Comunicazione creata con successo",
            "data" => $newAnnouncement,
        ]);
    }

    public function example()
    {
        $message = "example test";
        broadcast(new ExampleTest($message));
        return $message;
    }
}