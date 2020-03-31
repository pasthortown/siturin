import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TuristicTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/turistictransport.service';
import { TuristicTransport } from './../../../../models/OPERACIONINTERMEDIACION/TuristicTransport';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { Register } from './../../../../models/OPERACIONINTERMEDIACION/Register';

import { ActivityTransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/activitytransporttype.service';
import { ActivityTransportType } from './../../../../models/OPERACIONINTERMEDIACION/ActivityTransportType';

import { TransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/transporttype.service';
import { TransportType } from './../../../../models/OPERACIONINTERMEDIACION/TransportType';


@Component({
   selector: 'app-turistictransport',
   templateUrl: './turistictransport.component.html',
   styleUrls: ['./turistictransport.component.scss']
})
export class TuristicTransportComponent implements OnInit {
   turistic_transports: TuristicTransport[] = [];
   turistic_transportSelected: TuristicTransport = new TuristicTransport();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   registers: Register[] = [];
   activity_transport_types: ActivityTransportType[] = [];
   transport_types: TransportType[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private registerDataService: RegisterService,
               private activity_transport_typeDataService: ActivityTransportTypeService,
               private transport_typeDataService: TransportTypeService,
               private turistic_transportDataService: TuristicTransportService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getRegister();
      this.getActivityTransportType();
      this.getTransportType();
   }

   selectTuristicTransport(turistic_transport: TuristicTransport) {
      this.turistic_transportSelected = turistic_transport;
   }

   getRegister() {
      this.registers = [];
      this.registerDataService.get().then( r => {
         this.registers = r as Register[];
      }).catch( e => console.log(e) );
   }

   getActivityTransportType() {
      this.activity_transport_types = [];
      this.activity_transport_typeDataService.get().then( r => {
         this.activity_transport_types = r as ActivityTransportType[];
      }).catch( e => console.log(e) );
   }

   getTransportType() {
      this.transport_types = [];
      this.transport_typeDataService.get().then( r => {
         this.transport_types = r as TransportType[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTuristicTransports();
   }

   getTuristicTransports() {
      this.turistic_transports = [];
      this.turistic_transportSelected = new TuristicTransport();
      this.turistic_transportSelected.register_id = 0;
      this.turistic_transportSelected.activity_transport_type_id = 0;
      this.turistic_transportSelected.transport_type_id = 0;
      this.turistic_transportDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.turistic_transports = r.data as TuristicTransport[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTuristicTransport(content) {
      this.turistic_transportSelected = new TuristicTransport();
      this.turistic_transportSelected.register_id = 0;
      this.turistic_transportSelected.activity_transport_type_id = 0;
      this.turistic_transportSelected.transport_type_id = 0;
      this.openDialog(content);
   }

   editTuristicTransport(content) {
      if (typeof this.turistic_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTuristicTransport() {
      if (typeof this.turistic_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.turistic_transportDataService.delete(this.turistic_transportSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTuristicTransports();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.turistic_transportDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TuristicTransports.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.turistic_transportDataService.get().then( r => {
         const backupData = r as TuristicTransport[];
         let output = 'id;ruc;tax_payer_type_id;register_code;register_date;social_name;register_id;activity_transport_type_id;transport_type_id\n';
         backupData.forEach(element => {
            output += element.id; + element.ruc + ';' + element.tax_payer_type_id + ';' + element.register_code + ';' + element.register_date + ';' + element.social_name + ';' + element.register_id + ';' + element.activity_transport_type_id + ';' + element.transport_type_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TuristicTransports.csv');
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
            this.turistic_transportDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.turistic_transportSelected.id === 'undefined') {
               this.turistic_transportDataService.post(this.turistic_transportSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTuristicTransports();
               }).catch( e => console.log(e) );
            } else {
               this.turistic_transportDataService.put(this.turistic_transportSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTuristicTransports();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}