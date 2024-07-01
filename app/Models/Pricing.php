<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pricing extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'quota_id',
        'price',
    ];

    public function quota(): BelongsTo
    {
        return $this->belongsTo(Quota::class);
    }

    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }
}
