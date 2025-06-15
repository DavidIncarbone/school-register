<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Presence;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // TEACHER

        if ($user->type == "teacher") {
            $teacher = Teacher::where("email", $user->email)->firstOrFail();

            $courses = $teacher->courses()->withCount(['subjects as subjects_count' => function ($query) {
                $query->select(DB::raw('count(distinct subject_id)'));
            }, "students", "teachers"])->get();
            // $courses = $teacher->courses()->with(['subjects', 'students'])->withCount(['subjects as subjects_count' => function ($query) {
            //     $query->select(DB::raw('count(distinct subject_id)'));
            // }, "students", "teachers"])->get();

            foreach ($courses as $course) {

                $studentsIds = $course->students()->pluck('id')->toArray();
                $totalRecordsCount = Presence::whereIn("student_id", $studentsIds)->count();
                $presenceCount = Presence::whereIn("student_id", $studentsIds)->where("is_present", 1)->count();
                $presencesPercentage = $totalRecordsCount > 0 ? round(($presenceCount / $totalRecordsCount) * 100) : 0;

                $course->total_presence = $presenceCount;
                $course->presences_percentage = $presencesPercentage . '%';
            }

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'total_count' => count($courses),
                'data' => $courses,
            ], 200);
        }

        // STUDENT

        else if ($user->type == "student") {

            $student = Student::where("email", $user->email)->firstOrFail();
            $course = Course::where("id", $student->course_id)->firstOrFail();
            $course->load(["subjects", "teachers"])->loadCount(["students", "subjects", "teachers"]);

            $studentsIds = $course->students()->pluck('id')->toArray();
            $totalRecordsCount = Presence::whereIn("student_id", $studentsIds)->count();
            $presenceCount = Presence::whereIn("student_id", $studentsIds)->where("is_present", 1)->count();
            $presencesPercentage = $totalRecordsCount > 0 ? round(($presenceCount / $totalRecordsCount) * 100) : 0;

            $course->total_presence = $presenceCount;
            $course->presences_percentage = $presencesPercentage;

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $course,
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $user = request()->user();

        $studentsIds = $course->students()->pluck('id')->toArray();
        $totalRecordsCount = Presence::whereIn("student_id", $studentsIds)->count();
        $presenceCount = Presence::whereIn("student_id", $studentsIds)->where("is_present", 1)->count();
        $presencesPercentage = $totalRecordsCount > 0 ? round(($presenceCount / $totalRecordsCount) * 100) : 0;

        $course->total_presence = $presenceCount;
        $course->presences_percentage = $presencesPercentage . '%';

        if ($user->type == "student") {

            $course->load(["subjects", "teachers"])->loadCount(["subjects", "teachers", "students"]);
            $student = Student::where("email", $user->email)->firstOrFail();
            $currentCourse = Course::where("id", $student->course_id)->firstOrFail();

            if ($currentCourse->id != $course->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lo studente corrente non ha accesso a questo corso',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $course,
            ], 200);
        } else if ($user->type == "teacher") {

            $course->load(["subjects", "students", "teachers"])->loadCount(["subjects", "students", "teachers"]);

            $teacher = Teacher::where("email", $user->email)->firstOrFail();
            $coursesIds = $teacher->courses()->pluck('course_id')->toArray();

            if (!in_array($course->id, $coursesIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'L\'insegnante corrente non ha accesso a questo corso',
                ], 400);
            }

            $teachersCount = Course::find($course->id)->teachers->count();
            Log::info($teachersCount);
            return response()->json([
                'success' => true,
                'message' => 'Richiesta effettuata con successo',
                'data' => $course,
            ], 200);
        }
    }
}