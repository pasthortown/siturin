import { RequisiteService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
import { RegisterTypeService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { NormativaService } from './../../../services/negocio/normativa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.scss']
})
export class NormativaComponent implements OnInit {
  divition_id: number;
  clasificacion_id: number;
  actividad_id: number;
  categoria_id: number;

  categoria_idSiturin: number;
  clasificacion_codeSiturin: string;

  actividades = [];
  clasificaciones = [];
  categorias = [];
  requisites = [];
  allrequisites = [];

  clasificacionesSiturin = [];
  categoriasSiturn = [];
  allRegisterTypes = [];
  
  requisitesSiturin = [];
  
  requisites_diferencias = [];

  constructor( private normativaDataService: NormativaService, 
    private registerTypeDataService: RegisterTypeService,
    private requisiteDataService: RequisiteService) {}

  ngOnInit() {
    this.getActividades();
    this.getAllRegisterTypes();
  }

  getAllRegisterTypes() {
    this.registerTypeDataService.get().then( r => {
      this.allRegisterTypes = r as any[];
    }).catch( e => { console.log(e); });
  }

  getActividades() {
    this.actividades = [];
    this.normativaDataService.get_actvidades().then( r => {
       this.actividades = r.data;
    }).catch( e => { console.log(e); });
  }

  getClasificaciones() {
    this.clasificaciones = [];
    this.clasificacionesSiturin = [];
    this.normativaDataService.get_clasificaciones(this.actividad_id).then( r => {
      this.clasificaciones = r.data;
    }).catch( e => { console.log(e); });
  
    this.allRegisterTypes.forEach(element => {
      if (element.father_code == this.divition_id.toString()) {
        this.clasificacionesSiturin.push(element);
      }
    });
  }

  getCategorias() {
    this.categorias = [];
    this.normativaDataService.get_categorias(this.clasificacion_id, this.divition_id).then( r => {
      this.categorias = r.data;
    }).catch( e => { console.log(e); });
  }

  getCategoriasSiturin() {
    this.categoriasSiturn = [];
    this.allRegisterTypes.forEach(element => {
      if (element.father_code == this.clasificacion_codeSiturin) {
        this.categoriasSiturn.push(element);
      }
    });
  }

  getRequisitesSiturin() {
    this.requisitesSiturin = [];
    this.requisiteDataService.get_filtered(this.categoria_idSiturin).then( r => {
      this.requisitesSiturin = r as any[];
    }).catch( e => { console.log(e); });
  }

  buscarDiferencias() {
    this.requisites_diferencias = [];
    this.allrequisites.forEach(req_normativa => {
      let existeSiturin = false;
      let existenormativa = true;
      let obligatorioDiferente = true;
      this.requisitesSiturin.forEach(req_siturin => {
        if (req_siturin.name == req_normativa.requerimiento) {
          existeSiturin = true;
          if ((req_siturin.mandatory && req_normativa.es_obligatorio == 't') || (!req_siturin.mandatory && req_normativa.es_obligatorio == 'f')) {
            obligatorioDiferente = false;
          }
        }   
      });
      const newDiferencia = {
        nombre: req_normativa.requerimiento, 
        existeSinturin: existeSiturin, 
        existenormativa: existenormativa, 
        obligatorioDiferente: obligatorioDiferente
      };  
      if (!existeSiturin || obligatorioDiferente || !existenormativa) {
        this.requisites_diferencias.push(newDiferencia);  
      }  
    });
    
    // this.requisitesSiturin.forEach(req_siturin => {
    //   const newDiferencia = {nombre: req_siturin.name, existeSinturin: false, existenormativa: false, textoDiferente: false, obligatorioDiferente: false};
    //   this.requisites_diferencias.push(newDiferencia);      
    // });
    // console.log(this.allrequisites);
    // console.log(this.requisitesSiturin);
  }  

  getRequisites() {
    this.requisites = [];
    this.allrequisites = [];
    this.normativaDataService.get_requisites(this.categoria_id).then( r => {
      const incomming = r.data.requisitos as any[];
      this.allrequisites = incomming;
      incomming.forEach(element => {
        let existe = false;
        this.requisites.forEach(cabecera => {
          if (cabecera.nombre == element.cabecera_nombre) {
            existe = true;
            if (element.id_grupo_requisito == null) {
              cabecera.listaRequisitos.push(element);
            } else {
              let existeGrupo = false;
              cabecera.listaGrupos.forEach(grupo => {
                if (grupo.idGrupo == element.id_grupo_requisito) {
                  existeGrupo = true;
                  grupo.listaRequisitos.push(element);
                }
              });
              if (!existeGrupo) {
                cabecera.listaGrupos.push({idGrupo: element.id_grupo_requisito, listaRequisitos: [element], gruporeq_nombre: element.gruporeq_nombre})
              }
            }
          }
        });
        if (!existe) {
          if (element.id_grupo_requisito == null) {
            this.requisites.push({listaRequisitos: [element], listaGrupos: [], nombre: element.cabecera_nombre, idCabecera: element.id_cabecera_requisito});
          }else {
            this.requisites.push({listaRequisitos: [], listaGrupos: [{idGrupo: element.id_grupo_requisito, listaRequisitos: [element], gruporeq_nombre: element.gruporeq_nombre}], nombre: element.cabecera_nombre, idCabecera: element.id_cabecera_requisito});
          }
        }
      });
      this.requisites.sort((r1,r2)=>{
        if (r1.idCabecera*1 > r2.idCabecera*1) {
          return 1;
        }
        if (r1.idCabecera*1 < r2.idCabecera*1) {
          return -1;
        }
        return 0;
      });
      this.requisites.forEach(cabecera => {
        cabecera.listaRequisitos.sort((r1, r2)=> {
          if (r1.id_requisito*1 > r2.id_requisito*1) {
            return 1;
          }
          if (r1.id_requisito*1 < r2.id_requisito*1) {
            return -1;
          }
          return 0
        });
        cabecera.listaGrupos.forEach(grupo => {
          grupo.listaRequisitos.sort((r1, r2)=> {
            if (r1.id_requisito*1 > r2.id_requisito*1) {
              return 1;
            }
            if (r1.id_requisito*1 < r2.id_requisito*1) {
              return -1;
            }
            return 0
          });
        });
      });
    }).catch( e => { console.log(e); });
  }
}