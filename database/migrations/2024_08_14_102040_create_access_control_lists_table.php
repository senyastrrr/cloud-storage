<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('access_control_lists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('item_id')->constrained('items')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('access_control_lists');
    }
};
