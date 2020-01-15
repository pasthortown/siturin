import { ConsultorService } from './../services/negocio/consultor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../models/profile/User';
import { DinardapService } from '../services/negocio/dinardap.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'inactivacion-login',
    templateUrl: './inactivacion.component.html',
    styleUrls: ['./inactivacion.component.scss']
})
export class InactivacionComponent implements OnInit {

  busy: Promise<any>;
  user: User;
  identificationValidated = false;
  consumoCedula = false;
  fechaExpedicion = 'porValidar';
  fechaExpiracion = 'porValidar';
  fechaNacimiento = 'porValidar';
  fechaIngresada = '';
  REGCIVILOK = false;
  identidadConfirmada = false;
  CedulaData = '';
  aleatorio = 0;
  
  constructor(private consultorDataService: ConsultorService,
    private router: Router, 
    private modalService: NgbModal,
    private toastr: ToastrManager,
    private dinardapDataService: DinardapService) {}
  
  ngOnInit() {
  }

  openDialog(content) {
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       
    }), ( r => {}));
  }

  checkCedula() {
    this.user.identification = this.user.identification.replace(/[^\d]/, '');
    if (this.user.identification.length !== 10) {
       this.identificationValidated = false;
       this.consumoCedula = false;
       this.fechaIngresada = '';
       this.identidadConfirmada = false;
       return;
    }
    if (this.consumoCedula && this.REGCIVILOK) {
       return;
    }
    this.CedulaData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al Registro Civil...</strong></div>';
    if (!this.consumoCedula) {
       this.identificationValidated = true;
       this.consumoCedula = true;
       this.dinardapDataService.get_cedula(this.user.identification).then( r => {
          const registros = r.original.entidades.entidad.filas.fila.columnas.columna;
          this.CedulaData = '';
          this.REGCIVILOK = true;
          let sorteo = [];
          registros.forEach(element => {
             if (element.campo === 'cedula') {
                if (element.valor === this.user.identification) {
                  this.toastr.successToastr('La cédula ingresada es correcta.', 'Registro Civil');
                  this.identificationValidated = true;
                } else {
                  this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
                  this.identificationValidated = false;
                }
             }
             if (this.identificationValidated) {
                if (element.campo === 'nombre') {
                   this.user.name= element.valor;
                }
                if (element.campo === 'fechaNacimiento') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(0);
                   }
                   this.fechaNacimiento = element.valor;
                }
                if (element.campo === 'fechaExpiracion') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(1);
                   } 
                  this.fechaExpiracion = element.valor;
                }
                if (element.campo === 'fechaExpedicion') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(2);
                   }
                   this.fechaExpedicion = element.valor;
                }
             }
          });
          const indice = Math.floor(Math.random() * sorteo.length);
          this.aleatorio = sorteo[indice];
       }).catch( e => {
         this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
         this.CedulaData = '<div class="alert alert-danger" role="alert">El Registro Civil, no respondió. Vuelva a intentarlo.</div>';
         this.REGCIVILOK = false;
         this.consumoCedula = false;
       });
    }
   }
}
