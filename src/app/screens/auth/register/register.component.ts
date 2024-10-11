import { AuthFormComponent } from '@components/auth-form/auth-form.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { LoadingService } from '@services/Loading/loading.service';
import { AuthService } from '@services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  selector: 'app-register',
  standalone: true,
  imports: [ 
    AuthFormComponent,
    LoadingComponent, 
    AsyncPipe, 
  ],
})

export class RegisterComponent {
  constructor(
    protected router: Router,
    protected authService: AuthService, 
    protected loadingService: LoadingService,
  ){}

  async handleRegisterNewUser(userForm: any){
    this.loadingService.loadingOn()
    const { email, password } = userForm
    try {
      await this.authService.register(email, password)
    } catch(error) {
      console.log("deu erro: ", error)
    } finally {
      this.loadingService.loadingOff();
    }
  }
}
