import { UserService } from 'src/app/services/profile/user.service';
import { User } from 'src/app/models/profile/User';
import { Agreement } from './../../../models/BASE/Agreement';
import { AgreementService } from 'src/app/services/CRUD/BASE/agreement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreement-data',
  templateUrl: './agreement-data.component.html',
  styleUrls: ['./agreement-data.component.scss']
})
export class AgreementDataComponent implements OnInit {
  terminosCondicionesAgreement: Agreement = new Agreement();
  terminosCondiciones = false;
  user: User = new User();

  constructor(private agreementDataService: AgreementService,
    private userDataService: UserService) {
    
  }

  ngOnInit() {
    this.getUser(); 
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
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
}