<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use App\Mail\UserVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'first_name' => 'required',
            'last_name' => 'required'
        ]);

        // Si la validación falla, se devuelve una respuesta de error
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Crear un nuevo usuario sin verificar si ya existe
            $user = User::firstOrCreate(
                ['email' => $request->email], // Verifica si el usuario ya existe por su correo electrónico
                [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'password' => Hash::make($request->password),
                ]
            );

            // Envío de correo de verificación al usuario
            Mail::to($user->email)->send(new UserVerification($user));

            return response()->json([
                'status' => 200,
                'message' => "Registered, verify your email address to login",
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
