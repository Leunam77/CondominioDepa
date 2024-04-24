<?php

namespace App\Observers;

use App\Models\GestDepartamento\Contrato;
use App\Models\GestDepartamento\Residente;

class ContratoObserver
{
    /**
     * Handle the Contrato "created" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function created(Contrato $contrato)
    {
        //$id_departamento = $contrato->departamento_id;
        $id_contrato= $contrato->id;
        $residentes=Residente::where('contrato_id',$id_contrato)->get();
        //verificar si la fecha fin es anterior a la fecha actual
        if($contrato->fecha_fin < now()){
            $contrato->vigente_contrato = 0;
            $contrato->departamento_id = null;
            foreach($residentes as $residente){
                $residente->id_contrato = null;
                $residente->save();
            }
            $contrato->save();
        }

    }

    /**
     * Handle the Contrato "updated" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function updated(Contrato $contrato)
    {
        //
    }

    /**
     * Handle the Contrato "deleted" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function deleted(Contrato $contrato)
    {
        //
    }

    /**
     * Handle the Contrato "restored" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function restored(Contrato $contrato)
    {
        //
    }

    /**
     * Handle the Contrato "force deleted" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function forceDeleted(Contrato $contrato)
    {
        //
    }
}
