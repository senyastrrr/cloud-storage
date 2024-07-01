<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quota extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'storage',
        'file_size',
    ];

    public function pricings() : HasMany
    {
        return $this->hasMany(Pricing::class);
    }
}
