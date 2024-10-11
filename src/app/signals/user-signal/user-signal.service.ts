import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSignalService {
  private userSignal = signal(null);

  getUserSignal(){
    const user = this.userSignal.asReadonly();
    return user();
  }

  setUserSignal(user: any){
    this.userSignal.set(user);
  }
}
