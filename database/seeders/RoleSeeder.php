<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'admin', 'description' => 'Administrator Role - Full access to all features.'],
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'user', 'description' => 'Regular User Role - Limited access to certain features.'],
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'employee', 'description' => 'Employee Role - Access to specific employee-related features.'],
        ];

        DB::table('roles')->insert($roles);
    }
}
