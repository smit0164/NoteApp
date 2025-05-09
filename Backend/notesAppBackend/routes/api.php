<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NoteController;


Route::post('/signup', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/createnote', [NoteController::class,'store']); 
    Route::get('/notes', [NoteController::class,'fetchNotes']);
    Route::delete('/deletenote/{id}', [NoteController::class,'delete']);
});



