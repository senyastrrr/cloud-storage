<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory, HasUuids;
    
    protected $fillable = [
        'name',
        'url',
        'parent_id',
    ];

    public function param(): HasOne
    {
        return $this->hasOne(ItemParam::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
