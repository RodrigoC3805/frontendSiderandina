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
import { AsistenciaFormComponent } from './component/asistencia-form/asistencia-form.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './component/register/register.component';
import { reverseGuard } from './guards/reverse.guard';
import { PedidoProveedorComponent } from './component/pedido-proveedor/pedido-proveedor.component';
import { AsistenciaListaComponent } from './component/asistencia-lista/asistencia-lista.component';
import { MisCotizacionesComponent } from './component/mis-cotizaciones/mis-cotizaciones.component';
import { RealizarCotizacionComponent } from './component/realizar-cotizacion/realizar-cotizacion.component';
import { MisPedidosComponent } from './component/mis-pedidos/mis-pedidos.component';
import { MisJustificacionesComponent } from './component/mis-justificaciones/mis-justificaciones.component';
import { GestionarDespachoComponent } from './component/gestionar-despacho/gestionar-despacho.component';
import { GestionarPlanillaComponent } from './component/gestionar-planilla/gestionar-planilla.component';

export const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'productos', component: CatalogoComponent },
      { path: 'productos/:id', component: ProductoDetalleComponent },
      { path: 'login', component: LoginComponent, canActivate: [reverseGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [reverseGuard],
      },
    ],
  },
  {
    path: 'sistema',
    component: SystemLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'realizar-compra',
        component: RealizarCompraComponent,
        data: { roles: ['JEFE_ALMACEN'] },
      },
      {
        path: 'trabajadores',
        component: TrabajadoresListaComponent,
        data: { roles: ['ADMIN_RRHH'] },
      },
      {
        path: 'trabajadores/nuevo',
        component: TrabajadorFormComponent,
        data: { roles: ['ADMIN_RRHH'] },
      },
      {
        path: 'trabajadores/:id',
        component: TrabajadorFormComponent,
        data: { roles: ['ADMIN_RRHH'] },
      },
      {
        path: 'stock-productos',
        component: StockProductosComponent,
        data: { roles: ['JEFE_ALMACEN'] },
      },
      {
        path: 'realizar-venta',
        component: RealizarVentaComponent,
        data: { roles: ['CLIENTE'] },
      },
      {
        path: 'mis-cotizaciones',
        component: MisCotizacionesComponent,
        data: { roles: ['CLIENTE'] },
      },
      {
        path: 'mis-pedidos',
        component: MisPedidosComponent,
        data: { roles: ['CLIENTE'] },
      },
      {
        path: 'registrar-asistencia',
        component: AsistenciaFormComponent,
        data: { roles: ['ADMIN_RRHH'] },
      },
      {
        path: 'pedidos-proveedor',
        component: PedidoProveedorComponent,
        data: { roles: ['PROVEEDOR'] },
      },
      {
        path: 'asistencias',
        component: AsistenciaListaComponent,
        data: { roles: ['ADMIN_RRHH'] },
      },
      {
        path: 'realizar-cotizacion',
        component: RealizarCotizacionComponent,
        data: { roles: ['VENDEDOR'] },
      },
      {
        path: 'mis-justificaciones',
        component: MisJustificacionesComponent,
        data: { roles: ['VENDEDOR', 'JEFE_ALMACEN', 'GERENTE_GENERAL'] },
      },
      {
        path: 'gestionar-despacho',
        component: GestionarDespachoComponent,
        data: { roles: ['VENDEDOR'] },
      },
      {
        path: 'gestionar-planilla',
        component: GestionarPlanillaComponent,
        data: { roles: ['ADMIN_RRHH'] }
      }
    ],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
