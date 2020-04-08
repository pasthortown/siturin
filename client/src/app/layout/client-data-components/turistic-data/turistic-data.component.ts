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
    const registros_establecimientos_validos = []; //REGISTROS QUE TIENE EL ESTABLECIMIENTO O ACTIVOS O EN SOLICITUD
    const registros_establecimiento = []; // TODOS LOS REGISTROS
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
      }  
    });
    registros_establecimiento.forEach(e1 => {
      let encontrado_por_tipo = false;
      registros_establecimientos_validos.forEach(e2 => {
        if (e1.register.register_type_id == e2.register.register_type_id) {
          const fecha_e1 = new Date(e1.register.created_at.toString());
          const fecha_e2 = new Date(e2.register.created_at.toString());
          encontrado_por_tipo = true;
          if (fecha_e1 > fecha_e2) {
            e2 = e1;
          }
        }
      });
      if (!encontrado_por_tipo) {
        registros_establecimientos_validos.push(e1);
      }
    });
    this.establishment_registers = registros_establecimientos_validos;
    console.log(this.establishment_registers);
  }

  register_selected(event) {
    console.log(event);
  }
}
