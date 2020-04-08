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
  }

  filter_registers_by_ruc() {
    const registros_establecimiento = []; // TODOS LOS REGISTROS
    const register_types_aviable = [];
    this.establishment_registers = [];
    this.registers_by_ruc = [
      {establishment: {id:1}, register: {
        created_at: '2019-01-10',
        register_type_id: 1
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-02-10',
        register_type_id: 1
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-03-10',
        register_type_id: 1
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-01-10',
        register_type_id: 3
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-09-10',
        register_type_id: 3
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-03-10',
        register_type_id: 3
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-08-10',
        register_type_id: 2
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-05-10',
        register_type_id: 2
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-06-10',
        register_type_id: 2
      }},
      {establishment: {id:1}, register: {
        created_at: '2019-07-10',
        register_type_id: 2
      }},
    ];
    this.registers_by_ruc.forEach(element => {
      if (element.establishment.id == 1) {
        registros_establecimiento.push(element);
        let existe = false;
        register_types_aviable.forEach(reg_type => {
          if (reg_type == element.register.register_type_id) {
            existe = false;
          }
        });
        if (!existe) {
          register_types_aviable.push(element.register.register_type_id);
        }
      }  
    });
    register_types_aviable.forEach(reg_type => {
      let last_register_by_type = null;
      registros_establecimiento.forEach(element => {
        if (element.register.register_type_id == reg_type) {
          if (last_register_by_type == null) {
            last_register_by_type = element;
          } else {
            const fecha_e1 = new Date(last_register_by_type.register.created_at.toString());
            const fecha_e2 = new Date(element.register.created_at.toString());
            if (fecha_e2.getTime() > fecha_e1.getTime()) {
              last_register_by_type = element;
            }
          }
        }
      });
      this.establishment_registers.push(last_register_by_type);
    });
    console.log(this.establishment_registers);
  }

  register_selected(event) {
    console.log(event);
  }
}
