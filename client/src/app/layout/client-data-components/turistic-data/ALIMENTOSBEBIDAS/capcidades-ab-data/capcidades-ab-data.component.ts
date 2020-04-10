import { FoodDrinkAttachmentService } from './../../../../../services/CRUD/ALIMENTOSBEBIDAS/fooddrinkattachment.service';
import { FoodDrinkAttachment } from './../../../../../models/ALIMENTOSBEBIDAS/FoodDrinkAttachment';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';
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
  
  listaPrecios: FoodDrinkAttachment = new FoodDrinkAttachment();
  listasPrecios: FoodDrinkAttachment[] = [];
  
  currentYear = 0;
  selected_year_id = 2019;
  years: any[] = [];

  constructor(private foodDrinkAttachmentDataService: FoodDrinkAttachmentService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    const today = new Date();
    this.currentYear = today.getFullYear();
  }

  loadCatalogos() {

  }

  getListaPrecios() {
    this.foodDrinkAttachmentDataService.get_by_register_id(this.register.id).then( r => {
       this.listasPrecios = r as FoodDrinkAttachment[];
       if (this.listasPrecios.length > 0) {
          this.listaPrecios = r[0];
          //POR AÑO
       } else {
          this.listaPrecios = new FoodDrinkAttachment();
       }
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
      };
    }
  }
}
