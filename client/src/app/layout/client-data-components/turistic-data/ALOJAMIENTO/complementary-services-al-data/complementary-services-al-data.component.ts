import { ToastrManager } from 'ng6-toastr-notifications';
import { ComplementaryServiceFood } from './../../../../../models/ALOJAMIENTO/ComplementaryServiceFood';
import { ComplementaryServiceFoodType } from 'src/app/models/ALOJAMIENTO/ComplementaryServiceFoodType';
import { ComplementaryServiceFoodTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicefoodtype.service';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-complementary-services-al-data',
  templateUrl: './complementary-services-al-data.component.html',
  styleUrls: ['./complementary-services-al-data.component.scss']
})
export class ComplementaryServicesALDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  complementaryServiceFoodTypes: ComplementaryServiceFoodType[] = [];
  complementaryServiceFoodSelected: ComplementaryServiceFood = new ComplementaryServiceFood();

  constructor(private toastr: ToastrManager, 
    private complementaryServiceFoodTypeDataService: ComplementaryServiceFoodTypeService) {
    
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
    this.getComplementaryFoodServiceTypes();
  }

  getComplementaryFoodServiceTypes() {
    this.complementaryServiceFoodTypeDataService.get().then( r => {
       this.complementaryServiceFoodTypes = r as ComplementaryServiceFoodType[];
    }).catch( e => { console.log(e); });
  }

  addComplementaryFoodService() {
    const complementaryFoodService = new ComplementaryServiceFood();
    let agregable = true;
    this.complementaryServiceFoodTypes.forEach(element1 => {
       let existe = false;
       this.register.complementary_service_foods_on_register.forEach(element2 => {
          if(element2.quantity_tables == 0) {
             agregable = false;
          }
           if(element1.id == element2.complementary_service_food_type_id) {
              existe = true;
           }
        });
        if (!existe) {
           complementaryFoodService.type_of_complementary_service_food.push(element1);
        }
    });
    if(this.register.complementary_service_foods_on_register.length == 0){
       agregable = true;
    }
    if (!agregable){
     this.toastr.errorToastr('Complete la información, para continuar.', 'Nuevo');
     return;
    }
    if(complementaryFoodService.type_of_complementary_service_food.length > 0) {
      this.register.complementary_service_foods_on_register.push(complementaryFoodService);
    }else {
     this.toastr.errorToastr('Usted ha declarado todos los tipos admitidos.', 'Nuevo');
    }
  }
 
  selectComplementaryFoodService(complementaryServiceFood: ComplementaryServiceFood) {
    this.complementaryServiceFoodSelected = complementaryServiceFood;
  }
 
  removeComplementaryFoodService(complementaryServiceFood: ComplementaryServiceFood) {
    const newList: ComplementaryServiceFood[] = [];
    this.register.complementary_service_foods_on_register.forEach(element => {
       if (element !== complementaryServiceFood) {
          newList.push(element);
       }
    });
    this.register.complementary_service_foods_on_register = newList;
  }
}
