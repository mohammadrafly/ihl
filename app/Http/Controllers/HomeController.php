<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Member;
use App\Models\Pesan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'artikelAll' => Artikel::all()
        ]);
    }

    public function profile()
    {
        return Inertia::render('home/Profile');
    }

    public function contact(Request $request)
    {
        if ($request->isMethod('post')) {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nomor_whatsapp' => 'required|string|max:15',
                'email' => 'required|email|max:255',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
            ]);

            if (!Pesan::create($validated)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal kirim pesan',
                    'redirect' => route('home.contact')
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil kirim pesan',
                'redirect' => route('home.contact')
            ]);
        }

        return Inertia::render('home/Contact');
    }

    public function member()
    {
        return Inertia::render('home/Member', [
            'member' => Member::all(),
        ]);
    }
}
