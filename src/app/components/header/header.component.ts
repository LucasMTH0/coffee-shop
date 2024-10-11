import { Component, effect, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuOptionComponent } from "./components/menu-option/menu-option.component";
import { UserSignalService } from '../../signals/user-signal/user-signal.service';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MenuOptionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected userLogged: any = null;
  constructor(
    protected userSignal: UserSignalService,
    private authService: AuthService,
    private router: Router
  ){
    // effect(() => {
    //   const currentSignal = this.userSignal.getUserSignal();
    //   this.userSignal.setUserSignal(currentSignal)
    // })
  }

  menuMobileButtonToggleEvent(): void {
    const menuMobileButton = document.getElementById('menu-mobile-button')
    menuMobileButton?.addEventListener('click', (event) => {
      const element = event.target as HTMLButtonElement
      const navMenu = document.getElementById('nav-menu')
      navMenu?.classList.toggle('mobile-menu')
      menuMobileButton.classList.toggle('active')
    })
  }
  
  ngOnInit(): void {
    this.userLogged = this.userSignal.getUserSignal();
    this.menuMobileButtonToggleEvent()
  }

  async handleLogoutUser(): Promise<void>{
    const logout = await this.authService.logout()
    this.userLogged = null;
    this.router.navigate(['/auth/login']);
  }

}
