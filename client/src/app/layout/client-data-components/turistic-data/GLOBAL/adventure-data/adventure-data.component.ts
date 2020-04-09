import { ToastrManager } from 'ng6-toastr-notifications';
import { ComplementaryServiceTypeService } from './../../../../../services/CRUD/ALOJAMIENTO/complementaryservicetype.service';
import { ComplementaryServiceType } from './../../../../../models/ALOJAMIENTO/ComplementaryServiceType';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adventure-data',
  templateUrl: './adventure-data.component.html',
  styleUrls: ['./adventure-data.component.scss']
})
export class AdventureDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  complementary_service_types_all: ComplementaryServiceType[] = [];
  complementary_service_types: ComplementaryServiceType[] = [];
  complementary_service_types_categories: ComplementaryServiceType[] = [];

  complementary_service_types_registerSelectedId = 0;

  constructor(private toastr: ToastrManager, private complementary_service_typeDataService: ComplementaryServiceTypeService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    
  }

  loadCatalogos() {
    this.getComplementaryServiceTypes();
  }

  getComplementaryServiceTypes() {
    this.complementary_service_types_all = [];
    this.complementary_service_typeDataService.get().then( r => {
      this.complementary_service_types_all = r as ComplementaryServiceType[];
      this.getComplementaryServiceTypeCategories();
    }).catch( e => console.log(e) );
  }

  getComplementaryServiceTypeCategories() {
    this.complementary_service_types_categories = [];
    this.complementary_service_types_all.forEach(element => {
      if (element.father_code == '-') {
        this.complementary_service_types_categories.push(element);
      }
    });
  }

  getComplementaryServiceType(categoryFilter: string) {
    this.complementary_service_types = [];
    this.complementary_service_types_all.forEach(element => {
      if (element.father_code == categoryFilter) {
        this.complementary_service_types.push(element);
      }
    });
  }

  selectComplementaryServiceType(complementary_service_type: ComplementaryServiceType) {
    this.complementary_service_types_registerSelectedId = complementary_service_type.id;
  }

  addComplementaryServiceType() {
    if (this.complementary_service_types_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione una Modalidad de Turismo de Aventura.', 'Error');
      return;
    }
    this.complementary_service_types.forEach(complementary_capacity => {
      if (complementary_capacity.id == this.complementary_service_types_registerSelectedId) {
         let existe = false;
         this.register.complementary_service_types_on_register.forEach(element => {
            if (element.id == complementary_capacity.id) {
               existe = true;
            }
         });
         if (!existe) {
            this.register.complementary_service_types_on_register.push(complementary_capacity);
            this.complementary_service_types_registerSelectedId = 0;
         } else {
            this.toastr.errorToastr('La Modalidad de Turismo de Aventura ya se encuentra en la lista.', 'Error');
         }
      }
    });
  }

  removeComplementaryServiceType() {
    if (this.complementary_service_types_registerSelectedId === 0) {
      this.toastr.errorToastr('Seleccione una Modalidad de Turismo de Aventura.', 'Error');
      return;
    }
    const newComplementaryCapacities: ComplementaryServiceType[] = [];
    let eliminado = false;
    this.register.complementary_service_types_on_register.forEach(complementary_capacity => {
      if (complementary_capacity.id !== this.complementary_service_types_registerSelectedId) {
         newComplementaryCapacities.push(complementary_capacity);
      } else {
         eliminado = true;
      }
    });
    if (!eliminado) {
      this.toastr.errorToastr('Modalidad de Turismo de Aventura no encontrada en la lista.', 'Error');
      return;
    }
    this.register.complementary_service_types_on_register = newComplementaryCapacities;
    this.complementary_service_types_registerSelectedId = 0;
  }
}
