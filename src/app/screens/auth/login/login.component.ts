import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthFormComponent } from '@components/auth-form/auth-form.component';
import { UserSignalService } from '@signals/user-signal/user-signal.service';
import { LoadingComponent } from '@components/loading/loading.component';
import { LoadingService } from '@services/Loading/loading.service';
import { AuthService } from '@services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  imports: [
    AuthFormComponent,
    LoadingComponent,
    AsyncPipe,
],
})

export class LoginComponent {

  constructor( 
    protected router: Router,
    protected authService: AuthService, 
    private userSignal: UserSignalService,
    protected loadingService: LoadingService,
  ) {}


  async loginUserAndsetUserLoginData(loginForm: any){
    const {email, password} = loginForm
    const userCredentials: any = await this.authService.login(email, password)
    this.userSignal.setUserSignal(userCredentials.user)
    localStorage.setItem('@coffee-shop:user', JSON.stringify(userCredentials.user))
  }
  
  async handleSignIn(userForm: any) {
    this.loadingService.loadingOn()
    try {
      this.loginUserAndsetUserLoginData(userForm)
      this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.loadingOff()
    }
  }
}
