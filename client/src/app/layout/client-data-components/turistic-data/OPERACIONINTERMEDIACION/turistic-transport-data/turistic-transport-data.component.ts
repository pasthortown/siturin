import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turistic-transport-data',
  templateUrl: './turistic-transport-data.component.html',
  styleUrls: ['./turistic-transport-data.component.scss']
})
export class TuristicTransportDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  constructor() {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.loadCatalogos();
  }

  loadCatalogos() {
    
  }
}
