<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\ItemParam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'folder'],
        ];

        DB::table('items')->insert($items);

        $items = [
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'file', 'parent_id' => Item::first()->id],
        ];
        DB::table('items')->insert($items);
    }
}
