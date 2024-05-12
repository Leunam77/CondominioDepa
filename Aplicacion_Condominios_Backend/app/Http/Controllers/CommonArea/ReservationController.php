<?php

namespace App\Http\Controllers\CommonArea;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommonArea\ReservationRequest;
use App\Models\CommonArea\CommonArea;
use App\Models\CommonArea\Reservation;
<<<<<<< HEAD
=======
use App\Models\GestDepartamento\Residente;
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
use App\Services\CommonArea\CommonAreaService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

    private $commonAreaService;

    public function __construct(
        CommonAreaService $commonAreaService
    )
    {
        $this->commonAreaService = $commonAreaService;
    }

    public function index()
    {
        //
    }

    public function store(ReservationRequest $request)
    {
        [
<<<<<<< HEAD
=======
            "idResident" => $id_resident,
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
            "idCommonArea" => $id_common_area,
            "reservationDate" => $reserved_date,
            "startTime" => $start_time,
            "endTime" => $end_time,
            "reason" => $reason,
            "numberPeople" => $number_people,
            "title" => $title,
        ] = $request->all();

        $isValidate = $this->commonAreaService->validateTimeReservation($id_common_area, $reserved_date, $start_time, $end_time);

        if(!$isValidate){
            return response()->json(['message' => 'El horario no esta disponible.',"errors" => []], 400);
        }

        $commonArea = CommonArea::find($id_common_area);
<<<<<<< HEAD
=======
        $resident = Residente::find($id_resident);
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada',"errors" => []], 404);
        }

<<<<<<< HEAD
        $commonArea->reservations()->create([
            'reserved_date' => $reserved_date,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'reason' => $reason,
            'number_of_people' => $number_people,
            'title' => $title
        ]);


        return response()->json(['message' => 'Reservacion creada correctamente'], 201);
    }

=======
        if(!$resident){
            return response()->json(['message' => 'Residente no encontrado',"errors" => []], 404);
        }

        try {
            Reservation::create([
                'reserved_date' => $reserved_date,
                'start_time' => $start_time,
                'end_time' => $end_time,
                'reason' => $reason,
                'number_of_people' => $number_people,
                'title' => $title,
                'reserva_pagada' => 0, // Establecer el valor predeterminado a 0,
                'id_common_area' => $id_common_area,
                'id_resident' => $id_resident
            ]);
            } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear la reservacion.',"errors" => [
                $e->getMessage()
            ]], 500);
        }

        return response()->json(['message' => 'Reservación creada correctamente'], 201);
    }





    
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
    public function show(Reservation $reservation)
    {
        //
    }

    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    public function destroy(Reservation $reservation)
    {
        //
    }
}
