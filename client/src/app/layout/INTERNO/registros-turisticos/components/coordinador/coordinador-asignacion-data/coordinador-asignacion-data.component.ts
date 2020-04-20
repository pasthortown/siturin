import { Establishment } from 'src/app/models/BASE/Establishment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coordinador-asignacion-data',
  templateUrl: './coordinador-asignacion-data.component.html',
  styleUrls: ['./coordinador-asignacion-data.component.scss']
})
export class CoordinadorAsignacionDataComponent implements OnInit {
  @Input('data_selected') data_selected = {row: null, 
    register: {register: null,
      activity_id: 0,
      activity: '',
      establishment: new Establishment(),
      ruc: new Ruc(),
      states: null,
      register_data_on_catastro: null
    }
  };

  @Input('tecnicos_financieros') tecnicosFinancieros = [];
  @Input('tecnicos_zonales') tecnicosZonales = [];

  constructor() {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {

  }

  refresh() {
    console.log(this.tecnicosFinancieros);
    console.log(this.tecnicosZonales);
    console.log(this.data_selected);
  }
}
