<?php

use App\Http\Controllers\Admin\AssignmentController as AdminAssignmentController;
use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\SubjectController as AdminSubjectController;
use App\Http\Controllers\Admin\PresenceController as AdminPresenceController;
use App\Http\Controllers\Guest\AnnouncementController;
use App\Http\Controllers\Guest\AssignmentController;
use App\Http\Controllers\Guest\CourseController;
use App\Http\Controllers\Guest\ExamController;
use App\Http\Controllers\Guest\GradeController;
use App\Http\Controllers\Guest\LessonScheduleController;
use App\Http\Controllers\Guest\PresenceController;
use App\Http\Controllers\Guest\StudentController;
use App\Http\Controllers\Guest\SubjectController;
use App\Http\Controllers\Guest\TeacherController;
use App\Models\Admin;
use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
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
    // lesson schedules
    Route::get("/lesson_schedules", [LessonScheduleController::class, 'index']);

    // courses
    Route::get("/courses", [CourseController::class, 'index']);
    Route::get("/courses/{course}", [CourseController::class, 'show']);

    // subjects
    Route::get("/subjects", [SubjectController::class, 'index']);
    Route::get("/subjects/{subject}", [SubjectController::class, 'show']);

    // presences
    Route::get("/presences", [PresenceController::class, 'index']);
    Route::post("/presences", [PresenceController::class, 'store'])->middleware(['teacher-access']);
    Route::patch("/presences/{presence}", [PresenceController::class, 'update'])->middleware(['teacher-access']);

    // asignments
    Route::get("/assignments", [AssignmentController::class, "index"]);
    Route::post("/assignments", [AssignmentController::class, "store"])->middleware(['teacher-access']);
    Route::patch("/assignments/{assignment}", [AssignmentController::class, "update"])->middleware(['teacher-access']);
    Route::delete("/assignments/{assignment}", [AssignmentController::class, "destroy"])->middleware(['teacher-access']);

    // students
    Route::get("/students", [StudentController::class, 'index']);
    Route::get("/students/{student}", [StudentController::class, 'show']);

    // teachers
    Route::get("/teachers", [TeacherController::class, 'index']);
    Route::get("/teachers/{teacher}", [TeacherController::class, 'show']);

    // exams
    Route::apiResource("/exams", ExamController::class)->middleware(['teacher-access']);

    // grades
    Route::get("/grades-averages", [GradeController::class, 'gradesAverages']);
    Route::get("/grades", [GradeController::class, 'index']);
    Route::post("/grades", [GradeController::class, 'store'])->middleware(['teacher-access']);
    Route::patch("/grades/{grade}", [GradeController::class, 'update'])->middleware(['teacher-access']);

    // announcements
    Route::get("/announcements", [AnnouncementController::class, 'index']);
    Route::post("/announcements", [AnnouncementController::class, 'store']);

    // profile
    Route::get("/profile", function () {
        request()->validate([
            "email" => 'required|string',
            "type" => 'required|string|in:student,teacher,admin',
        ]);
        if (request()->type === "student") {
            $student = Student::where('email', request()->email)->firstOrFail();
            $course = Course::findOrFail($student->course_id);
            $student->course_name = $course->name;
            $student->course_description = $course->description;
            return response()->json([
                "success" => true,
                'message' => 'Operazione effettuata con successo',
                'data' => $student
            ]);
        } elseif (request()->type === "teacher") {
            $teacher = Teacher::where('email', request()->email)->firstOrFail();
            $subject = Subject::findOrFail($teacher->subject_id);
            $teacher->subject_name = $subject->name;
            $teacher->subject_description = $subject->description;
            return response()->json([
                "success" => true,
                'message' => 'Operazione effettuata con successo',
                'data' => $teacher
            ]);
        } else if (request()->type === "admin") {
            $admin = Admin::where('email', request()->email)->firstOrFail();

            return response()->json([
                "success" => true,
                'message' => 'Operazione effettuata con successo',
                'data' => $admin
            ]);
        } else {
            return response()->json([
                "success" => false,
                'message' => 'Errore durante l\'operazione',
            ], 400);
        }
    });
});


// ***** AUTH ADMIN *****
Route::middleware(['auth:sanctum', 'admin-access'])->prefix("/admin")->name('admin.')->group(function () {
    Route::apiResource("/students", AdminStudentController::class);
    Route::apiResource("/teachers", AdminTeacherController::class);
    Route::apiResource("/courses", AdminCourseController::class);
    Route::apiResource("/subjects", AdminSubjectController::class);
    Route::apiResource("/presences", AdminPresenceController::class);
    Route::apiResource("/assignments", AdminAssignmentController::class);
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