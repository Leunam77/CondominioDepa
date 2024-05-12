<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('reserved_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->text('reason');
            $table->integer('number_of_people');
<<<<<<< HEAD

            $table->unsignedBigInteger('id_common_area');

            $table->foreign('id_common_area')->references('id_common_area')->on('common_areas');
=======
            $table->boolean('reserva_pagada')->default(0);
            $table->unsignedBigInteger('id_common_area');
            $table->unsignedBigInteger('id_resident');

            $table->foreign('id_common_area')->references('id_common_area')->on('common_areas');
            $table->foreign('id_resident')->references('id')->on('residentes');
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
