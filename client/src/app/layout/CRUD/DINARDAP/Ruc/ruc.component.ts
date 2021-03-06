import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { RucService } from './../../../../services/CRUD/DINARDAP/ruc.service';
import { Ruc } from './../../../../models/DINARDAP/Ruc';

@Component({
   selector: 'app-ruc',
   templateUrl: './ruc.component.html',
   styleUrls: ['./ruc.component.scss']
})
export class RucComponent implements OnInit {
   rucs: Ruc[] = [];
   rucSelected: Ruc = new Ruc();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private rucDataService: RucService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectRuc(ruc: Ruc) {
      this.rucSelected = ruc;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getRucs();
   }

   getRucs() {
      this.rucs = [];
      this.rucSelected = new Ruc();
      this.rucDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.rucs = r.data as Ruc[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newRuc(content) {
      this.rucSelected = new Ruc();
      this.openDialog(content);
   }

   editRuc(content) {
      if (typeof this.rucSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteRuc() {
      if (typeof this.rucSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.rucDataService.delete(this.rucSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getRucs();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.rucDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Rucs.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.rucDataService.get().then( r => {
         const backupData = r as Ruc[];
         let output = 'id;number;data;date\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.number + ';' + element.data + ';' + element.date + '\n';
         });
         const blob = new Blob(["\ufeff", output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Rucs.csv');
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
            this.rucDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.rucSelected.id === 'undefined') {
               this.rucDataService.post(this.rucSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getRucs();
               }).catch( e => console.log(e) );
            } else {
               this.rucDataService.put(this.rucSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getRucs();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}