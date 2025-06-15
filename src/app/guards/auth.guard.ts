import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const tipoUsuario = auth.getTipoUsuario().toUpperCase();
  const rolesPermitidos = route.data['roles'];
  console.log("TIPO: " + tipoUsuario + "PERMITIDO: " + rolesPermitidos);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  if (!rolesPermitidos)
    return true;
  if (!rolesPermitidos.map((r: string) => r.toUpperCase()).includes(tipoUsuario)) {
    router.navigate(['/sistema']);
    return false;
  }
  return true;
};

