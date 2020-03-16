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

  actividades = [];
  clasificaciones = [];

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

  getClasificaciones(actividad_id) {
    this.clasificaciones = [];
    this.normativaDataService.get_clasificaciones(actividad_id).then( r => {
      this.clasificaciones = r.data;
      console.log(this.clasificaciones);
   }).catch( e => { console.log(e); });
  }
}
