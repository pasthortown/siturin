import { ApprovalState } from 'src/app/models/ALOJAMIENTO/ApprovalState';
import { ApprovalStateAttachment } from 'src/app/models/ALOJAMIENTO/ApprovalStateAttachment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coordinador-gestion-data',
  templateUrl: './coordinador-gestion-data.component.html',
  styleUrls: ['./coordinador-gestion-data.component.scss']
})
export class CoordinadorGestionDataComponent implements OnInit {
  @Input('user') user: User = new User();
  @Input('data_selected') data_selected_table = {row: null, 
    register: {register: null,
      activity_id: 0,
      activity: '',
      establishment: new Establishment(),
      ruc: new Ruc(),
      states: null,
      register_data_on_catastro: null
    }
  };

  @Input('attachments') attachments = {
    informeApprovalStateAttachment: new ApprovalStateAttachment(),
    requisitosApprovalStateAttachment: new ApprovalStateAttachment(),
    actaNotificacionApprovalStateAttachment: new ApprovalStateAttachment(),
    registroApprovalStateAttachment: new ApprovalStateAttachment(),
    tarifarioRackApprovalStateAttachment: new ApprovalStateAttachment(),
  };

  @Input('approval_states') approval_states = {
    coordinador: new ApprovalState(),
    inspector: new ApprovalState(),
    financiero: new ApprovalState()
  };

  stateTramite: number = 0;
  guardandoTramite = false;

  constructor() {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {
  }

  refresh() {
    console.log(this.approval_states);
    console.log(this.data_selected_table);
    console.log(this.attachments);
    console.log(this.user);
  }

  guardarTramite() {
    console.log('AQUI');
  }

  reload() {
    window.location.reload();
  }
}
