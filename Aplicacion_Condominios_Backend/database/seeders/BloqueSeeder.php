<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\bloque;
class BloqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Bloque::factory()->withoutTimestamps()->count(5)->create();
    }
}
