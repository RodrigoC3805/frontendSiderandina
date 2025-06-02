import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RealizarCompraComponent } from './component/realizar-compra/realizar-compra.component';
import { PortalLayoutComponent } from './layouts/portal-layout/portal-layout.component';
import { SystemLayoutComponent } from './layouts/system-layout/system-layout.component';
import { NgModule } from '@angular/core';
import { TrabajadoresListaComponent } from './component/trabajadores-lista/trabajadores-lista.component';
import { TrabajadorFormComponent } from './component/trabajador-form/trabajador-form.component';
import { CategoriasSidebarComponent } from './component/categorias-sidebar/categorias-sidebar.component';
import { ProductosListaComponent } from './component/productos-lista/productos-lista.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { ProductoDetalleComponent } from './component/producto-detalle/producto-detalle.component';
import { StockProductosComponent } from './component/stock-productos/stock-productos.component';
import { RealizarVentaComponent } from './component/realizar-venta/realizar-venta.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: PortalLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'productos', component: CatalogoComponent},
            { path: 'productos/:id', component: ProductoDetalleComponent },
            { path: 'login', component: LoginComponent}
        ]
    },
    {
        canActivate:[authGuard],
        path: 'sistema',
        component: SystemLayoutComponent,
        children: [
            { path: 'realizar-compra', component: RealizarCompraComponent},
            { path: 'trabajadores', component: TrabajadoresListaComponent },
            { path: 'trabajadores/nuevo', component: TrabajadorFormComponent },
            { path: 'trabajadores/:id', component: TrabajadorFormComponent },
            { path: 'stock-productos', component: StockProductosComponent},
            { path: 'realizar-venta', component: RealizarVentaComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }