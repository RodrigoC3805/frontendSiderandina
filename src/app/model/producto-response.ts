export interface IProductoResponse {
    idProducto : number;
    unidadesMedida : IUnidadesMedida; 
    categoriaProducto : ICategoriaProducto; 
    sku : number;
    nombre : string;
    precioVentaBase : number;
    costoUnitarioBase : number;
    stock : number;
    stockMin : number;
}
