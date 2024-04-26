<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpensaModel extends Model
{
    use HasFactory;
    protected $table = 'expensas';

    protected $fillable = [ 'departamento_id','fecha','descripcion_servicios','monto'];
   
}
