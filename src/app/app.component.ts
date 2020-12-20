import { JwtHelperService } from '@auth0/angular-jwt';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menus: Menu[];

  constructor(
    public loginService: LoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });
  }

  abrirDialogo() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let decodedToken = helper.decodeToken(token);

    this.dialog.open(PerfilComponent, {
      width: '350px',
      data: decodedToken
    })
  }

}
