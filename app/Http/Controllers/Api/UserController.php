<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function getCurrentUser()
    {
        $user = Auth::user();

        return response([
            'status' => true,
            'message' => null,
            'data' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }
}
