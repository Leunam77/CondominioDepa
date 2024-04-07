<?php

namespace Database\Factories;

use App\Models\edificio;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Bloque;
class EdificioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    //protected $model = edificio::class;
    public function definition()
    {
        return [
            //
            'nombre_edificio' => $this->faker->name,
            'descripcion_edificio' => $this->faker->text(200),
            'bloque_id' => Bloque::factory()->create()->id
        ];
    }
    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
