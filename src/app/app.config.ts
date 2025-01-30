import { AutoRefreshTokenService, KeycloakAngularModule, KeycloakService, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/(127\.0\.0\.1|localhost):8081)(\/.*)?$/i,
  bearerPrefix: 'Bearer',
});

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
} from 'keycloak-angular';


export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://127.0.0.1:8080',
      realm: 'sistema-backend',
      clientId: 'sistema',

    },
    initOptions: {
      onLoad: 'login-required',
      // silentCheckSsoRedirectUri:
      //   window.location.origin + '/silent-check-sso.html',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: `logout`,
        sessionTimeout: 300000,
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),

  ],
};
