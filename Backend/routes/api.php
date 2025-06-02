<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return "Il tuo client puo comunicare con il server";
});

Route::apiResource("/students", StudentController::class)->middleware(['auth:sanctum']);
// Route::apiResource("/students", StudentController::class);