import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { provideFirestore } from '@angular/fire/firestore';
import { provideDatabase } from '@angular/fire/database';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]), 
        provideHttpClient(), 
        provideFirebaseApp(() => initializeApp({"projectId":"coffee-shop-2112a","appId":"1:1058237880778:web:eabb6745b60dcdb02a5733","databaseURL":"https://coffee-shop-2112a-default-rtdb.firebaseio.com","storageBucket":"coffee-shop-2112a.appspot.com","apiKey":"AIzaSyAdbTdRMQLU5G6VWM6X-WKUmzQBO5MUDr8","authDomain":"coffee-shop-2112a.firebaseapp.com","messagingSenderId":"1058237880778"})), 
        provideAuth(() => getAuth()), 
        provideFirestore(() => getFirestore()), 
        provideDatabase(() => getDatabase()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
