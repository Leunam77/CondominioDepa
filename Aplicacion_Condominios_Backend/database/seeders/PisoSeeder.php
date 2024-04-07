<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Piso;
class PisoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Piso::factory()->withoutTimestamps()->count(5)->create();
    }
}
