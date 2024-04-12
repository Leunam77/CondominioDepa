<?php

namespace App\Http\Controllers\CommonArea;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommonAreaRequest;
use App\Http\Resources\CommonAreaCollection;
use App\Http\Resources\CommonAreaResource;
use App\Models\CommonArea\CommonArea;
use App\Models\CommonArea\Policy;
use App\Models\CommonArea\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommonAreaController extends Controller
{
    public function index()
    {
        $commonAreas = CommonArea::all();
        $commonAreas = new CommonAreaCollection($commonAreas);
        return response()->json(['data' => [
           'commonAreas' => $commonAreas]
        ], 200);
    }

    public function store(CommonAreaRequest $request)
    {
        $policies = $request->get('policies');
        $schedule = $request->get('schedule');
        $dataCommonArea = [
            'common_area_name' => $request->get('name'),
            'description' => $request->get('description'),
            'capacity' => $request->get('capacity')
        ];

        try{
            $commonArea = null;
        DB::transaction(function () use ($policies, $schedule, &$commonArea, $dataCommonArea) {
                $commonArea = CommonArea::create($dataCommonArea);
                $schedule = collect($schedule)->map(function ($item) use ($commonArea) {
                    return [
                        'schedule_day' => $item['day'],
                        'start_hour' => $item['startHour'],
                        'end_hour' => $item['endHour'],
                        'id_common_area' => $commonArea->id_common_area
                    ];
                });
    
                $policies = collect($policies)->map(function ($item) use ($commonArea) {
                    return [
                        'description' => $item,
                        'id_common_area' => $commonArea->id_common_area
                    ];
                });
                
                Schedule::insert($schedule->toArray());
                Policy::insert($policies->toArray());
            });

            return response()->json(['data' => [
                'message' => 'Area comun creada correctamente',
                'common_area' => $commonArea
            ]], 201);
        }catch(\Exception $e){
            return response()->json(['message' => 'Error al crear el area comun',
            'detail' => $e->getMessage()
        ], 500);
        }
    }

    public function show($idCommonArea)
    {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        return response()->json(['data' => [
            'commonArea' => new CommonAreaResource($commonArea)
        ]], 200);
    }

    public function update(Request $request, CommonArea $commonArea)
    {
        //
    }

    public function destroy($idCommonArea)
    {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        $commonArea->delete();
        return response()->json(['message' => 'Area comun eliminada correctamente'], 200);
    }
}
