import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InactivationRequestDeclarationService } from './../../../../services/CRUD/INACTIVACION/inactivationrequestdeclaration.service';
import { InactivationRequestDeclaration } from './../../../../models/INACTIVACION/InactivationRequestDeclaration';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';
import { InactivationRequest } from './../../../../models/INACTIVACION/InactivationRequest';


@Component({
   selector: 'app-inactivationrequestdeclaration',
   templateUrl: './inactivationrequestdeclaration.component.html',
   styleUrls: ['./inactivationrequestdeclaration.component.scss']
})
export class InactivationRequestDeclarationComponent implements OnInit {
   inactivation_request_declarations: InactivationRequestDeclaration[] = [];
   inactivation_request_declarationSelected: InactivationRequestDeclaration = new InactivationRequestDeclaration();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   inactivation_requests: InactivationRequest[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private inactivation_requestDataService: InactivationRequestService,
               private inactivation_request_declarationDataService: InactivationRequestDeclarationService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInactivationRequest();
   }

   selectInactivationRequestDeclaration(inactivation_request_declaration: InactivationRequestDeclaration) {
      this.inactivation_request_declarationSelected = inactivation_request_declaration;
   }

   getInactivationRequest() {
      this.inactivation_requests = [];
      this.inactivation_requestDataService.get().then( r => {
         this.inactivation_requests = r as InactivationRequest[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getInactivationRequestDeclarations();
   }

   getInactivationRequestDeclarations() {
      this.inactivation_request_declarations = [];
      this.inactivation_request_declarationSelected = new InactivationRequestDeclaration();
      this.inactivation_request_declarationSelected.inactivation_request_id = 0;
      this.inactivation_request_declarationDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.inactivation_request_declarations = r.data as InactivationRequestDeclaration[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInactivationRequestDeclaration(content) {
      this.inactivation_request_declarationSelected = new InactivationRequestDeclaration();
      this.inactivation_request_declarationSelected.inactivation_request_id = 0;
      this.openDialog(content);
   }

   editInactivationRequestDeclaration(content) {
      if (typeof this.inactivation_request_declarationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInactivationRequestDeclaration() {
      if (typeof this.inactivation_request_declarationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.inactivation_request_declarationDataService.delete(this.inactivation_request_declarationSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInactivationRequestDeclarations();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.inactivation_request_declarationDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequestDeclarations.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.inactivation_request_declarationDataService.get().then( r => {
         const backupData = r as InactivationRequestDeclaration[];
         let output = 'id;declaration_id;inactivation_request_id\n';
         backupData.forEach(element => {
            output += element.id; + element.declaration_id + ';' + element.inactivation_request_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequestDeclarations.csv');
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
            this.inactivation_request_declarationDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.inactivation_request_declarationSelected.id === 'undefined') {
               this.inactivation_request_declarationDataService.post(this.inactivation_request_declarationSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInactivationRequestDeclarations();
               }).catch( e => console.log(e) );
            } else {
               this.inactivation_request_declarationDataService.put(this.inactivation_request_declarationSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInactivationRequestDeclarations();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}