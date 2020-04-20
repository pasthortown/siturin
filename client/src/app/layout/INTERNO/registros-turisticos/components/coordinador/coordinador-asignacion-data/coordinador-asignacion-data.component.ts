import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';

import { Establishment } from 'src/app/models/BASE/Establishment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coordinador-asignacion-data',
  templateUrl: './coordinador-asignacion-data.component.html',
  styleUrls: ['./coordinador-asignacion-data.component.scss']
})
export class CoordinadorAsignacionDataComponent implements OnInit {
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

  @Input('tecnicos_financieros') tecnicosFinancieros = [];
  @Input('tecnicos_zonales') tecnicosZonales = [];

  mostrarMotivoTramite = false;
  tipo_tramite = 'pendiente';
  digito = '';
  stateTramiteId = 0;
  as_turistic_date = new Date();

  constructor(
    private register_procedure_alojamiento_DataService: RegisterProcedureALService,
    private register_procedure_alimentos_bebidas_DataService: RegisterProcedureABService,
    private register_procedure_operacion_intermediacion_DataService: RegisterProcedureOPService) {
    
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
    this.mostrarMotivoTramite = false;
    this.tipo_tramite = 'pendiente';
    this.as_turistic_date = new Date();
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    const estado = this.stateTramiteId.toString();
    this.digito = estado.substring(estado.length-1, estado.length);
    this.checkMotivoTramite(estado);
    console.log(this.tecnicosFinancieros);
    console.log(this.tecnicosZonales);
    console.log(this.data_selected_table);
  }

  checkMotivoTramite(estado: String) {
    const PrimerDigito = estado.substring(0, 1);
    if (PrimerDigito == '1') {
      this.mostrarMotivoTramite = false;
    } else {
      this.mostrarMotivoTramite = true;
    }
    this.tipo_tramite = 'REGISTRO';
    if (PrimerDigito == '1') {
      this.tipo_tramite = 'REGISTRO';
    }
    if (PrimerDigito == '2') {
      this.tipo_tramite = 'RECLASIFICACIÓN';
    }
    if (PrimerDigito == '3') {
      this.tipo_tramite = 'RECATEGORIZACIÓN';
    }
    if (PrimerDigito == '4') {
      this.tipo_tramite = 'ACTUALIZACIÓN';
    }
    if (PrimerDigito == '5') {
      this.tipo_tramite = 'INACTIVACIÓN';
    }
    if (PrimerDigito == '6') {
      this.tipo_tramite = 'REINGRESO';
    }
    if (estado == '20') {
      this.tipo_tramite = 'REGISTRO';
    }
    if (estado == '30') {
      this.tipo_tramite = 'RECLASIFICACIÓN';
    }
    if (estado == '40') {
      this.tipo_tramite = 'RECATEGORIZACIÓN';
    }
    if (estado == '50') {
      this.tipo_tramite = 'ACTUALIZACIÓN';
    }
    if (estado == '60') {
      this.tipo_tramite = 'INACTIVACIÓN';
    }
    if (estado == '70') {
      this.tipo_tramite = 'REINGRESO';
    }
    this.as_turistic_date = new Date();
    if (this.data_selected_table.register.establishment.as_turistic_register_date != null && typeof this.data_selected_table.register.establishment.as_turistic_register_date != 'undefined') {
      this.as_turistic_date = new Date(this.data_selected_table.register.establishment.as_turistic_register_date.toString());
    }
  }
}
