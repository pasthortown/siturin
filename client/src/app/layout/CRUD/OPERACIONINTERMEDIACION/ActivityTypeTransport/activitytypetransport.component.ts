import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ActivityTypeTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/activitytypetransport.service';
import { ActivityTypeTransport } from './../../../../models/OPERACIONINTERMEDIACION/ActivityTypeTransport';

@Component({
   selector: 'app-activitytypetransport',
   templateUrl: './activitytypetransport.component.html',
   styleUrls: ['./activitytypetransport.component.scss']
})
export class ActivityTypeTransportComponent implements OnInit {
   activity_types_transport: ActivityTypeTransport[] = [];
   activity_type_transportSelected: ActivityTypeTransport = new ActivityTypeTransport();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private activity_type_transportDataService: ActivityTypeTransportService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectActivityTypeTransport(activity_type_transport: ActivityTypeTransport) {
      this.activity_type_transportSelected = activity_type_transport;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getActivityTypesTransport();
   }

   getActivityTypesTransport() {
      this.activity_types_transport = [];
      this.activity_type_transportSelected = new ActivityTypeTransport();
      this.activity_type_transportDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.activity_types_transport = r.data as ActivityTypeTransport[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newActivityTypeTransport(content) {
      this.activity_type_transportSelected = new ActivityTypeTransport();
      this.openDialog(content);
   }

   editActivityTypeTransport(content) {
      if (typeof this.activity_type_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteActivityTypeTransport() {
      if (typeof this.activity_type_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.activity_type_transportDataService.delete(this.activity_type_transportSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getActivityTypesTransport();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.activity_type_transportDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ActivityTypesTransport.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.activity_type_transportDataService.get().then( r => {
         const backupData = r as ActivityTypeTransport[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ActivityTypesTransport.csv');
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
            this.activity_type_transportDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.activity_type_transportSelected.id === 'undefined') {
               this.activity_type_transportDataService.post(this.activity_type_transportSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getActivityTypesTransport();
               }).catch( e => console.log(e) );
            } else {
               this.activity_type_transportDataService.put(this.activity_type_transportSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getActivityTypesTransport();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}