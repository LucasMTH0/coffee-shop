import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { environment } from './environments';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp(environment.FIREBASE)), 
    { provide: FIREBASE_OPTIONS, useValue: environment.FIREBASE },
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()), 
    provideAnimations(),
    provideToastr(), provideAnimationsAsync(), 
  ]
};
