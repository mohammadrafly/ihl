<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        if ($request->isMethod('POST')) {
            $credentials = [
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ];

            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Email tidak ada di database!',
                    'code' => 404
                ]);
            }

            if (!Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'message' => 'Password salah!',
                    'code' => 404
                ]);
            }

            if (Auth::attempt($credentials, $request->filled('remember'))) {
                return response()->json([
                    'message' => 'Berhasil login',
                    'code' => 200,
                    'redirect' => route('dashboard')
                ]);
            }

            return response()->json([
                'message' => 'Gagal login!',
                'code' => 404
            ]);
        }

        return Inertia::render('auth/Login');
    }

    public function Logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Berhasil Logout!',
            'code' => 200,
            'redirect' => route('login')
        ]);
    }
}
