<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;

use App\Models\User;
use Exception;

class AuthController extends Controller
{
    public function signUp(SignUpRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            /** @var User */
            $user = User::create([
                'user_id' => Str::uuid()->toString(),
                'name' => $data['name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'])
            ]);
            $token = $user->createToken('main')->plainTextToken;

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => 'Account has been created successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }

    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            if (!Auth::attempt([
                'username' => $credentials['username'],
                'password' => $credentials['password']
            ])) {
                return response([
                    'status' => false,
                    'message' => 'Provided username or password is incorrect.',
                    'data' => null
                ], 401);
            }

            /** @var User */
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => 'Login successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $request->user('sanctum')->currentAccessToken()->delete();
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => 'User has been successfully logged out',
            'data' => null
        ], 200);
    }
}
