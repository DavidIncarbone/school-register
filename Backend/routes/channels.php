<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

// * middlewares in ws => per i canali privato bisogna essere autenticati
Broadcast::routes(['middleware' => ['web', 'auth:sanctum']]);

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('room.{id}', function (User $user) {
    return $user->only('id', 'name');
});

// public channel => funzione solitamente vuota
Broadcast::channel('chat', function () {
    // 
});