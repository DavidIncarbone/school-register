<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource("/students", StudentController::class)->middleware(['auth:sanctum']);
// students
Route::apiResource("/students", StudentController::class)->middleware(['auth:sanctum']);

// teachers
Route::apiResource("/teachers", TeacherController::class)->middleware(['auth:sanctum']);

Route::post("/retrieve-teacher", [TeacherController::class, "retrieveTeacherFromMail"]);