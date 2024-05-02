<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cobro_Servicios\PreAvisoModel;

class ExpensaModel extends Model
{
    use HasFactory;
    protected $table = 'expensas';

    protected $fillable = ['preaviso_id', 'propietario_pagar', 'fecha', 'descripcion_servicios', 'servicio_pagar', 'monto'];
    
    public function preaviso()
    {
        return $this->belongsTo(PreAvisoModel::class, 'preaviso_id');
    }
}
