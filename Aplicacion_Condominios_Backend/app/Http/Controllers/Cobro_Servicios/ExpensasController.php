<?php


namespace App\Http\Controllers\Cobro_Servicios;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\ExpensaModel;

class ExpensasController extends Controller
{
    public function index()
    {
        $expensas = ExpensaModel::all();
        
        return response()->json([
            'status' => 200,
            'data' => $expensas,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'departamento_id' => 'required|exists:App\Models\GestDepartamento\Departamento,id',
        ]);
        $preaviso = PreAvisoModel::findOrFail($request->departamento_id);

        $expensa = new ExpensaModel();

        $expensa->departamento_id = $preaviso->departamento_id;
        $expensa->fecha = $preaviso->fecha;
        $expensa->propietario_pagar = $preaviso->propietario_pagar;
        $expensa->descripcion_servicios = $preaviso->descripcion_servicios;
        $expensa->servicio_pagar = $preaviso->servicio_pagar;
        $expensa->monto = $preaviso->monto;

        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa generada exitosamente',
        ]);
    }
    public function show($id)
    {
        $expensa = ExpensaModel::findOrFail($id);
        
        return response()->json([
            'status' => 200,
            'data' => $expensa,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'fecha' => 'required|date',
            'propietario_pagar' => 'required|string',
            'descripcion_servicios' => 'required|string',
            'servicio_pagar' => 'required|string',
            'monto' => 'required|numeric',
        ]);

        $expensa = ExpensaModel::findOrFail($id);

        $expensa->fecha = $request->fecha;
        $expensa->propietario_pagar = $request->propietario_pagar;
        $expensa->descripcion_servicios = $request->descripcion_servicios;
        $expensa->servicio_pagar = $request->servicio_pagar;
        $expensa->monto = $request->monto;

        // Guardar los cambios en la base de datos
        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa actualizada exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $expensa = ExpensaModel::findOrFail($id);
        $expensa->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Expensa eliminada exitosamente',
        ]);
    }
}
