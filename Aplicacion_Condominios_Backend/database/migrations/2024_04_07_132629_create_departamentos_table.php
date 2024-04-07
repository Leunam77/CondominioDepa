<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departamentos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_departamento');
            $table->integer('numero_habitaciones');
            $table->integer('numero_personas');
            $table->double('superficie', 6, 2);
            $table->boolean('disponibilidad');
            $table->boolean('amoblado');
            $table->string('descripcion_departamento');
            $table->foreignId('piso_id')
                ->constrained('pisos')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('departamentos');
    }
}
