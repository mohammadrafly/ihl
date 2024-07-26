<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Artikel::all();
        return Inertia::render('dashboard/artikel/Index', [
            'title' => 'Artikel',
            'artikel' => $articles
        ]);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('POST')) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'created_at' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()
                ]);
            }

            $data = $validator->validate();

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
                $image->storeAs('images', $imageName, 'public');
                $data['image'] = $imageName;
            }

            if (!Artikel::create($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal tambah artikel!'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil tambah artikel!',
                'redirect' => route('artikel.index')
            ]);
        }

        return Inertia::render('dashboard/artikel/Create', [
            'title' => 'Artikel',
        ]);
    }

    public function update(Request $request, $id)
    {
        $artikel = Artikel::findOrFail($id);

        if ($request->isMethod('POST')) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ]);
            }

            $data = $validator->validate();

            if ($request->hasFile('image')) {
                if ($artikel->image) {
                    Storage::disk('public')->delete('images/' . $artikel->image);
                }
                $image = $request->file('image');
                $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
                $image->storeAs('images', $imageName, 'public');
                $data['image'] = $imageName;
            } else {
                $data['image'] = $artikel->image;
            }

            if (!$artikel->update($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal update artikel!'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil update artikel!',
                'redirect' => route('artikel.index')
            ]);
        }

        return Inertia::render('dashboard/artikel/Update', [
            'title' => 'Update Artikel',
            'artikel' => $artikel
        ]);
    }

    public function delete($id)
    {
        $article = Artikel::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel not found',
                'redirect' => route('artikel.index')
            ]);
        }

        if ($article->image) {
            Storage::disk('public')->delete('images/' . $article->image);
        }

        if (!$article->delete()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal hapus artikel',
                'redirect' => route('artikel.index')
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil hapus artikel',
            'redirect' => route('artikel.index')
        ]);
    }

    public function getArtikelSingle($id)
    {
        $artikel = Artikel::find($id);
        if (!$artikel) {
            return redirect()->route('artikel.index')->with('error', 'Artikel not found.');
        }

        $artikelAll = Artikel::all()->shuffle();

        return Inertia::render('components/ArtikelSingle', [
            'artikel' => $artikel,
            'artikelAll' => $artikelAll,
            'title' => $artikel->title
        ]);
    }

    public function getArtikelYear($year)
    {
        $artikel = Artikel::whereYear('created_at', $year)->get();
        if (!$artikel) {
            return redirect()->route('artikel.index')->with('error', 'Artikel not found.');
        }

        $artikelAll = Artikel::all();

        return Inertia::render('components/ArtikelYear', [
            'artikel' => $artikel,
            'artikelAll' => $artikelAll,
            'title' => $year
        ]);
    }
}
