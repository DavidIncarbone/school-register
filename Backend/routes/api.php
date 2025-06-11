<?php

use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\SubjectController as AdminSubjectController;
use App\Http\Controllers\Admin\PresenceController as AdminPresenceController;
use App\Http\Controllers\Guest\CalendarController;
use App\Http\Controllers\Guest\CourseController;
use App\Http\Controllers\Guest\PresenceController;
use App\Http\Controllers\Guest\StudentController;
use App\Http\Controllers\Guest\TeacherController;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// ***** AUTH GUEST *****
Route::middleware(["auth:sanctum"])->group(function () {
    // students
    Route::apiResource("/students", StudentController::class);
    // teachers
    Route::apiResource("/teachers", TeacherController::class);
    // courses
    Route::apiResource("/courses", CourseController::class);
    // calendar
    Route::apiResource("/calendar", CalendarController::class);
    // presences
    Route::get("/presences", [PresenceController::class, 'index']);
    Route::post("/presences", [PresenceController::class, 'store'])->middleware(['teacher-access']);
    Route::patch("/presences/{id}", [PresenceController::class, 'update'])->middleware(['teacher-access']);
});

// ***** AUTH ADMIN *****
Route::middleware(['auth:sanctum', 'admin-access'])->prefix("/admin")->name('admin.')->group(function () {
    Route::apiResource("/students", AdminStudentController::class);
    Route::apiResource("/teachers", AdminTeacherController::class);
    Route::apiResource("/courses", AdminCourseController::class);
    Route::apiResource("/subjects", AdminSubjectController::class);
    Route::apiResource("/presences", AdminPresenceController::class);
});

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