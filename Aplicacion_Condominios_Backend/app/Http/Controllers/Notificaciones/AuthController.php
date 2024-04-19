<?php
namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use App\Mail\UserVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function send(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'titulo' => 'required',
            'anuncio' => 'required'
        ]);

        // Si la validación falla, se devuelve una respuesta de error
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Busca un usuario existente con el email proporcionado
            $user = User::where('email', $request->email)->first();

            if ($user) {
                // Si el usuario ya existe, actualiza los campos 'titulo' y 'anuncio'
                $user->titulo = $request->titulo;
                $user->anuncio = $request->anuncio;
                $user->save();
            } else {
                // Si el usuario no existe, crea uno nuevo
                $user = User::create([
                    'email' => $request->email,
                    'titulo' => $request->titulo,
                    'anuncio' => $request->anuncio,
                ]);
            }

            // Envía un correo de verificación al usuario
            Mail::to($user->email)->send(new UserVerification($user));

            return response()->json([
                'status' => 200,
                'message' => "Mensaje enviado correctamente",
            ], 200);
        } catch (\Exception $err) {
            // Si hay un error, se devuelve una respuesta de error
            return response()->json([
                'status' => 500,
                'message' => $err->getMessage()
            ], 500);
        }
    }
}