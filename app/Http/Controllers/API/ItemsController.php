<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AccessControlList;
use App\Models\Item;
use App\Models\ItemParam;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    public function getUserFiles($id)
    {
        try {
            $files = AccessControlList::where('user_id', $id)
                ->with('item.param')
                ->get()
                ->pluck('item');

            return $files;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            // or return error response
        }
    }

    public function createFolder($name)
    {
        $user = request()->user;
        Log::info($user);
        DB::beginTransaction();
        try {
            $folderPath = Storage::disk('local')->makeDirectory('uploads/' . $name);

            $itemId = Uuid::uuid7()->toString();
            while (Item::where('id', $itemId)->exists()) {
                $itemId = Uuid::uuid7()->toString();
            }
            $item = Item::create([
                'id' => $itemId,
                'name' => $name,
                'url' => asset('storage/' . $folderPath),
                'parent_id' => null,
            ]);

            $paramId = Uuid::uuid7()->toString();
            while (ItemParam::where('id', $paramId)->exists()) {
                $paramId = Uuid::uuid7()->toString();
            }
            $param = $item->param()->create([
                'id' => $paramId,
                'size' => 0,
                'type' => 'folder',
            ]);

            $aclId = Uuid::uuid7()->toString();
            while (AccessControlList::where('id', $aclId)->exists()) {
                $aclId = Uuid::uuid7()->toString();
            }
            $acl = AccessControlList::create([
                'id' => $aclId,
                'user_id' => $user->id,
                'item_id' => $item->id,
            ]);

            DB::commit();

            return response()->json(['url' => $item->url, 'item' => $item, 'param' => $param]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            if (Storage::exists($folderPath) && !DB::transactionLevel()) {
                Storage::delete($folderPath);
            }
            return response()->json(['error' => 'Error creating folder'], 500);
        }
        return response()->json(['error' => 'No folder created'], 400);
    }
}
