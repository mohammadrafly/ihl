<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::all();
        return Inertia::render('dashboard/member/Index', [
            'title' => 'Member',
            'member' => $members
        ]);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('POST')) {
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:255',
                'jabatan' => 'required|string|max:255',
                'kta' => 'required|string|max:255',
                'wilayah' => 'required|string|max:255',
                'status' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()
                ]);
            }

            $data = $validator->validate();

            if (!Member::create($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal tambah member!'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil tambah member!',
                'redirect' => route('member.index')
            ]);
        }

        return Inertia::render('dashboard/member/Create', [
            'title' => 'Member',
        ]);
    }

    public function update(Request $request, $id)
    {
        $member = Member::findOrFail($id);

        if ($request->isMethod('POST')) {
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:255',
                'jabatan' => 'required|string|max:255',
                'kta' => 'required|string|max:255',
                'wilayah' => 'required|string|max:255',
                'status' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ]);
            }

            $data = $validator->validate();

            if (!$member->update($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal update member!'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil update member!',
                'redirect' => route('member.index')
            ]);
        }

        return Inertia::render('dashboard/member/Update', [
            'title' => 'Update Member',
            'member' => $member
        ]);
    }

    public function delete($id)
    {
        $members = Member::find($id);

        if (!$members) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found',
                'redirect' => route('member.index')
            ]);
        }

        if (!$members->delete()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal hapus member',
                'redirect' => route('member.index')
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil hapus member',
            'redirect' => route('member.index')
        ]);
    }
}
