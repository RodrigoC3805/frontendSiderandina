export interface IProductoRequest {
    idProducto : number;
    idUnidadesMedida : number; 
    idCatProd : number; 
    sku : number;
    nombre : String;
    precioVentaBase : number;
    costoUnitarioBase : number;
    stock : number;
    stockMin : number;
}
