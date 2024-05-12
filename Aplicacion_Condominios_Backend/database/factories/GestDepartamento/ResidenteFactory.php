<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
<<<<<<< HEAD

=======
use App\Models\GestDepartamento\Contrato;
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
class ResidenteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $apellidos = $this->faker->lastName . ' ' . $this->faker->lastName;
<<<<<<< HEAD

=======
        $directory = public_path('departamento/images/residentes');
        $ruta = 'departamento/images/residentes';
        // Asegurarse de que el directorio existe, si no, crearlo
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        $imageName = $this->faker->image($directory, 512, 512, null, false);
        $imagePath = $imageName ? $ruta . '/' . $imageName : 'departamento/images/residentes/residente_default.png';
        $tipo_residente = $this->faker->randomElement(['Propietario', 'Residente','Titular']);
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
        return [
            //
            'nombre_residente' => $this->faker->name,
            'apellidos_residente' => $apellidos,
            'cedula_residente' => $this->faker->unique()->randomNumber(8),
            'telefono_residente' => $this->faker->phoneNumber,
            'fecha_nacimiento_residente' => $this->faker->date(),
<<<<<<< HEAD
            'tipo_residente' => $this->faker->randomElement(['propietario', 'inquilino']),
=======
            //'tipo_residente' => $this->faker->randomElement(['propietario', 'inquilino','titular']),
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
            'nacionalidad_residente' => $this->faker->country,
            'email_residente' => $this->faker->unique()->safeEmail,
            'genero_residente' => $this->faker->randomElement(['masculino', 'femenino']),
            'estado_residente' => false, 
<<<<<<< HEAD
            'imagen_residente' => $this->faker->imageUrl($width = 640, $height = 480),
            'contrato_id' => $this->faker->numberBetween(1, 10)           
=======
            'imagen_residente' => $imagePath,
            'contrato_id' => function () use (&$tipo_residente){
                // Obtener un contrato aleatorio
                $contrato = Contrato::all()->random();
                // Verificar si el contrato es de tipo "venta"
                if ($contrato->tipo_contrato === 'Venta' && $contrato->vigente_contrato === true) {
                    // Si es de tipo "venta", establecer el tipo de residente como "propietario"
                    $tipo_residente = 'Propietario';
                } else {
                    // Si no es de tipo "venta", asignar el tipo de residente de forma aleatoria entre "inquilino" y "titular"
                    $tipo_residente = $this->faker->randomElement(['Residente', 'Titular']);
                }
                // Devolver el id del contrato
                return $contrato->id;
            },
            'tipo_residente' => $tipo_residente,      
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
        ];
    }
}
