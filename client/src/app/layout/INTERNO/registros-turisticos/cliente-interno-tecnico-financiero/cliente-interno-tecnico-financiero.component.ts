import { ConsultorService } from './../../../../services/negocio/consultor.service';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/models/ALOJAMIENTO/State';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';

@Component({
  selector: 'app-cliente-interno-tecnico-financiero',
  templateUrl: './cliente-interno-tecnico-financiero.component.html',
  styleUrls: ['./cliente-interno-tecnico-financiero.component.scss']
})
export class ClienteInternoTecnicoFinancieroComponent implements OnInit {
  
  states = { alojamiento: [],
    alimentos_bebidas: [],
    operacion_intermediacion: [],
  };

  register_types: any[] = [];
  register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };
  
  constructor(private consultorDataService: ConsultorService,
    private state_alojamiento_DataService: StateALService,
    private state_alimentos_bebidas_DataService: StateABService,
    private state_operacion_intermediacion_DataService: StateOPService) {}

  ngOnInit() {
    this.getStates();
    this.getRegisterTypes();
  }

  getRegisterTypes() {
    this.register_types = [];
    const register_types_alojamiento = [];
    const register_types_alimentos_bebidas = [];
    const register_types_operacion_intermediacion = [];
    this.consultorDataService.get_all_register_types().then( r => {
      // Cada item en la respuesta tiene la forma {register_type: new RegisterType(), activity_id: 1 2 o 3} 
      this.register_types = r as any[];
      this.register_types.forEach(element => {
        if (element.activity_id == 1) {
          register_types_alojamiento.push(element.register_type);
        }
        if (element.activity_id == 2) {
          register_types_alimentos_bebidas.push(element.register_type);
        }
        if (element.activity_id == 3) {
          register_types_operacion_intermediacion.push(element.register_type);
        }
      });
      this.register_types_block.register_types_alojamiento = register_types_alojamiento;
      this.register_types_block.register_types_alimentos_bebidas = register_types_alimentos_bebidas;
      this.register_types_block.register_types_operacion_intermediacion = register_types_operacion_intermediacion;
    }).catch( e => { console.log(e); });
  }
  
  getStates() {
    this.states = { alojamiento: [],
      alimentos_bebidas: [],
      operacion_intermediacion: [],
    };
    this.state_alojamiento_DataService.get().then( r => {
      this.states.alojamiento = r as State[];
    }).catch( e => { console.log(e); });
    this.state_alimentos_bebidas_DataService.get().then( r => {
      this.states.alimentos_bebidas = r as State[];
    }).catch( e => { console.log(e); });
    this.state_operacion_intermediacion_DataService.get().then( r => {
      this.states.operacion_intermediacion = r as State[];
    }).catch( e => { console.log(e); });
  }
}
