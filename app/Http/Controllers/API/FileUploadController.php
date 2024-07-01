<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class FileUploadController extends Controller
{
    /**
     * Upload File and create Item with ItemParam
     * @param Request $request
     * @return JsonResponse
     */
    public function fileUpload(Request $request): JsonResponse
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');

            // Use the asset() function to generate the correct URL
            $url = asset('storage/' . $filePath);

            // Use the transaction to ensure atomicity of operations
            DB::beginTransaction();
            // Create a new Item
            $item = Item::create([
                'id' => Uuid::uuid7()->toString(),
                'name' => $file->getClientOriginalName(),
                'url' => $url,
                'parent_id' => null, // Set the parent_id based on your logic
            ]);
            // Create the parameters for the Item
            $param = $item->param()->create([
                'id' => Uuid::uuid7()->toString(),
                'size' => $file->getSize(),
                'type' => $file->getClientMimeType(),
            ]);

            // Commit the transaction if the operations were successful
            DB::commit();

            return response()->json(['url' => $url, 'item' => $item, 'param'=> $param]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
