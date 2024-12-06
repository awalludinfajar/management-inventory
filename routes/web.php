<?php

use App\Http\Controllers\InventoryController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Redirect::route('page.inventory');
});

Route::prefix('page')->group(function () {
    Route::get('/inventaris', [InventoryController::class, 'index'])->name('page.inventory');
    Route::get('/inventaris/{id}', [InventoryController::class, 'form'])->name('page.form');
    Route::Post('/inventaris/{id}', [InventoryController::class, 'store'])->name('data.input');
    Route::Delete('/inventaris/{id}', [InventoryController::class, 'delete'])->name('data.remove');
    Route::get('/download/inventaris', [InventoryController::class, 'export'])->name('data.download');
});