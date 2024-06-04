<?php

namespace App\Http\Middleware\Admin;

use App\Enums\TypeMessage;
use App\Http\Controllers\Admin\Auth\AuthController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->action([AuthController::class, 'login'])
                ->with([
                    'message_type' => TypeMessage::INFO,
                    'message' => "You must login first !"
                ]);
        }

        return $next($request);
    }
}
