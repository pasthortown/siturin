import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodDrinkAttachment } from './../../../../../models/ALIMENTOSBEBIDAS/FoodDrinkAttachment';
import { Capacity } from './../../../../../models/ALIMENTOSBEBIDAS/Capacity';
import { FoodDrinkAttachmentService } from './../../../../../services/CRUD/ALIMENTOSBEBIDAS/fooddrinkattachment.service';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { RegisterType } from './../../../../../models/ALOJAMIENTO/RegisterType';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-capcidades-ab-data',
  templateUrl: './capcidades-ab-data.component.html',
  styleUrls: ['./capcidades-ab-data.component.scss']
})
export class CapcidadesABDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('classification_selected_code') classification_selected_code: string = '';
  @Input('register_types') register_types: RegisterType[] = [];
  @Input('is_new_register') is_new_register: boolean = true;

  @Output('lista_precios') lista_precios: EventEmitter<any> = new EventEmitter<any>();

  listaPrecios: FoodDrinkAttachment = new FoodDrinkAttachment();
  listasPrecios: FoodDrinkAttachment[] = [];
  
  currentYear = 0;
  selected_year = 2019;
  years = [];

  years_error = [];

  constructor(private foodDrinkAttachmentDataService: FoodDrinkAttachmentService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.getYears();
  }

  getYears() {
    this.years = [];
    if (this.register.capacities_on_register.length == 0) {
      const newCapacity = new Capacity();
      newCapacity.year = this.currentYear;
      this.register.capacities_on_register.push(newCapacity);
    }
    this.register.capacities_on_register.forEach( capacity => {
      let existe = false;
      this.years.forEach(year => {
        if (year.value == capacity.year) {
          existe = true;
        }
      });
      if (!existe) {
        this.years.push({value: capacity.year});
      }
    });
    this.years.sort(function(a, b) {
      const a_value = a.value;
      const b_value = b.value;
      return a_value > b_value ? 1 : a_value < b_value ? -1 : 0;
    });
    if (this.is_new_register) {
      this.selected_year = this.currentYear;
    } else {
      this.selected_year = this.getLastYearDeclared();
    }
    this.getListasPrecios();
  }

  getListasPrecios() {
    this.foodDrinkAttachmentDataService.get_by_register_id(this.register.id).then( r => {
      this.listasPrecios = r as FoodDrinkAttachment[];
      this.years.forEach(year => {
        let lista_precios_encontrada = false;
        this.listasPrecios.forEach(lista_precios => {
          if (lista_precios.year == year.value) {
            lista_precios_encontrada = true;
          }
        });
        if (!lista_precios_encontrada) {
          const newListaPrecios = new FoodDrinkAttachment();
          newListaPrecios.date = new Date();
          newListaPrecios.year = year.value;
          this.listasPrecios.push(newListaPrecios);
        }
        this.listasPrecios.forEach(lista_precios => {
          if (lista_precios.year == this.selected_year) {
            this.listaPrecios = lista_precios;
          }
        });
      });
    }).catch( e => { console.log(e); });
  }
 
  downloadListaPrecios() {
    this.downloadFile(
       this.listaPrecios.food_drink_attachment_file,
       this.listaPrecios.food_drink_attachment_file_type,
       this.listaPrecios.food_drink_attachment_file_name);
  }
 
  borrarListaPrecios() {
    this.listaPrecios = new FoodDrinkAttachment();
  }

  downloadFile(file: any, type: any, name: any) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type });
    saveAs(blob, name);
  }

  CodificarArchivoListaPrecios(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.listaPrecios.food_drink_attachment_file = reader.result.toString().split(',')[1];
        this.listaPrecios.food_drink_attachment_file_type = file.type;
        this.listaPrecios.food_drink_attachment_file_name = file.name;
        this.listaPrecios.type = 'Lista Precios';
        this.listaPrecios.date = new Date();
        this.lista_precios.emit(this.listasPrecios);
      };
    }
  }

  selectCapacityByYear() {
    this.listasPrecios.forEach(element => {
      if (element.year == this.selected_year) {
         this.listaPrecios = element;
      }
    });
  }

  getLastYearDeclared(): number {
    let lastYearDeclared = 2019;
    this.register.capacities_on_register.forEach( capacity => {
      if (capacity.year > lastYearDeclared){
        lastYearDeclared = capacity.year;
      }
    });
    return lastYearDeclared;
  }

  validateListaPrecios(): boolean {
    let toReturn = true;
    this.years_error = [];
    this.listasPrecios.forEach(lista_precios => {
      if (lista_precios.food_drink_attachment_file == '') {
        this.years_error.push(lista_precios.year);
        toReturn = false;
      }
    });
    return toReturn;
  }
}
