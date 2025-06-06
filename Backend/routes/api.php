<?php

use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource("/students", StudentController::class)->middleware(['auth:sanctum']);
// students
Route::apiResource("/students", StudentController::class)->middleware(['auth:sanctum']);

// teachers
Route::apiResource("/teachers", TeacherController::class)->middleware(['auth:sanctum']);

// courses
Route::apiResource("/courses", CourseController::class)->middleware(['auth:sanctum']);

Route::apiResource("/admin/students", AdminStudentController::class)/*->middleware(['auth:sanctum'])*/;
// rotta custom per recupero dati necessari all'abilitazione dell'acc
Route::post("/retrieve-temp-user", function () {
    // ricavo la mail dal corpo della richiesta
    $fields = request()->validate([
        'email' => ['required', 'email'],
        'type' => ['required', 'string', Rule::in(config("userType"))],
    ]);
    $email = $fields['email'];
    $type = $fields['type'];

    $user = User::where("email", $email)->first();
    if (isset($user)) {
        return response()->json(["message" => "ah coglioneee sei gia registratoooo"], 401);
    }

    $tempUser = null;
    if ($type == 'student') {
        $tempUser = Student::where("email", $email)->firstOrFail();
    } elseif ($type == 'teacher') {
        $tempUser = Teacher::where("email", $email)->firstOrFail();
    }
    // se esiste mando un 204 no content (success)
    return response()->json($tempUser, 200);
    // se non esiste mando un 404 not found (error)
});
