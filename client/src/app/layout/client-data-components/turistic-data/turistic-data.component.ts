import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { RegisterType } from './../../../models/ALIMENTOSBEBIDAS/RegisterType';
import { Register } from './../../../models/ALOJAMIENTO/Register';
import { Establishment } from './../../../models/BASE/Establishment';
import { Ruc } from './../../../models/DINARDAP/Ruc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turistic-data',
  templateUrl: './turistic-data.component.html',
  styleUrls: ['./turistic-data.component.scss']
})
export class TuristicDataComponent implements OnInit {
  @Input('ruc') ruc: Ruc = new Ruc();
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('register') register: Register = new Register();
  @Input('opcion_seleccionada') opcion_seleccionada: String = '';
  @Input('editable') editable: boolean = true;
  @Input('registers_by_ruc') registers_by_ruc: any[] = [];
  @Input('is_new_register') is_new_register: boolean = true;
  

  register_validated: Register = new Register();
  modules_activation: any = {
    activate_alojamiento: true,
    activate_alimentos_bebidas: true,
    activate_operacion_intermediacion: true
  };

  establishment_registers = [];
  
  activity_id_from_registers_actives = 0;

  register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  register_types: any[] = [];

  constructor(private consultorDataService: ConsultorService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.filter_registers_by_ruc();
    this.validateInitialData();
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

  filter_registers_by_ruc() {
    const registros_establecimiento = [];
    const register_codes_aviable = [];
    this.establishment_registers = [];
    this.registers_by_ruc.forEach(element => {
      if (element.establishment.id == this.establishment.id) {
        registros_establecimiento.push(element);
        let existe = false;
        register_codes_aviable.forEach(reg_code => {
          if (reg_code == element.register.code) {
            existe = false;
          }
        });
        if (!existe) {
          register_codes_aviable.push(element.register.code);
        }
      }  
    });
    register_codes_aviable.forEach(reg_code => {
      let last_register_by_code = null;
      registros_establecimiento.forEach(element => {
        if (element.register.code == reg_code) {
          if (last_register_by_code == null) {
            last_register_by_code = element;
          } else {
            const fecha_e1 = new Date(last_register_by_code.register.created_at.toString());
            const fecha_e2 = new Date(element.register.created_at.toString());
            if (fecha_e2.getTime() > fecha_e1.getTime()) {
              last_register_by_code = element;
            }
          }
        }
      });
      let existe = false;
      this.establishment_registers.forEach(element => {
        if (element == last_register_by_code) {
          existe = true;
        }
      });
      if (!existe) {
        this.establishment_registers.push(last_register_by_code);
      }
    });
  }

  classification_category_selected(event) {
    console.log(event);
    console.log(this.establishment_registers);
    let sourceArray = [];
    if (this.register.activity_id == 1) {
      sourceArray = this.register_types_block.register_types_alojamiento;
    }
    if (this.register.activity_id == 2) {
      sourceArray = this.register_types_block.register_types_alimentos_bebidas;
    }
    if (this.register.activity_id == 3) {
      sourceArray = this.register_types_block.register_types_operacion_intermediacion;
    }
    this.searchForRegister(sourceArray, this.register.activity_id, this.register.classification_selected_code, this.register.region_selected_code);
    console.log(this.register_validated);
  }

  hasActiveRegisters(): boolean {
    let toReturn = false;
    this.establishment_registers.forEach(element => {
      if (element.register.register_type_id < 1000) {
        toReturn = true;
        this.activity_id_from_registers_actives = element.activity_id;
      }
    });
    return toReturn;
  }

  validateInitialData() {
    const hasActives = this.hasActiveRegisters();
    if (!this.is_new_register) {
      if (this.register.state_on_catastro == 'CERRADO') {
          if (!hasActives) {
            this.register.activity_id = 0;
          } else {
            this.register.activity_id = this.activity_id_from_registers_actives;
          }
      } else {
        if (!(this.register.system_source == 'SIETE' || this.register.system_source == 'SITURIN')) {
          this.register.register_type_id = 0;
        }
      }
    } else {
      if (!hasActives) {
        this.register.activity_id = 0;
      } else {
        this.register.activity_id = this.activity_id_from_registers_actives;
      }
    }
  }
  
  searchForRegister(register_types_array: RegisterType[], activity_id: number, classificationSelectedCode: String, regionSelectedCode: String) {
    let register_found = null;
    this.establishment_registers.forEach(element => {
      if (element.activity_id == activity_id) {
        if (classificationSelectedCode == this.getClassificationFromRegisterType(register_types_array, element.register.register_type_id)) {
          register_found = element;
        }
      }
    });
    if (register_found != null) {
      this.register_validated = register_found.register;
      this.register_validated.activity_id = activity_id;
    }
    this.register_validated.classification_selected_code = classificationSelectedCode;
    this.register_validated.region_selected_code = regionSelectedCode;
  }

  getClassificationFromRegisterType(register_types_array: RegisterType[] , register_type_id: number): String {
    let classification_code: String = '';
    register_types_array.forEach(element => {
      if (element.id == register_type_id) {
        classification_code = element.father_code;
      }
    });
    return classification_code;
  }
}
