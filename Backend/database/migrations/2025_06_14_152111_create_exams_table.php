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
            $table->foreignId("student_id")->constrained();
            $table->foreignId("subject_id")->constrained();
            $table->foreignId("course_id")->constrained();
            $table->string("topic");
            $table->integer("grade");
            $table->date("date");
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