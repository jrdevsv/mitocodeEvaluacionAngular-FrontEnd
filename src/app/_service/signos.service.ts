
import { Subject } from 'rxjs';
import { Signos } from './../_model/signos';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos> {


  private signosCambio = new Subject<Signos[]>();
  private mensajeCambio = new Subject<string>();
  
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signos`
    );
  }

  ////////////////// get, set ////////////////

  getSignosCambio() {
    return this.signosCambio.asObservable();
  }

  setSignosCambio(signos: Signos[]) {
    this.signosCambio.next(signos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    return this.mensajeCambio.next(mensaje);
  }
}
