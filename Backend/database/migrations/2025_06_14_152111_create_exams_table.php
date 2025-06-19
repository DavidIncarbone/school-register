<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


//  !vedere bene come si relazione alle altre tabelle
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('subject_id');

            $table->foreign("course_id")->references('id')->on('courses')->cascadeOnDelete();
            $table->foreign("subject_id")->references('id')->on('subjects')->cascadeOnDelete();
            
            $table->string("topic");
            $table->dateTime("date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};