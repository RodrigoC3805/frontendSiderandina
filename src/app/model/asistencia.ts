export interface IAsistenciaRequest {
  numeroDocumento: string;
  fecha: string; // formato YYYY-MM-DD
  horaIngreso?: string; // formato HH:mm:ss
  horaSalida?: string;  // formato HH:mm:ss
}