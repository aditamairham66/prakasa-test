<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Post\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
    'controller' => AuthController::class
], function () {
    Route::post('/login', 'login')->name('login');
});

Route::group([
    "middleware" => [
        \App\Http\Middleware\Api\AuthenticationMiddleware::class,
        // 'auth:api',
    ],
], function () {
    Route::group([
        'prefix' => 'auth',
        'as' => 'auth.',
        'controller' => AuthController::class
    ], function () {
        Route::get('/logout', 'logout')->name('logout');
    });

    Route::resource('/post', PostController::class)->only([
        "index", "store", "destroy"
    ]);
    Route::group([
        'prefix' => 'post',
        'as' => 'post.',
        'controller' => PostController::class
    ], function () {
        Route::post('/{post}', 'update')->name('update');
    });
});
