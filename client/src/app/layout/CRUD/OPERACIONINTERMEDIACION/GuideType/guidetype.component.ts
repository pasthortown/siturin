import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { GuideTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/guidetype.service';
import { GuideType } from './../../../../models/OPERACIONINTERMEDIACION/GuideType';

@Component({
   selector: 'app-guidetype',
   templateUrl: './guidetype.component.html',
   styleUrls: ['./guidetype.component.scss']
})
export class GuideTypeComponent implements OnInit {
   guide_types: GuideType[] = [];
   guide_typeSelected: GuideType = new GuideType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private guide_typeDataService: GuideTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectGuideType(guide_type: GuideType) {
      this.guide_typeSelected = guide_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getGuideTypes();
   }

   getGuideTypes() {
      this.guide_types = [];
      this.guide_typeSelected = new GuideType();
      this.guide_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.guide_types = r.data as GuideType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newGuideType(content) {
      this.guide_typeSelected = new GuideType();
      this.openDialog(content);
   }

   editGuideType(content) {
      if (typeof this.guide_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteGuideType() {
      if (typeof this.guide_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.guide_typeDataService.delete(this.guide_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getGuideTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.guide_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_GuideTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.guide_typeDataService.get().then( r => {
         const backupData = r as GuideType[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_GuideTypes.csv');
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
            this.guide_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.guide_typeSelected.id === 'undefined') {
               this.guide_typeDataService.post(this.guide_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getGuideTypes();
               }).catch( e => console.log(e) );
            } else {
               this.guide_typeDataService.put(this.guide_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getGuideTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}