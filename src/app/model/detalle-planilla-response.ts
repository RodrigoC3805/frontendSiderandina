export interface DetallePlanillaResponse {
  idDetallePlanilla: number;
  idTrabajador: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sueldoBase: number;
  bonos: number;
  descuentos: number;
  sueldoNeto: number;
}