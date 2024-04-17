<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request) {
        if(!$request->hasValidSignature()){
            return response()->json(["msg" => "invalid/Expired url"],401);
        }
        $user = User::findOrFail($user_id);

        if(!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }else{
            return response()->json([
                "status" => 400,
                "message" => "Email alredy verified"
            ],400);
        }

        return response()->json([
            "status" => 200,
            "message" => "your email $user->email has been successfully verified"
        ],200);
     

    }
}
