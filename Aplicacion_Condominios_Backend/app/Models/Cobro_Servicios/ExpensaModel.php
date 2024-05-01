<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GestDepartamento\departamento;
<<<<<<< HEAD

=======
>>>>>>> 565c734cbdf334395c2a9ffbf90693c4d0779af3
class ExpensaModel extends Model
{
    use HasFactory;
    protected $table = 'expensas';

<<<<<<< HEAD
    protected $fillable = [ 'departamento_id','fecha','descripcion_servicios','monto'];
=======
    protected $fillable = [ 'departamento_id','propietario_pagar','fecha','descripcion_servicios','servicio_pagar','monto'];
>>>>>>> 565c734cbdf334395c2a9ffbf90693c4d0779af3
    public function departamento()
    {
        return $this->belongsTo(departamento::class, 'departamento_id');
    }
<<<<<<< HEAD
    
=======
>>>>>>> 565c734cbdf334395c2a9ffbf90693c4d0779af3
}
