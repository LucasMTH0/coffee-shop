import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { UserSignalService } from '../../signals/user-signal/user-signal.service';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private auth: Auth, 
    private userSignal: UserSignalService, 
    private firestore: Firestore,
    private router: Router
  ) { }

  async login(email: string, password: string ) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password); 
      return credentials;
    } catch (err) {
      return null
    }
  }

  register(email: string, password: string){
    item$: Observable<any>;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        this.router.navigate(['/login']);
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    
  }

   logout(){
    localStorage.removeItem('@coffee-shop:user');
    this.userSignal.setUserSignal(null)
    return this.auth.signOut();
  }

  checkUserLogin() {
    const user = localStorage.getItem('@coffee-shop:user')
    if (user && user.length > 0) {
      this.userSignal.setUserSignal(JSON.parse(user));
      return true
    } 
    return false
  }

  getUserId(){
    const user: any = JSON.parse( localStorage.getItem('@coffee-shop:user') as string) ;
    return user ? user.uid : null;
  }
}
