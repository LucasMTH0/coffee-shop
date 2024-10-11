import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from '@components/header/header.component';
import { LoadingService } from '@services/Loading/loading.service';
import { AuthService } from '@services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  imports: [LoadingComponent, HeaderComponent, RouterOutlet, AsyncPipe, NgxLoadingModule,],
  templateUrl: './app.component.html',
  selector: 'app-root',
  standalone: true,
})
export class AppComponent {
  constructor(
    protected loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.authService.checkUserLogin();
  }
}
