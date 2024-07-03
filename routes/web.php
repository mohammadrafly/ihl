<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberController;

Route::middleware('guest')->group(function() {
    Route::controller(HomeController::class)->group(function() {
        Route::match(['GET'], '/', 'index')->name('home.index');
        Route::match(['GET'], 'profile', 'profile')->name('home.profile');
        Route::match(['GET', 'POST'], 'contact', 'contact')->name('home.contact');
        Route::match(['GET'], 'member', 'member')->name('home.member');
    });
    Route::prefix('article')->group(function() {
        Route::controller(ArticlesController::class)->group(function() {
            Route::match(['GET'], '{id}', 'getArtikelSingle')->name('artikel.single');
            Route::prefix('archieve')->group(function() {
                Route::match(['GET'], '{year}', 'getArtikelYear')->name('artikel.year');
            });
        });
    });
    Route::controller(AuthController::class)->group(function() {
        Route::match(['GET', 'POST'], 'login', 'Login')->name('login');
    });
});

Route::middleware('auth')->group(function() {
    Route::prefix('dashboard')->group(function() {
        Route::controller(AuthController::class)->group(function() {
            Route::match(['GET'], 'logout', 'Logout')->name('auth.logout');
        });
        Route::controller(DashboardController::class)->group(function() {
            Route::match(['GET'], '/', 'index')->name('dashboard');
        });
        Route::prefix('artikel')->group(function() {
            Route::controller(ArticlesController::class)->group(function() {
                Route::match(['GET'], '/', 'index')->name('artikel.index');
                Route::match(['GET', 'POST'], 'create', 'create')->name('artikel.create');
                Route::match(['GET', 'POST'], 'update/{id}', 'update')->name('artikel.update');
                Route::match(['DELETE'], 'delete/{id}', 'delete')->name('artikel.delete');
            });
        });
        Route::prefix('member')->group(function() {
            Route::controller(MemberController::class)->group(function() {
                Route::match(['GET'], '/', 'index')->name('member.index');
                Route::match(['GET', 'POST'], 'create', 'create')->name('member.create');
                Route::match(['GET', 'POST'], 'update/{id}', 'update')->name('member.update');
                Route::match(['DELETE'], 'delete/{id}', 'delete')->name('member.delete');
            });
        });
    });
});
