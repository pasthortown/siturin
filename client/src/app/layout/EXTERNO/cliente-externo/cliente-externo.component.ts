import { Establishment } from './../../../models/BASE/Establishment';
import { Ruc } from './../../../models/BASE/Ruc';
import { Register } from './../../../models/ALOJAMIENTO/Register';
import { Register as RegisterCatastro} from './../../../models/CATASTRO/Register';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConsultorService } from './../../../services/negocio/consultor.service';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';


@Component({
  selector: 'app-cliente-externo',
  templateUrl: './cliente-externo.component.html',
  styleUrls: ['./cliente-externo.component.scss']
})

export class ClienteExternoComponent implements OnInit {
  @ViewChild('pasosSuperiores') pasosSuperioresTabSet;
  @ViewChild('pasos') pasosTabSet;
  
  // DATOS DEL USUARIO
  
  isEditable = true;

  activate_alojamiento = true;
  activate_alimentos_bebidas = true;
  activate_operacion_intermediacion = true;

  user: User = new User();
  registers_by_ruc: any[] = [];
  
  data_selected = {
    register: new RegisterCatastro(),
    is_new_register: true,
    ruc: new Ruc(),
    establishment: new Establishment(),
    establishment_validated: new Establishment(),
    register_selected: new Register() 
  }

  // VARIABLES PARA EL CONTROL DE LA INTERFAZ DE USUARIO
  
  opcion_seleccionada = 'registro';
  estado_registro = '';
  mostrarOpciones = false;
  mostrarTerminosCondiciones = false;
  terminosCondiciones = false;
  mostrarIngresoDatos = false;
  mostrarPasosInferiores = false;
  mostrarDeclarations = false;
  mostrarInformacionTuristica = false;
  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  
  constructor( private userDataService: UserService, 
    private catastroRegisterDataService: CatastroRegisterService,
    private consultorDataService: ConsultorService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      this.mostrarTerminosCondiciones = true;
      this.getRegistersByRuc();
    }).catch( e => console.log(e));
  }

  getRegistersByRuc() {
    this.consultorDataService.get_registers_by_ruc(this.user.ruc).then( r => {
      this.registers_by_ruc = r as any[];
    }).catch( e => { console.log(e); });
  }

  checkTerminosCondiciones(event) {
    this.terminosCondiciones = event;
  }

  changeSelectedOption(event) {
    this.mostrarIngresoDatos = true;
    this.opcion_seleccionada = event;
  }

  ruc_validated(event) {
    this.data_selected.ruc = event;
    this.mostrarPasosInferiores = false;
  }

  showTuristicInformation(event) {
    this.mostrarInformacionTuristica = event;
  }

  establishmentSelected(event) {
    const establishment_selected = event.establishment;
    if (this.data_selected.is_new_register) {
      establishment_selected.as_turistic_register_date = null;
    } else {
      this.catastroRegisterDataService.update_ruc_code_id(this.data_selected.register.id, establishment_selected.ruc_code_id, establishment_selected.sri_state).then( resp_cat => {
      }).catch(e => { console.log(e); });
      establishment_selected.as_turistic_register_date = new Date(this.data_selected.register.as_turistic_date);
    }
    this.data_selected.establishment = establishment_selected;
    this.mostrarPasosInferiores = event.showData;
  }

  establishment_validated(event) {
    if (event.showNext) {
      this.data_selected.establishment_validated = event.establishment;
      this.data_selected.register_selected.provincia_code = this.data_selected.establishment_validated.provincia_code;
    }
    this.mostrarDeclarations = event.showNext;
  }

  change_page_button_click(event) {
    if (event == 'Paso I') {
      this.pasosSuperioresTabSet.select('pasoI');
    }
    if (event == 'Paso II') {
      this.pasosSuperioresTabSet.select('pasoII');
    }
    if (event == 'Paso 1') {
      this.pasosTabSet.select('paso1');
    }
    if (event == 'Paso 2') {
      this.pasosTabSet.select('paso2');
    }
    if (event == 'Paso 3') {
      this.pasosTabSet.select('paso3');
    }
  }

  validateRegisterSelectedData(event) {
    this.data_selected = {
      register: new RegisterCatastro(),
      is_new_register: true,
      ruc: new Ruc(),
      establishment: new Establishment(),
      establishment_validated: new Establishment(),
      register_selected: new Register() 
    }
    this.mostrarIngresoDatos = false;
    this.mostrarOpciones = false;
    this.opcion_seleccionada = 'registro';
    this.mostrarPasosInferiores = false;
    if (!event.isNew) {
      if (event.register == null) {
        return;
      }
      this.data_selected.is_new_register = false;
      if (event.register.activity == 'ALOJAMIENTO') {
        this.data_selected.register_selected.activity_id = 1;
      }
      if (event.register.activity == 'ALIMENTOS Y BEBIDAS') {
        this.data_selected.register_selected.activity_id = 2;
      }
      if (event.register.activity == 'OPERACIÓN E INTERMEDIACIÓN') {
        this.data_selected.register_selected.activity_id = 3;
      }
      if(event.register.establishment_state.toUpperCase().trim() == "ACTIVO" || 
        event.register.establishment_state.toUpperCase().trim() == "ABIERTO" || 
        event.register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS ACIVOS") {
         this.estado_registro = 'ACTIVO';
      }
      if(event.register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS NO ACTIVOS" || 
        event.register.establishment_state.toUpperCase().trim() == "CERRADO") {
          this.estado_registro = 'CERRADO';
      }
      this.data_selected.register = event.register;
      this.data_selected.register_selected.code = this.data_selected.register.register_code;
      this.data_selected.register_selected.system_source = this.data_selected.register.system_source;
      this.data_selected.register_selected.classification_incomming = this.data_selected.register.classification;
      this.data_selected.register_selected.category_incomming = this.data_selected.register.category;
      this.data_selected.register_selected.state_on_catastro = this.data_selected.register.ruc_state;
      this.mostrarOpciones = true;
    } else {
      this.mostrarIngresoDatos = true;
    }
  }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}