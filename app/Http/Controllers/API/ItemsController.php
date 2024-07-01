<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function index()
    {
        return Item::with('param')->get();
    }

    public function store(Request $request)
    {
        $item = Item::create($request->all());
        $item->param()->create($request->input('param'));

        return $item;
    }

    public function show($id)
    {
        return Item::with('param')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->all());
        if ($request->has('param')) {
            $item->param->update($request->input('param'));
        }

        return $item;
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();

        return response()->json(null, 204);
    }
}
