import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRole = route.data['roles'];


  const hasRequiredRole = (role: string[]): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) =>
      JSON.stringify(roles) === JSON.stringify(role)
    );

  if (authenticated && hasRequiredRole(requiredRole)) {
    console.log('authenticated', authData.keycloak.token);
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
