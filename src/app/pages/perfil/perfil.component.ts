import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  decodedToken: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  this.decodedToken = this.data;
  }

}

