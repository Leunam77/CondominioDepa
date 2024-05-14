<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cobro_Servicios\PreAvisoModel;

class ExpensaModel extends Model
{
    use HasFactory;
    protected $table = 'expensas';

    protected $fillable = [ 'departamento_id','propietario_pagar','fecha','descripcion_servicios','servicio_pagar','monto','id_propietarioPagar'];
    public function departamento()
    {
        return $this->belongsTo(PreAvisoModel::class, 'preaviso_id');
    }
}
