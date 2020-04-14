import { User } from 'src/app/models/profile/User';
import { Agreement } from 'src/app/models/BASE/Agreement';
import { AgreementService } from 'src/app/services/CRUD/BASE/agreement.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agreement-data',
  templateUrl: './agreement-data.component.html',
  styleUrls: ['./agreement-data.component.scss']
})
export class AgreementDataComponent implements OnInit {
  terminosCondicionesAgreement: Agreement = new Agreement();
  terminosCondiciones = false;

  @Input('user') user: User = new User();
  @Output('checkAgreement') change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private agreementDataService: AgreementService) {
    
  }

  ngOnInit() {
    this.getTerminosCondicionesAgreement(); 
  }

  getTerminosCondicionesAgreement() {
    this.agreementDataService.get(1).then( r => {
       this.terminosCondicionesAgreement = r.Agreement as Agreement;
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##USER##', '<strong>' + this.user.name.toUpperCase() + '</strong>');
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##RUC##', '<strong>' + this.user.ruc + '</strong>');
    }).catch( e => { console.log(e); });
  }

  checkTerminosCondiciones() {
    this.change.emit(this.terminosCondiciones);
  }
}