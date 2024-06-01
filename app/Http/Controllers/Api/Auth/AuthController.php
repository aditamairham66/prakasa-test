<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\AuthRequest;
use App\Http\Resources\Api\User\UserResource;
use App\Models\User;
use App\Traits\ApiRespond;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiRespond;

    public function login(AuthRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (Hash::check($request->password, $user->password)) {
            return $this->respondWithMessage([
                'user' => new UserResource($user),
                'token' => $user->createToken('Api-' . $user->name)->accessToken,
            ], 'Success');
        } else {
            return $this->respondBadRequestError('Username or password is invalid');
        }
    }

    public function logout()
    {
        Auth::guard('api')->user()->token()->revoke();
        return $this->respondWithMessage([], 'Success');
    }
}
