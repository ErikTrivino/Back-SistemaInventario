import { Routes } from '@angular/router'; import { AppComponent } from './app.component';
import { GestionClientesComponent } from './componentes/gestion-clientes/gestion-clientes.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { CrearClienteComponent } from './componentes/crear-cliente/crear-cliente.component';
import { GestionProveedorComponent } from './componentes/gestion-proveedor/gestion-proveedor.component';
import { EditarProveedorComponent } from './componentes/editar-proveedor/editar-proveedor.component';
import { CrearProveedorComponent } from './componentes/crear-proveedor/crear-proveedor.component';
import { CrearVehiculoComponent } from './componentes/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './componentes/editar-vehiculo/editar-vehiculo.component';
import { GestionVehiculoComponent } from './componentes/gestion-vehiculo/gestion-vehiculo.component';
import { GestionUsuarioComponent } from './componentes/gestion-usuario/gestion-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { GestionProductoComponent } from './componentes/gestion-producto/gestion-producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { GestionServicioComponent } from './componentes/gestion-servicio/gestion-servicio.component';
import { EditarServicioComponent } from './componentes/editar-servicio/editar-servicio.component';
import { CrearServicioComponent } from './componentes/crear-servicio/crear-servicio.component';
import { EditarFacturaComponent } from './componentes/editar-factura/editar-factura.component';
import { CrearFacturaComponent } from './componentes/crear-factura/crear-factura.component';
import { GestionPedidoComponent } from './componentes/gestion-pedido/gestion-pedido.component';
import { GestionFacturaComponent } from './componentes/gestion-factura/gestion-factura.component';
import { EditarPedidoComponent } from './componentes/editar-pedido/editar-pedido.component';
import { CrearPedidoComponent } from './componentes/crear-pedido/crear-pedido.component';
import { CrearDetalleServicioProductoComponent } from './componentes/crear-detalle-servicio-producto/crear-detalle-servicio-producto.component';
import { EditarDetalleServicioProductoComponent } from './componentes/editar-detalle-servicio-producto/editar-detalle-servicio-producto.component';
import { EditarDetalleFacturaComponent } from './componentes/editar-detalle-factura/editar-detalle-factura.component';
import { CrearDetalleFacturaComponent } from './componentes/crear-detalle-factura/crear-detalle-factura.component';
import { EditarDetallePedidoComponent } from './componentes/editar-detalle-pedido/editar-detalle-pedido.component';
import { CrearDetallePedidoComponent } from './componentes/crear-detalle-pedido/crear-detalle-pedido.component';
import { EditarDetalleServicioVehiculoComponent } from './componentes/editar-detalle-servicio-vehiculo/editar-detalle-servicio-vehiculo.component';
import { CrearDetalleServicioVehiculoComponent } from './componentes/crear-detalle-servicio-vehiculo/crear-detalle-servicio-vehiculo.component';
import { RolesGuard } from './guards/roles.service';
import { LoginGuard } from './guards/permiso.service';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

export const routes: Routes = [

    { path: 'gestion-clientes', component: GestionClientesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-cliente/:id', component: EditarClienteComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-cliente', component: CrearClienteComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-proveedor', component: GestionProveedorComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-proveedor/:id', component: EditarProveedorComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-proveedor', component: CrearProveedorComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-vehiculo', component: GestionVehiculoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-vehiculo/:id', component: EditarVehiculoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-vehiculo', component: CrearVehiculoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-usuario', component: GestionUsuarioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
    { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
    { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },

    { path: 'gestion-producto', component: GestionProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-producto', component: CrearProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-servicio', component: GestionServicioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-servicio/:id', component: EditarServicioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-servicio', component: CrearServicioComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-factura', component: GestionFacturaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-factura/:id', component: EditarFacturaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-factura', component: CrearFacturaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'gestion-pedido', component: GestionPedidoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'editar-pedido/:id', component: EditarPedidoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-pedido', component: CrearPedidoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'editar-detalle-servicio-producto/:id', component: EditarDetalleServicioProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-detalle-servicio-producto', component: CrearDetalleServicioProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'editar-detalle-factura/:id', component: EditarDetalleFacturaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-detalle-factura', component: CrearDetalleFacturaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'editar-detalle-pedido/:id', component: EditarDetallePedidoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-detalle-pedido/:id', component: CrearDetallePedidoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },

    { path: 'editar-detalle-servicio-vehiculo/:id', component: EditarDetalleServicioVehiculoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN", "USUARIO"] } },
    { path: 'crear-detalle-servicio-vehiculo', component: CrearDetalleServicioVehiculoComponent },
    { path: 'dashboard', component: DashboardComponent },
    //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },





    { path: "**", pathMatch: "full", redirectTo: "dashboard" }  // Redirección a la página de inicio para rutas no encontradas
];

