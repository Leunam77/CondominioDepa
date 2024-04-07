<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Edificio;
class PisoFactory extends Factory
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
            'numero_piso' => $this->faker->numberBetween(1, 10),
            'edificio_id' => Edificio::factory()->create()->id
        ];
    }
    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
