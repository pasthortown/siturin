import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InactivationRequestAttachmentService } from './../../../../services/CRUD/INACTIVACION/inactivationrequestattachment.service';
import { InactivationRequestAttachment } from './../../../../models/INACTIVACION/InactivationRequestAttachment';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';
import { InactivationRequest } from './../../../../models/INACTIVACION/InactivationRequest';


@Component({
   selector: 'app-inactivationrequestattachment',
   templateUrl: './inactivationrequestattachment.component.html',
   styleUrls: ['./inactivationrequestattachment.component.scss']
})
export class InactivationRequestAttachmentComponent implements OnInit {
   inactivation_request_attachments: InactivationRequestAttachment[] = [];
   inactivation_request_attachmentSelected: InactivationRequestAttachment = new InactivationRequestAttachment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   inactivation_requests: InactivationRequest[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private inactivation_requestDataService: InactivationRequestService,
               private inactivation_request_attachmentDataService: InactivationRequestAttachmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInactivationRequest();
   }

   CodeFileInactivationRequestAttachment(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.inactivation_request_attachmentSelected.inactivation_request_attachment_file_name = file.name;
            this.inactivation_request_attachmentSelected.inactivation_request_attachment_file_type = file.type;
            this.inactivation_request_attachmentSelected.inactivation_request_attachment_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectInactivationRequestAttachment(inactivation_request_attachment: InactivationRequestAttachment) {
      this.inactivation_request_attachmentSelected = inactivation_request_attachment;
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
      this.getInactivationRequestAttachments();
   }

   getInactivationRequestAttachments() {
      this.inactivation_request_attachments = [];
      this.inactivation_request_attachmentSelected = new InactivationRequestAttachment();
      this.inactivation_request_attachmentSelected.inactivation_request_id = 0;
      this.inactivation_request_attachmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.inactivation_request_attachments = r.data as InactivationRequestAttachment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInactivationRequestAttachment(content) {
      this.inactivation_request_attachmentSelected = new InactivationRequestAttachment();
      this.inactivation_request_attachmentSelected.inactivation_request_id = 0;
      this.openDialog(content);
   }

   editInactivationRequestAttachment(content) {
      if (typeof this.inactivation_request_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInactivationRequestAttachment() {
      if (typeof this.inactivation_request_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.inactivation_request_attachmentDataService.delete(this.inactivation_request_attachmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInactivationRequestAttachments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.inactivation_request_attachmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequestAttachments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.inactivation_request_attachmentDataService.get().then( r => {
         const backupData = r as InactivationRequestAttachment[];
         let output = 'id;inactivation_request_attachment_file_type;inactivation_request_attachment_file_name;inactivation_request_attachment_file;inactivation_request_id\n';
         backupData.forEach(element => {
            output += element.id; + element.inactivation_request_attachment_file_type + ';' + element.inactivation_request_attachment_file_name + ';' + element.inactivation_request_attachment_file + ';' + element.inactivation_request_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InactivationRequestAttachments.csv');
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
            this.inactivation_request_attachmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   downloadFile(file: string, type: string, name: string) {
      const byteCharacters = atob(file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: type});
      saveAs(blob, name);
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.inactivation_request_attachmentSelected.id === 'undefined') {
               this.inactivation_request_attachmentDataService.post(this.inactivation_request_attachmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInactivationRequestAttachments();
               }).catch( e => console.log(e) );
            } else {
               this.inactivation_request_attachmentDataService.put(this.inactivation_request_attachmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInactivationRequestAttachments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}