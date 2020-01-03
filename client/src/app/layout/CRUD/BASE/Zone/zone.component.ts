import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ZoneService } from './../../../../services/CRUD/BASE/zone.service';
import { Zone } from './../../../../models/BASE/Zone';

@Component({
   selector: 'app-zone',
   templateUrl: './zone.component.html',
   styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
   zones: Zone[] = [];
   zoneSelected: Zone = new Zone();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private zoneDataService: ZoneService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectZone(zone: Zone) {
      this.zoneSelected = zone;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getZones();
   }

   locationEvent(event) {
      this.zoneSelected.location_latitude = event.coords.lat;
      this.zoneSelected.location_longitude = event.coords.lng;
   }

   getZones() {
      this.zones = [];
      this.zoneSelected = new Zone();
      this.zoneDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.zones = r.data as Zone[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newZone(content) {
      this.zoneSelected = new Zone();
      this.openDialog(content);
   }

   editZone(content) {
      if (typeof this.zoneSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteZone() {
      if (typeof this.zoneSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.zoneDataService.delete(this.zoneSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getZones();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.zoneDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Zones.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.zoneDataService.get().then( r => {
         const backupData = r as Zone[];
         let output = 'id;name;address;acronym;phone_number;location_latitude;location_longitude;email;id_coordinator\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.address + ';' + element.acronym + ';' + element.phone_number + ';' + element.location_latitude + ';' + element.location_longitude + ';' + element.email + ';' + element.id_coordinator + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Zones.csv');
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
            this.zoneDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.zoneSelected.id === 'undefined') {
               this.zoneDataService.post(this.zoneSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getZones();
               }).catch( e => console.log(e) );
            } else {
               this.zoneDataService.put(this.zoneSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getZones();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}