import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/transporttype.service';
import { TransportType } from './../../../../models/OPERACIONINTERMEDIACION/TransportType';

@Component({
   selector: 'app-transporttype',
   templateUrl: './transporttype.component.html',
   styleUrls: ['./transporttype.component.scss']
})
export class TransportTypeComponent implements OnInit {
   transport_types: TransportType[] = [];
   transport_typeSelected: TransportType = new TransportType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transport_typeDataService: TransportTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectTransportType(transport_type: TransportType) {
      this.transport_typeSelected = transport_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTransportTypes();
   }

   getTransportTypes() {
      this.transport_types = [];
      this.transport_typeSelected = new TransportType();
      this.transport_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.transport_types = r.data as TransportType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTransportType(content) {
      this.transport_typeSelected = new TransportType();
      this.openDialog(content);
   }

   editTransportType(content) {
      if (typeof this.transport_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTransportType() {
      if (typeof this.transport_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.transport_typeDataService.delete(this.transport_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTransportTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.transport_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.transport_typeDataService.get().then( r => {
         const backupData = r as TransportType[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportTypes.csv');
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
            this.transport_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.transport_typeSelected.id === 'undefined') {
               this.transport_typeDataService.post(this.transport_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTransportTypes();
               }).catch( e => console.log(e) );
            } else {
               this.transport_typeDataService.put(this.transport_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTransportTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}