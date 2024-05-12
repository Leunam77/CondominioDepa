<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\Insumo;

class InsumoController extends Controller
{
    public function getInsumo() {
        $insumo = Insumo::with('solicitud.categoria')->get();
        return response()->json($insumo, 200);
    }
    
    public function getInsumoId($id) {
        $insumo = Insumo::find($id);
        
        if(is_null($insumo)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function insertInsumo(Request $request) {
        $insumo = Insumo::create($request->all());
        
        if(is_null($insumo)) {
            $response = ["message" => "Hubo problemas al registrar"];
            $status = 404;
        } else {
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function updateInsumo(Request $request, $id) {
        $insumo = Insumo::find($id); 
        
        if(is_null($insumo)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $insumo->update($request->all());
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function deleteInsumo($id) {
        $insumo = Insumo::find($id); 
        
        if(is_null($insumo)){
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $insumo->delete();
            $response = ["message"=>"Registro eliminado"];
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
}
