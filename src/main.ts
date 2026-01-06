import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
// import { isDevMode } from '@angular/core'; <-- KITA HAPUS INI
// import { provideServiceWorker } from '@angular/service-worker'; <-- KITA HAPUS INI

import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      mode: 'ios',
      animated: true,
    }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideServiceWorker(...) <-- KITA HAPUS BAGIAN INI AGAR TIDAK CRASH
    
    provideHttpClient(),
  ],
});