export interface Detail {
  nombreUsuario: string;
  nombreArea: string;
  nombreProducto: string;
  costo: string;
  costoReponer: string;
  cantidadActual: string;
  cantidadReponer: string;
  situacion: string;
}

export interface DetailCreateDTO {
  Id_residente: number;
  Id_areaComun: number;
  Id_equipment: number;
  Costo_reponer: number;
  Cantidad_reponer: number;
  Situacion: string;
  Info: string;
}
