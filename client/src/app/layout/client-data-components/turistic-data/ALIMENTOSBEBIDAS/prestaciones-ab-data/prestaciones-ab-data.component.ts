import { KitchenTypeService } from './../../../../../services/CRUD/ALIMENTOSBEBIDAS/kitchentype.service';
import { ServiceTypeService } from './../../../../../services/CRUD/ALIMENTOSBEBIDAS/servicetype.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RegisterType } from './../../../../../models/ALOJAMIENTO/RegisterType';
import { KitchenType } from './../../../../../models/ALIMENTOSBEBIDAS/KitchenType';
import { ServiceType } from './../../../../../models/ALIMENTOSBEBIDAS/ServiceType';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prestaciones-ab-data',
  templateUrl: './prestaciones-ab-data.component.html',
  styleUrls: ['./prestaciones-ab-data.component.scss']
})
export class PrestacionesABDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('classification_selected_code') classification_selected_code: string = '';
  @Input('register_types') register_types: RegisterType[] = [];
  
  service_types: ServiceType[] = [];
  kitchen_types: KitchenType[] = [];
  
  kitchen_type_registerSelectedId = 0;
  service_type_registerSelectedId = 0;

  constructor(private toastr: ToastrManager,
    private serviceTypeDataService: ServiceTypeService,
    private kitchenTypeDataService: KitchenTypeService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.loadCatalogos();
  }

  loadCatalogos() {
    this.getKitchenTypes();
    this.getServiceTypes();
  }

  getServiceTypes() {
    this.service_types = [];
    let filter = 0;
    this.register_types.forEach(classification => {
      if (classification.code == this.classification_selected_code) {
        filter = classification.id;
      }
    });
    this.serviceTypeDataService.getFiltered(filter).then( r => {
       this.service_types = r as ServiceType[];
    }).catch( e => console.log(e) );
  }
   
  getKitchenTypes() {
    this.kitchen_types = [];
    let filter = 0;
    this.register_types.forEach(classification => {
      if (classification.code == this.classification_selected_code) {
        filter = classification.id;
      }
    });
    this.kitchenTypeDataService.getFiltered(filter).then( r => {
       this.kitchen_types = r as KitchenType[];
    }).catch( e => console.log(e) );
  }

  removeKitchenType() {
    if (this.kitchen_type_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un Tipo de Cocina.', 'Error');
      return;
    }
    const newKitchenTypes: any[] = [];
    let eliminado = false;
    this.register.kitchen_types_on_register.forEach(kitchenType => {
      if (kitchenType.id !== this.kitchen_type_registerSelectedId) {
          newKitchenTypes.push(kitchenType);
      } else {
         eliminado = true;
      }
    });
    if (!eliminado) {
      this.toastr.errorToastr('Tipo de Cocina no encontrado en la lista.', 'Error');
      return;
    }
    this.register.kitchen_types_on_register = newKitchenTypes;
    this.kitchen_type_registerSelectedId = 0;
  }

  removeServiceType() {
    if (this.service_type_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un Tipo de Servicio.', 'Error');
      return;
    }
    const newServiceTypes: any[] = [];
    let eliminado = false;
    this.register.service_types_on_register.forEach(service_type => {
      if (service_type.id !== this.service_type_registerSelectedId) {
       newServiceTypes.push(service_type);
      } else {
         eliminado = true;
      }
    });
    if (!eliminado) {
      this.toastr.errorToastr('Tipo de Servicio no encontrado en la lista.', 'Error');
      return;
    }
    this.register.service_types_on_register = newServiceTypes;
    this.service_type_registerSelectedId = 0;
  }
 
 
  addServiceType() {
    if (this.service_type_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un Tipo de Servicio.', 'Error');
      return;
    }
    this.service_types.forEach(service_type => {
      if (service_type.id == this.service_type_registerSelectedId) {
         let existe = false;
         this.register.service_types_on_register.forEach(element => {
            if (element.id == service_type.id) {
               existe = true;
            }
         });
         if (!existe) {
            this.register.service_types_on_register.push(service_type);
            this.service_type_registerSelectedId = 0;
         } else {
            this.toastr.errorToastr('El Tipo de Servicio ya existe en la lista.', 'Error');
         }
      }
    });
  }
 
  addKitchenType() {
    if (this.kitchen_type_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un Tipo de Cocina.', 'Error');
      return;
    }
    this.kitchen_types.forEach(kitchenType => {
      if (kitchenType.id == this.kitchen_type_registerSelectedId) {
         let existe = false;
         this.register.kitchen_types_on_register.forEach(element => {
            if (element.id == kitchenType.id) {
               existe = true;
            }
         });
         if (!existe) {
            this.register.kitchen_types_on_register.push(kitchenType);
            this.kitchen_type_registerSelectedId = 0;
         } else {
            this.toastr.errorToastr('El Tipo de Cocina ya existe en la lista.', 'Error');
         }
      }
    });
  } 

  selectServiceType(serviceType: ServiceType) {
    this.service_type_registerSelectedId = serviceType.id;
  }

  selectKitchenType(kitchenType: KitchenType) {
    this.kitchen_type_registerSelectedId = kitchenType.id;
  }
}
