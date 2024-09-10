<?php

// app/Http/Middleware/CheckItemAccess.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Models\AccessControlList;
use Illuminate\Http\Request;

class CheckItemAccess
{
    public function handle(Request $request, Closure $next, $itemId)
    {
        $userId = Auth::id();
        $acl = AccessControlList::where('user_id', $userId)
            ->where('item_id', $itemId)
            ->first();

        if (!$acl) {
            // User does not have access to the item
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
