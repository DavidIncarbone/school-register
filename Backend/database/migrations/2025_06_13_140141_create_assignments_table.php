<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // SECONDA PIVOT DI COURSES_SUBJECTS
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("course_id");
            $table->unsignedBigInteger("subject_id");
            $table->foreign("course_id")->references("id")->on("courses")->onDelete("CASCADE");
            $table->foreign("subject_id")->references("id")->on("subjects")->onDelete("CASCADE");
            $table->text("body");
            $table->dateTime("assignment_date");
            $table->dateTime("deadline");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};