<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class piso extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'numero_piso',
        'edificio_id'
    ];
    public function departamentos()
    {
        return $this->hasMany(departamento::class);
    }
    public function edificio()
    {
        return $this->belongsTo(edificio::class);
    }
}