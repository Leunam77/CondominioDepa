<?php

namespace App\Http\Controllers\Cobro_Servicios;

use App\Models\Cobro_Servicios\EquipamientosModel;
use App\Models\CommonArea\CommonArea;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EquipamientosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'costo' => 'required|numeric',
            'area_comun_nombre' => 'required|string',
        ]);

        // Buscar el ID del área común por su nombre
        $area_comun_nombre = $request->area_comun_nombre;
        $area_comun_id = CommonArea::where('common_area_name', $area_comun_nombre)->value('id_common_area');

        if (!$area_comun_id) {
            return response()->json([
                'status' => 404,
                'message' => 'El área común especificada no existe.',
            ], 404);
        }

        // Crea un nuevo equipo
        $equipamiento = new EquipamientosModel();
        $equipamiento->nombre = $request->nombre;
        $equipamiento->descripcion = $request->descripcion;
        $equipamiento->costo = $request->costo;
        $equipamiento->area_comun_id = $area_comun_id; // Asigna el ID del área común encontrado
        $equipamiento->area_comun_nombre = $area_comun_nombre; // Guarda el nombre del área común
        $equipamiento->save();

        return response()->json([
            'status' => 200,
            'message' => 'Equipo dañado añadido exitosamente',
        ]);
    }

    public function getAllCommonAreas()
{
    $common_areas = CommonArea::pluck('common_area_name');
    return response()->json([
        $common_areas
    ]);
}
}