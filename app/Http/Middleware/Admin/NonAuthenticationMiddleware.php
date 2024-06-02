<?php

namespace App\Http\Middleware\Admin;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NonAuthenticationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->check()) {
            $urlCurrent = url()->current();
            $urlCurrent = str_replace(url('/'), '', $urlCurrent);

            if ($request->is('/*')) {
                $exception = ['/login'];

                if (in_array($urlCurrent, $exception)) {
                    return redirect('/');
                }
            }
        }

        return $next($request);
    }
}
