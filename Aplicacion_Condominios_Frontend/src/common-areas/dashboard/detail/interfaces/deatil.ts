export interface ReportFormData {
  idUsuario: number;
  idAreaComun: number;
  idProducto: number;
  costo: number;
  costoReponer: number;
  cantidadActual: number;
  cantidadReponer: number;
  situacion: string;
  informacionAdicional: string;
}

export interface ReportCreateDTO {
  Id_residente: number;
  Id_areaComun: number;
  Id_equipment: number;
  Costo_reponer: number;
  Cantidad_reponer: number;
  Situacion: string;
  Info: string;
}
