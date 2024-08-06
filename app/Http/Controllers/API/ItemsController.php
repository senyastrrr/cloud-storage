<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $url = $item->url;
        $item->delete();

        // Extract the file path from the URL
        $filePath = parse_url($url, PHP_URL_PATH);
        $filePath = str_replace('/storage/', 'public/', $filePath);
        
        Storage::delete($filePath);

        return response()->json(null, 204);
    }
}
