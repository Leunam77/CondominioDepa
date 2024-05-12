<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactanosMailable;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $titulo = $request->input('titulo');
        $correo = $request->input('correo');
        $monto = $request->input('monto');
        $mensajeAdicional = $request->input('mensaje'); // Nuevo campo para el mensaje adicional desde el frontend
    
        // Aquí puedes agregar la lógica necesaria para enviar el correo electrónico
        // Por ejemplo:
        Mail::to($correo)->send(new ContactanosMailable($titulo, $monto, $mensajeAdicional));
    
        return response()->json(['message' => 'Correo enviado correctamente']);
    }
}
