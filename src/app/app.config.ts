import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './core/intercptor/token.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { spinnerInterceptor } from './core/intercptor/spinner.interceptor';
import { handleErrorInterceptor } from './core/intercptor/handle-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor  , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: handleErrorInterceptor  , multi: true },

    provideAnimationsAsync()]
};

