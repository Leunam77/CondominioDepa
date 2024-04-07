<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departamento extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre_departamento',
        'numero_habitaciones',
        'numero_personas',
        'superficie',
        'disponibilidad',
        'amoblado',
        'descripcion_departamento',
        'piso_id'
    ];
    public function piso()
    {
        return $this->belongsTo(piso::class);
    }
}
