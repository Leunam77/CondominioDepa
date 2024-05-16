<?php

namespace App\Http\Controllers\Cobro_Servicios;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\MultasModel;

class MultasController extends Controller
{
    public function index()
    {
        $multas = MultasModel::all()->toArray();
        
        return response()->json([
            'status' => 200,
            'data' => $multas,
        ]);
    }

    public function guardoMulta(Request $request)
    {
     

        $multa = new MultasModel();

        $multa->preaviso_id = $request->preaviso_id;
        $multa->descripcion = $request->descripcion;
        $multa->monto = $request->monto;
        $multa->fecha = $request->fecha;

        $multa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Multa creada exitosamente',
        ]);
    }

    public function show($id)
    {
        $multa = MultasModel::findOrFail($id);
        
        return response()->json([
            'status' => 200,
            'data' => $multa,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'expensa_id' => 'required|exists:expensas,id',
            'descripcion' => 'required|string',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $multa = MultasModel::findOrFail($id);

        $multa->expensa_id = $request->expensa_id;
        $multa->descripcion = $request->descripcion;
        $multa->monto = $request->monto;
        $multa->fecha = $request->fecha;

        $multa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Multa actualizada exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $multa = MultasModel::findOrFail($id);
        $multa->delete();
        
        return response()->json([
            'status' => 200,
            'message' => 'Multa eliminada exitosamente',
        ]);
    }
}
