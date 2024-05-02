<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\departamento;
class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Departamento::factory()
            ->withoutTimestamps()
            ->count(5)
            ->create([
                'ofertado_venta' => 1,
                'ofertado_alquiler'=>1,
                'ofertado_anticretico'=>1 // Aquí puedes asignar el valor que desees para ofertado_venta
            ]);
    }
}
