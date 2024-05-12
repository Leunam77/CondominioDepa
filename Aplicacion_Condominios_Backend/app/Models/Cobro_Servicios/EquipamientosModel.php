<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CommonArea\CommonArea; // Import the AreasComunes model

class EquipamientosModel extends Model
{
    use HasFactory;

    protected $table = 'equipamientos';

<<<<<<< HEAD
    protected $fillable = ['nombre', 'descripcion','costo','area_comun_id'];
=======
    protected $fillable = ['nombre', 'descripcion','costo','area_comun_id','area_comun_nombre'];
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
    public function areaComun()
    {
        return $this->belongsTo(CommonArea::class, 'area_comun_id');
    }
<<<<<<< HEAD
    
}
=======

}
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
