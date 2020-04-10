import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tour-guide-data',
  templateUrl: './tour-guide-data.component.html',
  styleUrls: ['./tour-guide-data.component.scss']
})
export class TourGuideDataComponent implements OnInit {
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
