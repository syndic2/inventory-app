<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;

use App\Models\User;

class AuthController extends Controller
{
    public function signUp(SignUpRequest $request)
    {
        $data = $request->validated();

        // /** @var User */
        // $user = User::create([
        //     'name' => $data['name'],
        //     'email' => $data['email'],
        //     'password' => bcrypt($data['password'])
        // ]);
        // $token = $user->createToken('main')->plainTextToken;

        return response([
            'status' => false,
            'message' => 'Account has been created successfully',
            'data' => [
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'johndoe@mail.com',
                    'username' => 'johndoe',
                    'password' => 'password'
                ],
                'token' => 'ACCESS_TOKEN'
            ]
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        // if (!Auth::attempt($credentials)) {
        //     return response([
        //         'status' => false,
        //         'message' => 'Provided username or password is incorrect.',
        //         'data' => null
        //     ]);
        // }

        // /** @var User */
        // $user = Auth::user();
        // $token = $user->createToken('main')->plainTextToken;

        return response([
            'status' => false,
            'message' => 'Login successfully',
            'data' => [
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'johndoe@mail.com',
                    'username' => 'johndoe',
                    'password' => 'password'
                ],
                'token' => 'ACCESS_TOKEN'
            ]
        ]);
    }

    public function logout(Request $request)
    {
        // /** @var User */
        // $user = $request->user();
        // $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
