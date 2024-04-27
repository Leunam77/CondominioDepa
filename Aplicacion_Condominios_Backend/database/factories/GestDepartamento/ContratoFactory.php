<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\Departamento;
class ContratoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        //si quiero que la fecha fin sea mayor a la fecha inicio
        $fecha_inicio = $this->faker->dateTimeBetween('-1 year', 'now');
        $fecha_fin = $this->faker->dateTimeBetween($fecha_inicio, '+1 year');
        return [
            //generar datos aleatorios
            'fecha_inicio_contrato' => $fecha_inicio,
            'fecha_fin_contrato' => $fecha_fin,
            'precio_contrato' => $this->faker->randomFloat(2, 1000, 10000),
            'tipo_contrato' => $this->faker->randomElement(['alquiler', 'anticretico']),
            'vigente_contrato' => true,
            'departamento_id' => Departamento::all()->random()->id,
            
        ];
    }
}
