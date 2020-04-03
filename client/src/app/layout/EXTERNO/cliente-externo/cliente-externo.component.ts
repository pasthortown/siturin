import { AgreementService } from './../../../services/CRUD/BASE/agreement.service';
import { AccountRol } from './../../../models/AUTH/AccountRol';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Agreement } from './../../../models/BASE/Agreement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-externo',
  templateUrl: './cliente-externo.component.html',
  styleUrls: ['./cliente-externo.component.scss']
})

export class ClienteExternoComponent implements OnInit {

  // DATOS DEL USUARIO
  
  roles: AccountRol[] = [];
  user: User = new User();

  // VARIABLES TERMINOS Y CONDICIONES

  terminosCondicionesAgreement: Agreement = new Agreement();
  terminosCondiciones = false;
   
  constructor( private userDataService: UserService,
               private agreementDataService: AgreementService,            
    ) {}

  ngOnInit() {
    this.refresh();
    this.getUser();
    //this.getTramiteStates();
  }

  refresh() {

  }

  // FUNCIONES PARA TERMINOS Y CONDICIONES

  getUser() {
    this.roles = JSON.parse(sessionStorage.getItem('roles')) as AccountRol[];
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      // Es importante tener el usuario para llenar los datos del usuario en el acuerdod e términos y condiciones.
      // Por eso, después de tener el usuario, se carga los términos y condiciones.
      this.getTerminosCondicionesAgreement();
    }).catch( e => console.log(e));
  }

  getTerminosCondicionesAgreement() {
    this.agreementDataService.get(1).then( r => {
       this.terminosCondicionesAgreement = r.Agreement as Agreement;
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##USER##', '<strong>' + this.user.name.toUpperCase() + '</strong>');
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##RUC##', '<strong>' + this.user.ruc + '</strong>');
    }).catch( e => { console.log(e); });
  }

  checkAgreement() {
    if (this.terminosCondiciones) {
       //this.getCategories();
    }
  }

}
