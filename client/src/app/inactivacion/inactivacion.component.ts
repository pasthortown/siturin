import { ConsultorService } from './../services/negocio/consultor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'inactivacion-login',
    templateUrl: './inactivacion.component.html',
    styleUrls: ['./inactivacion.component.scss']
})
export class InactivacionComponent implements OnInit {

  busy: Promise<any>;
  
  constructor(private consultorDataService: ConsultorService,
    private router: Router, 
    private modalService: NgbModal) {}
  
  ngOnInit() {
  }

  openDialog(content) {
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       
    }), ( r => {}));
 }
}
