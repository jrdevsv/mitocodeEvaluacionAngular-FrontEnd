import { switchMap } from 'rxjs/operators';
import { Signos } from './../../../_model/signos';
import { SignosService } from './../../../_service/signos.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PacienteService } from './../../../_service/paciente.service';
import { Observable } from 'rxjs';
import { Paciente } from './../../../_model/paciente';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  idPacienteSeleccionado: number;
  pacientes: Paciente[];
  pacientes$: Observable<Paciente[]>;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();
  temperatura: string;
  pulso: string;
  ritoResp: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private signosService: SignosService
  ) { }

  ngOnInit(): void {
    this.pacientes$ = this.pacienteService.listar();

    this.form = new FormGroup({
      'pacienteForm': new FormControl(0),
      'id': new FormControl(0),
      'fechaForm': new FormControl(new Date()),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

  }

  get f() { return this.form.controls; }

  private initForm() {
    if (this.edicion) {

      this.signosService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'pacienteForm': new FormControl(data.paciente.idPaciente),
          'id': new FormControl(data.idSigno),
          'fechaForm': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmoResp)
        });
        this.idPacienteSeleccionado = data.paciente.idPaciente;
      });
    }
  }

  operar() {

    if (this.form.invalid) { return; }

    let s = new Signos();
    let p = new Paciente();
    //s. = this.form.value['id'];
    p.idPaciente = this.idPacienteSeleccionado;
    s.paciente = p;
    s.idSigno = this.form.value['id'];
    s.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    s.temperatura = this.form.value['temperatura'];
    s.pulso = this.form.value['pulso'];
    s.ritmoResp = this.form.value['ritmo'];
    if (this.edicion) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.signosService.modificar(s).pipe(switchMap(() => {
        return this.signosService.listar();
      })).subscribe(data => {
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE MODIFICÓ');
      });
    } else {
      //REGISTRAR
      //PRACTICA COMUN
      this.signosService.registrar(s).subscribe(() => {
        this.signosService.listar().subscribe(data => {
          this.signosService.setSignosCambio(data);
          this.signosService.setMensajeCambio('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['signos']);
  }


  imprimir(numero: any) {
    console.log(numero);
  }

}
