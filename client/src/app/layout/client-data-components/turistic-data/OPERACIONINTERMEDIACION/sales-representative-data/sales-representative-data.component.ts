import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-representative-data',
  templateUrl: './sales-representative-data.component.html',
  styleUrls: ['./sales-representative-data.component.scss']
})
export class SalesRepresentativeDataComponent implements OnInit {
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
