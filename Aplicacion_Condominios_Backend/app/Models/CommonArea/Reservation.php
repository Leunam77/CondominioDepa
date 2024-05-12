<?php

namespace App\Models\CommonArea;

<<<<<<< HEAD
=======
use App\Models\GestDepartamento\Residente;
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

<<<<<<< HEAD
    protected $primaryKey = 'id_reservation';
=======
    protected $primaryKey = 'id';
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

    protected $fillable = [
        'reserved_date',
        'start_time',
        'end_time',
        'reason',
        'number_of_people',
<<<<<<< HEAD
        'title'
=======
        'title',
        'reserva_pagada',
        'id_common_area',
        'id_resident'
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
    ];

    public function commonArea()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }
<<<<<<< HEAD
=======

    public function resident()
    {
        return $this->belongsTo(Residente::class, 'id_resident', 'id');
    }
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
}
