<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

Route::get('/test', function () {
    return "Hello";
  });
  

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function(){
    
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
    Route::get('/me/all', [AuthController::class, 'getUsers']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'categories'
], function () {
    Route::post('/', [CategoryController::class, 'create'])->middleware('role:admin');
    Route::get('/', [CategoryController::class, 'get'])->middleware('role:admin,staff');
    Route::get('/{id}', [CategoryController::class, 'getById'])->middleware('role:admin,staff');
    Route::patch('/{id}', [CategoryController::class, 'update'])->middleware('role:admin');
    Route::delete('/{id}', [CategoryController::class, 'delete'])->middleware('role:admin');
    Route::get('/{id}/products', [CategoryController::class, 'getAllProductsInCategory'])->middleware('role:admin,staff');
});


Route::group(['prefix' => 'products','middleware' => 'api'], function() {
    Route::controller(ProductController::class)->group(function () {
        Route::post('/', 'create')->middleware('role:admin');
        Route::get('/', 'get')->middleware('role:admin,staff');
        Route::get('/{id}', 'getById')->middleware('role:admin,staff');
        Route::patch('/{id}', 'update')->middleware('role:admin');
        Route::delete('/{id}', 'delete')->middleware('role:admin') ;
    });
});

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/total-sales', [OrderController::class, 'totalSales']);