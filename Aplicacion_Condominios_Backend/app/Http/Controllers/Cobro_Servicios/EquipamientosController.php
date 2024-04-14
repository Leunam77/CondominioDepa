<?php

namespace App\Http\Controllers\Cobro_Servicios;

use App\Models\Cobro_Servicios\EquipamientosModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EquipamientosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        $equipamiento = new EquipamientosModel();
        $equipamiento->nombre = $request->nombre;
        $equipamiento->descripcion = $request->descripcion;
        $equipamiento->costo = $request->costo;
        $equipamiento->save();
        return response()->json([
            'status' => 200,
            'message' => 'Equipo dañado añadido exitosamente',
        ]);

    }
}
