import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';
import { InactivationRequest } from './../../../../models/INACTIVACION/InactivationRequest';

@Component({
   selector: 'app-inactivationrequest',
   templateUrl: './inactivationrequest.component.html',
   styleUrls: ['./inactivationrequest.component.scss']
})
export class InactivationRequestComponent implements OnInit {
   inactivation_requests: InactivationRequest[] = [];
   inactivation_requestSelected: InactivationRequest = new InactivationRequest();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private inactivation_requestDataService: InactivationRequestService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectInactivationRequest(inactivation_request: InactivationRequest) {
      this.inactivation_requestSelected = inactivation_request;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getInactivationRequests();
   }

   getInactivationRequests() {
      this.inactivation_requests = [];
      this.inactivation_requestSelected = new InactivationRequest();
      this.inactivation_requestDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.inactivation_requests = r.data as InactivationRequest[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInactivationRequest(content) {
      this.inactivation_requestSelected = new InactivationRequest();
      this.openDialog(content);
   }

   editInactivationRequest(content) {
      if (typeof this.inactivation_requestSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInactivationRequest() {
      if (typeof this.inactivation_requestSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.inactivation_requestDataService.delete(this.inactivation_requestSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInactivationRequests();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.inactivation_requestDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequests.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.inactivation_requestDataService.get().then( r => {
         const backupData = r as InactivationRequest[];
         let output = 'id;ruc;ruc__code__ids;comments;contact_phone_main_number;contact_phone_seconday_number;email\n';
         backupData.forEach(element => {
            output += element.id; + element.ruc + ';' + element.ruc__code__ids + ';' + element.comments + ';' + element.contact_phone_main_number + ';' + element.contact_phone_seconday_number + ';' + element.email + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequests.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.inactivation_requestDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.inactivation_requestSelected.id === 'undefined') {
               this.inactivation_requestDataService.post(this.inactivation_requestSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInactivationRequests();
               }).catch( e => console.log(e) );
            } else {
               this.inactivation_requestDataService.put(this.inactivation_requestSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInactivationRequests();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}