<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FileUploadController;
use App\Http\Controllers\API\ItemsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/file-upload', [FileUploadController::class, 'fileUpload']);
Route::apiResource('items', ItemsController::class);

