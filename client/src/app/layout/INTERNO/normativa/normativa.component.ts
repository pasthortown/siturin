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
            cabecera.listaRequisitos.push(element);
          }
        });
        if (!existe) {
          this.requisites.push({listaRequisitos: [element], listaGrupos: [], nombre: element.cabecera_nombre, idCabecera: element.id_cabecera_requisito});
        }
      });
    }).catch( e => { console.log(e); });
    this.requisites.sort((req1, req2) => {
      console.log(req1.idCabecera);
      if (req1.idCabecera > req2.idCabecera) {
        return 1;
      }
      if (req1.idCabecera < req2.idCabecera) {
        return -1;
      }
      return 0;
    });
    console.log(this.requisites);

  }
}
