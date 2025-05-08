export interface IProductoRequest {
    idProducto : number;
    sku : number;
    nombre : string;
    precioVentaBase: number;
    costoUnitarioBase : number;
    stock : number;
    stockMin : number;
    idUnidadesMedida : number;
    idCatProd : number;
}
