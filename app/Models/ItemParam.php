<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemParam extends Model
{
    use HasFactory, HasUuids;
    public $timestamps = false;
    
    protected $fillable = [
        'size',
        'type',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
