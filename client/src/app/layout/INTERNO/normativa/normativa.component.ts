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

  actividades = [];
  clasificaciones = [];
  categorias = [];
  requisites = [];

  constructor( private normativaDataService: NormativaService) {}

  ngOnInit() {
    this.getActividades();
  }

  getActividades() {
    this.actividades = [];
    this.normativaDataService.get_actvidades().then( r => {
       this.actividades = r.data;
    }).catch( e => { console.log(e); });
  }

  getClasificaciones() {
    this.clasificaciones = [];
    this.normativaDataService.get_clasificaciones(this.actividad_id).then( r => {
      this.clasificaciones = r.data;
    }).catch( e => { console.log(e); });
  }

  getCategorias() {
    this.categorias = [];
    this.normativaDataService.get_categorias(this.clasificacion_id, this.divition_id).then( r => {
      this.categorias = r.data;
    }).catch( e => { console.log(e); });
  }

  getRequisites() {
    this.requisites = [];
    this.normativaDataService.get_requisites(this.categoria_id).then( r => {
      const incomming = r.data.requisitos as any[];
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
        if (r1.idCabecera > r2.idCabecera) {
          return 1;
        }
        if (r1.idCabecera < r2.idCabecera) {
          return -1;
        }
        return 0;
      });
      console.log(this.requisites);
    }).catch( e => { console.log(e); });
  }
}
