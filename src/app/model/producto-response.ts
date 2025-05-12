import { ICategoriaProducto } from "./categoria-producto";
import { IUnidadesMedida } from "./unidades-medida";

export interface IProductoResponse {
    idProducto : number;
    unidadesMedida : IUnidadesMedida; 
    categorioProducto : ICategoriaProducto; 
    sku : number;
    nombre : String;
    precioVentaBase : number;
    costoUnitarioBase : number;
    stock : number;
    stockMin : number;
    urlImagen: string;
}
