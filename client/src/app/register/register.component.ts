import { EstablishmentOnRuc } from './../models/negocio/EstablishmentOnRuc';
import { User } from './../models/profile/User';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DinardapService } from '../services/negocio/dinardap.service';
import { Ruc } from '../models/BASE/Ruc';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  ruc: Ruc = new Ruc();
  busy: Promise<any>;
  esperando: Boolean;
  rucInactive = true;
  identificationValidated = false;
  consumoCedula = false;
  cedulaNombre = '';
  cuentaInterno = false;
  identidadConfirmada = false;
  rucValidated = false;
  consumoRuc = false;
  rucData = '';
  emailContactValidated = false;
  CedulaData = '';
  REGCIVILOK = false;
  SRIOK = false;
  fechaExpedicion = 'porValidar';
  fechaExpiracion = 'porValidar';
  fechaNacimiento = 'porValidar';
  fechaIngresada = '';

  aleatorio = 0;

  constructor(private router: Router,
    private authDataServise: AuthService,
    private toastr: ToastrManager,
    private dinardapDataService: DinardapService) {}

  ngOnInit() {
    this.user = new User();
    this.ruc = new Ruc();
    this.esperando = false;
  }

  registrar() {
     if (this.user.email.split('@')[1] == 'turismo.gob.ec'){
      if(this.emailContactValidated && this.identidadConfirmada && !this.esperando){
         this.esperando = true;
         this.user.ruc = this.user.identification + '001';
         this.ruc.number = this.user.identification + '001';
         this.ruc.contact_user = this.user;
         this.busy = this.authDataServise.register(this.user).then( r => {
            this.esperando = false;
            if (r == 0 || typeof r == 'undefined') {
               Swal.fire({
                  title: 'La información proporcionada no es correcta.',
                  text: 'No es posible crear una nueva cuenta, con la información proporcionada.',
                  type: 'error',
                })
                .then( response => {
                  this.router.navigate(['/login']);
                });
                return;
            }
            Swal.fire({
              title: 'Te damos la bienvenida',
              text: 'Tu contraseña, es la misma que utilizas para acceder a tu correo institucional.',
              type: 'success',
            })
            .then( response => {
              this.user = new User();
              this.ruc = new Ruc();
              this.router.navigate(['/login']);
            });
          }).catch( e => {
            this.esperando = false;
            console.log(e);
          });
        } else {
         Swal.fire({
            title: 'Datos no confirmados',
            text: 'El registro no se pudo completar, los datos ingresados no se pudieron confirmar.',
            type: 'error',
          });
        }
     } else {
      if(this.emailContactValidated && this.rucValidated && this.identidadConfirmada && !this.esperando){
         this.esperando = true;
         this.user.ruc = this.ruc.number;
         this.ruc.contact_user = this.user;
         this.busy = this.authDataServise.register(this.user).then( r => {
            this.esperando = false;
            if (r == 0 || typeof r == 'undefined') {
               Swal.fire({
                  title: 'La información proporcionada no es correcta.',
                  text: 'No es posible crear una nueva cuenta, con la información proporcionada.',
                  type: 'error',
                })
                .then( response => {
                  this.router.navigate(['/login']);
                });
                return;
            }
            Swal.fire({
              title: 'Te damos la bienvenida',
              text: 'Enviamos tu contraseña a tu correo',
              type: 'success',
            })
            .then( response => {
              this.user = new User();
              this.ruc = new Ruc();
              this.router.navigate(['/login']);
            });
          }).catch( e => {
            this.esperando = false;
            console.log(e);
          });
        } else {
         Swal.fire({
            title: 'Datos no confirmados',
            text: 'El registro no se pudo completar, los datos ingresados no se pudieron confirmar.',
            type: 'error',
          });
        }
     }
     
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

   checkRuc() {
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      return;
    }
    if (this.consumoRuc && this.SRIOK) {
       return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRuc && this.identificationValidated) {
      this.rucValidated = true;
      this.consumoRuc = true;
      this.rucInactive = true;
      this.dinardapDataService.get_RUC(this.ruc.number).then( r => {
         const sri_ruc_registros = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
         sri_ruc_registros.forEach(element => {
            if (element.campo === 'estadoContribuyente') {
               if (element.valor === 'ACTIVO') {
                  this.rucData = '<strong>Estado del RUC: </strong> CONFIRMADO';
                  this.rucInactive = false;
                  this.SRIOK = true;
               } else {
                  this.toastr.errorToastr('El RUC ingresado no es Activo.', 'SRI');
                  this.rucData = 'RUC INACTIVO';
                  this.rucInactive = false;
                  this.SRIOK = true;
               }
            }
         });
      }).catch( e => {
         this.toastr.errorToastr('El RUC ingresado no es correcto.', 'SRI');
         this.rucData = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
         this.consumoRuc = false;
         this.SRIOK = false;
      });
   }
  }

  checkEmail(): Boolean {
    const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email.toString());
    this.emailContactValidated = isOk;
    if (!isOk) {
       this.user.identification = '';
       this.fechaIngresada = '';
       this.user.name = '';
    }
    if (this.user.email.split('@')[1] == 'turismo.gob.ec') {
       this.cuentaInterno = true;
    } else {
      this.cuentaInterno = false;
    }
    return this.emailContactValidated;
  }

   confirmarIdentidad() {
      if (this.fechaIngresada == '') {
        return false;
      }
      if (this.aleatorio == 0) {
         if( this.fechaIngresada == this.fechaNacimiento) {
            this.identidadConfirmada = true;
            return true;
         }
      }
      if (this.aleatorio == 1) {
         if( this.fechaIngresada == this.fechaExpiracion) {
            this.identidadConfirmada = true;
            return true;
         }
      }
      if (this.aleatorio == 2) {
         if( this.fechaIngresada == this.fechaExpedicion) {
            this.identidadConfirmada = true;
            return true;
         }
      }
      this.identidadConfirmada = false;
      this.cedulaNombre = '';
      return false;
   }
}
