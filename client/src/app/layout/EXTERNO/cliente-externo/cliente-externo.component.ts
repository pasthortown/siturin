import { Establishment } from './../../../models/BASE/Establishment';
import { Ruc } from './../../../models/BASE/Ruc';
import { Register } from './../../../models/ALOJAMIENTO/Register';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  user: User = new User();

  data_selected = {
    register: new Register(),
    ruc: new Ruc(),
    establishment: new Establishment(),
  }

  // VARIABLES PARA EL CONTROL DE LA INTERFAZ DE USUARIO
  
  actividadSelected = '-';
  estado_registro = '';
  mostrarOpciones = false;
  opcion_seleccionada = '';
  mostrarTerminosCondiciones = false;
  terminosCondiciones = false;
  mostrarIngresoDatos = false;
  mostrarPasosInferiores = false;
  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  
  constructor( private userDataService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      this.mostrarTerminosCondiciones = true;
    }).catch( e => console.log(e));
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
  }

  establishmentSelected(event) {
    //this.establishment_selected.as_turistic_register_date = new Date(this.register_as_turistic_Date.toString());
    this.data_selected.establishment = event;
    this.mostrarPasosInferiores = true;
  }

  next_page_button_click(event) {
    if (event == 'Paso II') {
      this.pasosSuperioresTabSet.select('pasoII');
    }
  }

  validateRegisterSelectedData(event) {
    this.mostrarIngresoDatos = false;
    this.mostrarOpciones = false;
    if (!event.isNew) {
      if (event.register == null) {
        return;
      }
      if (event.register.activity == 'ALOJAMIENTO') {
        this.actividadSelected = '1';
      }
      if (event.register.activity == 'ALIMENTOS Y BEBIDAS') {
        this.actividadSelected = '2';
      }
      if (event.register.activity == 'OPERACIÓN E INTERMEDIACIÓN') {
        this.actividadSelected = '3';
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
      this.mostrarOpciones = true;
    } else {
      this.data_selected.register = new Register();
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