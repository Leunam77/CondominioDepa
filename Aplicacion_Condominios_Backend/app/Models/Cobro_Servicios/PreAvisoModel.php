<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GestDepartamento\departamento;

class PreAvisoModel extends Model
{
    use HasFactory;
    protected $table = 'preavisos';

    protected $fillable = [ 'departamento_id','propietario_pagar','fecha','descripcion_servicios','servicio_pagar','monto'];
    public function departamento()
    {
        return $this->belongsTo(departamento::class, 'departamento_id');
    }
    
    protected static function boot()
    {
        parent::boot();

        // Este evento se disparará cuando se esté creando un nuevo preaviso
        static::creating(function ($preaviso) {
            // Obtén el nombre del residente asociado al departamento y asígnalo al atributo propietario_pagar
            $departamento = $preaviso->departamento;
            $nombre_residente = $departamento->contrato ? $departamento->contrato->residente->nombre_residente : 'Sin residente';
            $preaviso->propietario_pagar = $nombre_residente;
        });
    }
}
