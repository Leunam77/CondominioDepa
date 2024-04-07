<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class edificio extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre_edificio',
        'descripcion_edificio',
        'bloque_id'
    ];
    public function pisos()
    {
        return $this->hasMany(piso::class);
    }
    public function bloque()
    {
        return $this->belongsTo(bloque::class);
    }
}
