<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enums\TypeMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        public $title = "Login"
    )
    {}

    public function index() 
    {
        return inertia('Auth/Login', [
            'title' => $this->title,
        ]);
    }

    public function login(LoginRequest $request) 
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect('/');
        }

        return back()
            ->with([
                'type' => TypeMessage::ERROR,
                'message' => "Username is not found."
            ]);    
    }

    public function logout()
    {
        Auth::logout();

        return redirect()
            ->action([AuthController::class, 'login'])
            ->with([
                'type' => TypeMessage::INFO,
                'message' => "Please you have to log in first! to continue.",
            ]);
    }
}
