<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::factory()->createMany([
            [
                "first_name" => "Ajhay",
                "last_name" => "Herrera",
                "email" => "herrera@example.com"
            ],
            [
                "first_name" => "David",
                "last_name" => "Incarbone",
                "email" => "incarbone@example.com"
            ],
        ]);
    }
}
