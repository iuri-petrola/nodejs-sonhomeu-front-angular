import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/servicos/alert.service';
import { AuthService } from 'src/app/core/servicos/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private router: Router
  ) {}

  userName: string | null = null;
  
  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }


  logout() {
    this.authService.logout();
    this.alert.success('Logout realizado com sucesso !.');
  }

  menuAberto = false;
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}
