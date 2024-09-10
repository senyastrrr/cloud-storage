<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AccessControlList;
use App\Models\Item;
use App\Models\ItemParam;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class FileUploadController extends Controller
{
    /**
     * Upload File and create Item with ItemParam
     * @param Request $request
     * @return JsonResponse
     */
    public function fileUpload(Request $request, $id): JsonResponse
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();

            DB::beginTransaction();
            try {
                // Store the file
                $filePath = $file->storeAs('uploads', $fileName, 'public');

                // Create a new Item
                $itemId = Uuid::uuid7()->toString();
                while (Item::where('id', $itemId)->exists()) {
                    $itemId = Uuid::uuid7()->toString();
                }
                $item = Item::create([
                    'id' => $itemId,
                    'name' => $file->getClientOriginalName(),
                    'url' => asset('storage/' . $filePath),
                    'parent_id' => null,
                ]);

                // Create the parameters for the Item
                $paramId = Uuid::uuid7()->toString();
                while (ItemParam::where('id', $paramId)->exists()) {
                    $paramId = Uuid::uuid7()->toString();
                }
                $param = $item->param()->create([
                    'id' => $paramId,
                    'size' => $file->getSize(),
                    'type' => $file->getClientMimeType(),
                ]);

                // Add the item to the Access Control List for the current user
                $aclId = Uuid::uuid7()->toString();
                while (AccessControlList::where('id', $aclId)->exists()) {
                    $aclId = Uuid::uuid7()->toString();
                }
                $acl = AccessControlList::create([
                    'id' => $aclId,
                    'user_id' => $id,
                    'item_id' => $item->id,
                ]);

                // Commit the transaction if the operations were successful
                DB::commit();

                return response()->json(['url' => $item->url, 'item' => $item, 'param' => $param]);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error($e);
                if (Storage::exists($filePath) && !DB::transactionLevel()) {
                    Storage::delete($filePath);
                }
                return response()->json(['error' => 'Error uploading file'], 500);
            }
            return response()->json(['error' => 'No file uploaded'], 400);
        }
    }
}
