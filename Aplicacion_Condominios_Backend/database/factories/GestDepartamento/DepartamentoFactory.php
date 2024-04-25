<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\edificio;
class DepartamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Define el nuevo camino donde se almacenarán las imágenes
        $directory = public_path('departamento/images/departamentos');
        $ruta = 'departamento/images/departamentos';
        // Asegurarse de que el directorio existe, si no, crearlo
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        // Generar la imagen y obtener el nombre del archivo
        $imageName = $this->faker->image($directory, 512, 512, null, false);
        
        // Concatenar el path al nombre del archivo para almacenar en la base de datos
        $imagePath = $imageName ? $ruta . '/' . $imageName : 'departamento/images/departamentos/departamento_pred.jpeg';

        return [
            //
            'nombre_departamento' => $this->faker->word,
            'numero_habitaciones' => $this->faker->numberBetween(1,5),
            'numero_personas'  => $this->faker->numberBetween(1,7),
            'superficie' => $this->faker->randomFloat($nbMaxDecimals = 2, $min =0, $max=100),
            'disponibilidad' => true,
            'amoblado' => $this->faker->boolean(),
            'ofertado_venta' => false,
            'ofertado_alquiler' => false,
            'ofertado_anticretico' => false,
            'descripcion_departamento' => $this->faker->sentence(),
            'piso' => $this->faker->numberBetween(1,10),
            'imagen_departamento' => $imagePath,
            'edificio_id' => edificio::factory()->create()->id
        ];
    }
    public function withoutTimestamps(){
        return $this->state(function (array $attributes){
            return [];
        });
    }
}
