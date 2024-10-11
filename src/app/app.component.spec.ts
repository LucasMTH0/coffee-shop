import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { provideDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideFirebaseApp(() => initializeApp({"projectId":"coffee-shop-2112a","appId":"1:1058237880778:web:eabb6745b60dcdb02a5733","databaseURL":"https://coffee-shop-2112a-default-rtdb.firebaseio.com","storageBucket":"coffee-shop-2112a.appspot.com","apiKey":"AIzaSyAdbTdRMQLU5G6VWM6X-WKUmzQBO5MUDr8","authDomain":"coffee-shop-2112a.firebaseapp.com","messagingSenderId":"1058237880778"})), 
        provideAuth(() => getAuth()), 
        provideFirestore(() => getFirestore()), 
        provideDatabase(() => getDatabase()),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
