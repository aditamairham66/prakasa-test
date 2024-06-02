<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Post\PostController;
use App\Http\Controllers\Admin\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [DashboardController::class, 'index']);
# posts
Route::group([
 'prefix' => 'post',
 'as' => 'post.',
 'controller' => PostController::class
], function () {
 Route::get('/delete-image/{post}', 'deleteImage')->name('destroy-image');
});
Route::resource('post', PostController::class);
# users
Route::resource('user', UserController::class);
