<?php

namespace App\Exceptions;

use App\Traits\ApiRespond;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiRespond;
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (\Exception $e, $request) {
            if ($request->wantsJson() || $request->segment(1) === 'api') {
                if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                    return $this->respondNotFound('Not Found');
                }

                if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                    return $this->respondNotFound('Resource not found');
                }

                if ($e instanceof ValidationException) {
                    return $this->respondBadRequestError($e->validator->errors()->all(':message')[0]);
                }
                return $this->respondInternalError($e->getMessage());
            }
        });
    }
}
