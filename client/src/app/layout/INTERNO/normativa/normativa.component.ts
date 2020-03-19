import { RegisterRequisite } from './../../../models/ALOJAMIENTO/RegisterRequisite';
import { RegisterRequisite as RegisterABRequisite } from './../../../models/ALIMENTOSBEBIDAS/RegisterRequisite';
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
  requisites = [];
  actividadSelected = '-';
  regionSelectedCode = '-';
  categorySelectedCode = '-';
  register_type_id = 0;
  activateAlojamiento = true;
  activateAlimentosBebidas = true;
  activateOperationIntermediation = true;
  mostrarRequisitos = false;

  totalAbPointsSelected = 0;
  totalAviable = 0;
  totalABPuntosShown = 0;
  categoryAB = 0;

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
      this.getRequisites();
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

  calcTotalPoints() {

  }
  
  getRequisites() {
    this.requisites = [];
    if (this.actividadSelected == '1') {
      this.requisiteDataService.get_filtered(this.register_type_id).then( r=> {
        const requisitesByRegisterType = r as any[];
        requisitesByRegisterType.forEach(element => {
           const newRegisterRequisite = new RegisterRequisite();
           newRegisterRequisite.requisite_name = element.name;
           newRegisterRequisite.requisite_id = element.id;
           newRegisterRequisite.fullfill = true;
           newRegisterRequisite.requisite_code = element.code;
           newRegisterRequisite.mandatory = element.mandatory;
           newRegisterRequisite.requisite_father_code = element.father_code;
           newRegisterRequisite.level = element.code.split('.').length;
           newRegisterRequisite.HTMLtype = element.type;
           newRegisterRequisite.id = element.id;
           newRegisterRequisite.fullfill = false;
           if (newRegisterRequisite.HTMLtype == 'YES / NO') {
              newRegisterRequisite.value = '0';
           }
           if (newRegisterRequisite.HTMLtype == 'NUMBER') {
              newRegisterRequisite.value = '0';
           }
           if (newRegisterRequisite.HTMLtype == 'TRUE / FALSE') {
              newRegisterRequisite.value = 'false';
           }
           this.requisites.push(newRegisterRequisite);
        });
        this.mostrarRequisitos = true;
        this.sortArray(this.requisites);
      }).catch( e => { console.log(e); });
    }
    if (this.actividadSelected == '2') {
      this.requisiteABDataService.get_filtered(this.register_type_id).then( r=> {
        this.totalAbPointsSelected = 0;
        this.totalAviable = 0;
        this.totalABPuntosShown = 0;
        this.categoryAB = 0;

        const requisitesByRegisterType = r as any[];
        requisitesByRegisterType.forEach(element => {
          const newRegisterRequisite = new RegisterABRequisite();
          newRegisterRequisite.to_approve = element.to_approve;
          newRegisterRequisite.score = element.score;
          newRegisterRequisite.requisite_name = element.name;
          newRegisterRequisite.requisite_id = element.id;
          newRegisterRequisite.fullfill = true;
          newRegisterRequisite.requisite_code = element.code;
          newRegisterRequisite.mandatory = element.mandatory;
          newRegisterRequisite.id = element.id;
          newRegisterRequisite.requisite_father_code = element.father_code;
          newRegisterRequisite.level = element.code.split('.').length;
          newRegisterRequisite.HTMLtype = element.type;
          newRegisterRequisite.fullfill = false;
          if (newRegisterRequisite.HTMLtype == 'YES / NO') {
              newRegisterRequisite.value = '0';
          }
          if (newRegisterRequisite.HTMLtype == 'NUMBER') {
              newRegisterRequisite.value = '0';
          }
          if (newRegisterRequisite.HTMLtype == 'TRUE / FALSE') {
              newRegisterRequisite.value = 'false';
          }
          this.requisites.push(newRegisterRequisite);
        });
        this.mostrarRequisitos = true;
        this.calcTotalPoints();
        this.sortArray(this.requisites);
      }).catch( e => { console.log(e); });
    }
  }
}