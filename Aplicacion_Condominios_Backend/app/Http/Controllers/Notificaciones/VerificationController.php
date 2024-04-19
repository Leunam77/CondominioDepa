<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request)
    {
        // Verifica si la firma en la URL es válida
        if (!$request->hasValidSignature()) {
            return response()->json([
                "status" => 401,
                "message" => "URL invalid or expired"
            ], 401);
        }

        // Encuentra el usuario con el ID proporcionado
        $user = User::findOrFail($user_id);

        // Verifica si el email del usuario ya ha sido verificado
        if (!$user->hasVerifiedEmail()) {
            // Marca el email del usuario como verificado
            $user->markEmailAsVerified();

            return response()->json([
                "status" => 200,
                "message" => "Your email has been successfully verified."
            ], 200);
        } else {
            // Si el email ya estaba verificado, devuelve un mensaje informativo
            return response()->json([
                "status" => 400,
                "message" => "Email already verified."
            ], 400);
        }
    }
}
