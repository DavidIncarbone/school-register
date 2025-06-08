<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    // Qui puoi personalizzare le eccezioni che vuoi ignorare, per esempio
    protected $dontReport = [
        //
    ];

    // Qui puoi personalizzare input che non vuoi mai loggare in caso di errore
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ValidationException) {
            return response()->json([
                'success' => false,
                'message' => 'Errore di validazione',
                'errors' => $exception->errors(),
            ], 422);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Risorsa non trovata',
            ], 404);
        }

        if ($exception instanceof HttpExceptionInterface) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], $exception->getStatusCode());
        }

        return response()->json([
            'success' => false,
            'message' => 'Errore interno del server',
            'error' => config('app.debug') ? $exception->getMessage() : null,
        ], 500);
    }
}
