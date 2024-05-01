<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\Residente;

class ResidenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //Residente::truncate();
        Residente::factory()->count(8)->create();
        $residenteData = [
            [
                'nombre_residente' => 'Juan',
                'apellidos_residente' => 'Pérez',
                'cedula_residente' => '12345678',
                'telefono_residente' => '555-1234',
                'fecha_nacimiento_residente' => '1990-05-15',
                'tipo_residente' => 'propietario', // O 'inquilino' o 'titular'
                'nacionalidad_residente' => 'Mexicana',
                'email_residente' => 'juan@example.com',
                'genero_residente' => 'masculino',
                'estado_residente' => true,
                'imagen_residente' => 'imagen1.jpg',
                'contrato_id' => 1, // ID del contrato asociado
            ],
            [
                'nombre_residente' => 'María',
                'apellidos_residente' => 'López',
                'cedula_residente' => '87654321',
                'telefono_residente' => '555-5678',
                'fecha_nacimiento_residente' => '1985-08-20',
                'tipo_residente' => 'inquilino', // O 'propietario' o 'titular'
                'nacionalidad_residente' => 'Colombiana',
                'email_residente' => 'maria@example.com',
                'genero_residente' => 'femenino',
                'estado_residente' => true,
                'imagen_residente' => 'imagen2.jpg',
                'contrato_id' => 2, // ID del contrato asociado
            ],
            // Agrega más filas según sea necesario
        ];

        // Crear los residentes utilizando createMany()
        Residente::createMany($residenteData);
    }
}
