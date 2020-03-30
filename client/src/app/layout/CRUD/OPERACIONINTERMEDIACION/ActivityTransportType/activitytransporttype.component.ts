import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ActivityTransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/activitytransporttype.service';
import { ActivityTransportType } from './../../../../models/OPERACIONINTERMEDIACION/ActivityTransportType';

@Component({
   selector: 'app-activitytransporttype',
   templateUrl: './activitytransporttype.component.html',
   styleUrls: ['./activitytransporttype.component.scss']
})
export class ActivityTransportTypeComponent implements OnInit {
   activity_transport_types: ActivityTransportType[] = [];
   activity_transport_typeSelected: ActivityTransportType = new ActivityTransportType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private activity_transport_typeDataService: ActivityTransportTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectActivityTransportType(activity_transport_type: ActivityTransportType) {
      this.activity_transport_typeSelected = activity_transport_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getActivityTransportTypes();
   }

   getActivityTransportTypes() {
      this.activity_transport_types = [];
      this.activity_transport_typeSelected = new ActivityTransportType();
      this.activity_transport_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.activity_transport_types = r.data as ActivityTransportType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newActivityTransportType(content) {
      this.activity_transport_typeSelected = new ActivityTransportType();
      this.openDialog(content);
   }

   editActivityTransportType(content) {
      if (typeof this.activity_transport_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteActivityTransportType() {
      if (typeof this.activity_transport_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.activity_transport_typeDataService.delete(this.activity_transport_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getActivityTransportTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.activity_transport_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ActivityTransportTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.activity_transport_typeDataService.get().then( r => {
         const backupData = r as ActivityTransportType[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ActivityTransportTypes.csv');
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
            this.activity_transport_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.activity_transport_typeSelected.id === 'undefined') {
               this.activity_transport_typeDataService.post(this.activity_transport_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getActivityTransportTypes();
               }).catch( e => console.log(e) );
            } else {
               this.activity_transport_typeDataService.put(this.activity_transport_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getActivityTransportTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}