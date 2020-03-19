import { RequisiteService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
import { RequisiteService as RequisiteABService} from './../../../services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { RegisterTypeService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { RegisterTypeService as RegisterTypeABService } from './../../../services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.scss']
})
export class NormativaComponent implements OnInit {
  regiones = [];
  allRegisterTypes_alojamiento = [];
  allRegisterTypes_alimentos_bebidas = [];
  clasifications_registers = [];
  categories_registers = [];
  actividadSelected = '-';
  regionSelectedCode = '-';
  categorySelectedCode = '-';
  register_type_id = 0;
  activateAlojamiento = true;
  activateAlimentosBebidas = true;
  activateOperationIntermediation = true;
  mostrarRequisitos = false;

  constructor( private registerTypeDataService: RegisterTypeService,
    private registerTypeABDataService: RegisterTypeABService,
    private requisiteDataService: RequisiteService,
    private requisiteABDataService: RequisiteABService) {}

  ngOnInit() {
    this.getAllRegisterTypes();
  }

  getRegiones() {
    this.regiones = [];
    this.allRegisterTypes_alojamiento.forEach(element => {
      if (element.father_code == '-') {
        this.regiones.push(element);
      }
    });
    this.sortArray(this.regiones);
  }

  getAllRegisterTypes() {
    this.registerTypeDataService.get().then( r => {
      this.allRegisterTypes_alojamiento = r as any[];
      this.getRegiones();
    }).catch( e => { console.log(e); });
    this.registerTypeABDataService.get().then( r => {
      this.allRegisterTypes_alimentos_bebidas = r as any[];
    }).catch( e => { console.log(e); });
  }

  getClasifications() {
    this.clasifications_registers = [];
    this.categories_registers = [];
    this.mostrarRequisitos = false;
    this.categorySelectedCode = '-';
    this.register_type_id = 0;
    if (this.actividadSelected == '1') {
      this.allRegisterTypes_alojamiento.forEach(element => {
        if (element.father_code == this.actividadSelected) {
          if (element.id < 1000) {
            this.clasifications_registers.push(element);
          }
        }
      });
    }
    if (this.actividadSelected == '2') {
      this.allRegisterTypes_alimentos_bebidas.forEach(element => {
        if (element.father_code == this.actividadSelected) {
          if (element.id < 1000) {
            this.clasifications_registers.push(element);
          }
        }
      });
    }
    this.sortArray(this.clasifications_registers);
  }

  getCategories() { 
    this.categories_registers = [];
    this.mostrarRequisitos = false;
    this.register_type_id = 0;
    if (this.actividadSelected == '1') {
      this.allRegisterTypes_alojamiento.forEach(element => {
        if (element.father_code == this.categorySelectedCode) {
          if (element.id < 1000) {
            this.categories_registers.push(element);
          }
        }
      });
    }
    if (this.actividadSelected == '2') {
      this.allRegisterTypes_alimentos_bebidas.forEach(element => {
        if (element.father_code == this.categorySelectedCode) {
          if (element.id < 1000) {
            this.categories_registers.push(element);
          }
        }
      });
    }
    this.sortArray(this.categories_registers);
  }

  sortArray(array: any[]) {
    array.sort( (e1, e2) => {
      if (e1.id > e2.id) {
        return 1;
      }
      if (e1.id < e2.id) {
        return -1;
      }
      return 0;
    });
  }

  getRequisites() {
    this.mostrarRequisitos = true;
  }
}