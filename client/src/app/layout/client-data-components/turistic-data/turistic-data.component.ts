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
  
  @Input('activate_alojamiento') activate_alojamiento: boolean = true;
  @Input('activate_alimentos_bebidas') activate_alimentos_bebidas: boolean = true;
  @Input('activate_operacion_intermediacion') activate_operacion_intermediacion: boolean = true;

  establishment_registers = [];
  
  activity_id_from_registers_actives = 0;

  constructor() {
    
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
  
  /* 
    searchForRegister(register_types_array: RegisterType[], activity_id: number) {
      let register_found = null;
      this.registers_on_establishment.forEach(element => {
        if (element.activity_id == activity_id) {
          if (this.classificationSelectedCode == this.getClassificationFromRegisterType(register_types_array, element.register.register_type_id)) {
            register_found = element;
          }
        }
      });
      if (register_found != null) {
        this.register = register_found.register;
        this.register.activity_id = activity_id;
      }
      this.register.classification_selected_code = this.classificationSelectedCode;
      this.register.region_selected_code = this.regionSelectedCode;
      this.register_selected.emit(this.register);
    }
  */
}
