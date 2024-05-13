import { AxiosResponse } from "axios";
import api from "../api";


  export interface Insumo {
    idInsumo: number
    idSolicitud: number
    nombreInsumo: string
    precioInsumo: number
    created_at: any
    updated_at: any
    solicitud: Solicitud
  }
  
  export interface Solicitud {
    idRegistroSolicitud: number
    idCategoria: number
    idEstado: number
    idPersonalExterno: any
    descripcion: string
    nombrePropietario: string
    ubicacion: any
    numerReferencia: string
    encargado: string
    fechaSolicitud: string
    fechaFinalizado: any
    created_at: any
    updated_at: any
    categoria: Categoria
  }
  
  export interface Categoria {
    id: number
    catnombre: string
    catdescripcion: string
    created_at: any
    updated_at: any
  }
  



  
//* to get all insumos
export const getAllInsumos = async (): Promise<Insumo[]>=>{
    try{
        const response = await api.get(
                "/insumo"
        );
        return response.data;
    }catch(error){
        console.error("Error fetching categories:", error);
        return [];
    }

};
