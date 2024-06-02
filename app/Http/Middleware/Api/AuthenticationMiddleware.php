<?php

namespace App\Http\Middleware\Api;

use App\Traits\ApiRespond;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationMiddleware
{
    use ApiRespond;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth('api')->check()) {
            return $this->respondBadRequestError("You must login first !");
        }

        return $next($request);
    }
}
