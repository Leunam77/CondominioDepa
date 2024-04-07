<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Piso;
class DepartamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'nombre_departamento' => $this->faker->word,
            'numero_habitaciones' => $this->faker->numberBetween(1,5),
            'numero_personas'  => $this->faker->numberBetween(1,7),
            'superficie' => $this->faker->randomFloat($nbMaxDecimals = 2, $min =0, $max=100),
            'disponibilidad' => $this->faker->boolean(),
            'amoblado' => $this->faker->boolean(),
            'descripcion_departamento' => $this->faker->sentence(),
            'piso_id' => function () {
                return Piso::factory()->create()->id;
            },

        ];
    }
    public function withoutTimestamps(){
        return $this->state(function (array $attributes){
            return [];
        });
    }
}
