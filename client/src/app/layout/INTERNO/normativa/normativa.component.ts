import { RequisiteService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
import { RegisterTypeService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.scss']
})
export class NormativaComponent implements OnInit {
  regiones = [];
  allRegisterTypes = [];
  clasifications_registers = [];
  actividadSelected = '-';
  regionSelectedCode = '-';
  categorySelectedCode = '-';
  activateAlojamiento = true;
  activateAlimentosBebidas = true;
  activateOperationIntermediation = true;

  constructor( private registerTypeDataService: RegisterTypeService,
    private requisiteDataService: RequisiteService) {}

  ngOnInit() {
    this.getAllRegisterTypes();
  }

  getRegiones() {
    this.regiones = [];
    this.allRegisterTypes.forEach(element => {
      if (element.father_code == '-') {
        this.regiones.push(element);
      }
    });
   }

  getAllRegisterTypes() {
    this.registerTypeDataService.get().then( r => {
      this.allRegisterTypes = r as any[];
      this.getRegiones();
    }).catch( e => { console.log(e); });
  }

  getClasifications() {
    this.clasifications_registers = [];
    this.allRegisterTypes.forEach(element => {
      if (element.father_code == this.actividadSelected) {
        this.clasifications_registers.push(element);
      }
    });
  }

  
  // buscarDiferencias() {
  //   this.requisites_diferencias = [];
  //   this.allrequisites.forEach(req_normativa => {
  //     let existeSiturin = false;
  //     let existenormativa = true;
  //     let obligatorioDiferente = true;
  //     this.requisitesSiturin.forEach(req_siturin => {
  //       if (req_siturin.name.toString().toUpperCase().trim() == req_normativa.requerimiento.toString().toUpperCase().trim()) {
  //         existeSiturin = true;
  //         if ((req_siturin.mandatory && req_normativa.es_obligatorio == 't') || (!req_siturin.mandatory && req_normativa.es_obligatorio == 'f')) {
  //           obligatorioDiferente = false;
  //         }
  //       }   
  //     });
  //     const newDiferencia = {
  //       nombre: req_normativa.requerimiento, 
  //       existeSinturin: existeSiturin, 
  //       existenormativa: existenormativa, 
  //       obligatorioDiferente: obligatorioDiferente
  //     };  
  //     if (!existeSiturin || obligatorioDiferente || !existenormativa) {
  //       this.requisites_diferencias.push(newDiferencia);  
  //     }  
  //   });
    
  //   // this.requisitesSiturin.forEach(req_siturin => {
  //   //   let existeSiturin = true;
  //   //   let existenormativa = false;
  //   //   let obligatorioDiferente = true;
  //   //   this.allrequisites.forEach(req_normativa => {
  //   //     if (req_siturin.name == req_normativa.requerimiento) {
  //   //       existenormativa = true;
  //   //       if ((req_siturin.mandatory && req_normativa.es_obligatorio == 't') || (!req_siturin.mandatory && req_normativa.es_obligatorio == 'f')) {
  //   //         obligatorioDiferente = false;
  //   //       }
  //   //     }   
  //   //   });
  //   //   const newDiferencia = {
  //   //     nombre: req_siturin.name, 
  //   //     existeSinturin: existeSiturin, 
  //   //     existenormativa: existenormativa, 
  //   //     obligatorioDiferente: obligatorioDiferente
  //   //   };  
  //   //   if (!existeSiturin || obligatorioDiferente || !existenormativa) {
  //   //     this.requisites_diferencias.push(newDiferencia);  
  //   //   }  
  //   // });
  // }  

}