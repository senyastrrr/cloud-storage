<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FileUploadController;
use App\Http\Controllers\API\ItemsController;
use App\Http\Middleware\GetCurrentUser;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('items', ItemsController::class);
Route::post('/file-upload/{id}', [FileUploadController::class, 'fileUpload']);
Route::get('/items-by-user/{id}', [ItemsController::class, 'getUserFiles']);
Route::post('/create-folder{name}',  [ItemsController::class, 'createFolder'])->middleware(GetCurrentUser::class)->name('create-folder');
