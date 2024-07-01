<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemParamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $item_params = [
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'size' => 15, 'type' => 'png', 'item_id' => Item::first()->id],
        ];

        DB::table('item_params')->insert($item_params);
    }
}
