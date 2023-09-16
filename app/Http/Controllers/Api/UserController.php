<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getCurrentUser(Request $request)
    {
        $isHeaderExist = $request->hasHeader('Authorization');
        if (!$isHeaderExist) {
            return response([
                'status' => false,
                'message' => 'Request unauthorized.',
                'data' => null
            ], 401);
        }

        return response([
            'status' => true,
            'message' => null,
            'data' => [
                'user_id' => 'USER_ID_1',
                'name' => 'John Doe',
                'email' => 'johndoe@mail.com'
            ]
        ]);
    }
}
