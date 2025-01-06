import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const authCodeFlowConfig = {
  issuer:  "http://localhost:9081/realms/sistema-backend",
  tokenEndpoint: "http://localhost:9081/realms/sistema-backend/protocol/openid-connect/token",
  redirectUri: window.location.origin,
  clientId: "sistemaClient",
  responseType: "code",
  scope: "openid profile",
  locale: "pt-BR",
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideOAuthClient(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => () => initializeOAuth(oauthService),
      multi: true,
      deps: [OAuthService],
    }, provideAnimationsAsync()
  ],
};
