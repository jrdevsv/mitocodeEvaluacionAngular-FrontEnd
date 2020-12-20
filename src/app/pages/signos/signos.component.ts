import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignosService } from './../../_service/signos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Signos } from './../../_model/signos';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  displayedColumns = ['idPaciente','nombre','apellidos','fecha','temperatura','pulso','ritmo','acciones'];
  dataSource: MatTableDataSource<Signos>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public route: ActivatedRoute,
    private signosService: SignosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signosService.getSignosCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signosService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.signosService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(signo: Signos) {
    
    this.signosService.eliminar(signo.idSigno).pipe(switchMap(() => {
      return this.signosService.listar();
    })).subscribe(data => {
      this.signosService.setSignosCambio(data);
      this.signosService.setMensajeCambio('SE ELIMNO');
    });
  }

}
