<?php

namespace App\Models\CommonArea;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'reserved_date',
        'start_time',
        'end_time',
        'reason',
        'number_of_people',
        'title',
        'reserva_pagada'
    ];

    public function commonArea()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }
}
