<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipamientosModel extends Model
{
    use HasFactory;

    protected $table = 'equipamientos';

    protected $fillable = ['nombre', 'descripcion','costo'];
    
}