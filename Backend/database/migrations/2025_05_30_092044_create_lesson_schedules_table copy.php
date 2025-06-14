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
        Schema::create('lesson_schedules', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('subject_id');

            $table->foreign("course_id")->references('id')->on('courses')->cascadeOnDelete();
            $table->foreign("subject_id")->references('id')->on('subjects')->cascadeOnDelete();

            $table->string('course_name');
            $table->string('subject_name');

            $table->enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
            $table->enum('lesson_time', [1, 2, 3, 4, 5, 6, 7, 8]);

            // i vari unique... unique('subid', 'coursid', 'day','lesstime')

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_schedules');
    }
};