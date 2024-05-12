<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_inicio_contrato',
        'fecha_fin_contrato',
        'precio_contrato',
        'tipo_contrato',
        'vigente_contrato',
        'departamento_id'
    ];
<<<<<<< HEAD
=======
    protected $dates = [
        'fecha_inicio_contrato',
        'fecha_fin_contrato',
    ];
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
    public function residente()
    {
        return $this->hasMany(Residente::class); //supuestamente no importa si no hay residentes asociados
    }
    public function departamento()
    {
        return $this->belongsTo(departamento::class);
    }
<<<<<<< HEAD
=======
    public function residentes()
    {
        return $this->hasMany(Residente::class, 'id');
    }
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
}
