import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { CategoryTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/categorytransport.service';
import { CategoryTransport } from './../../../../models/OPERACIONINTERMEDIACION/CategoryTransport';

@Component({
   selector: 'app-categorytransport',
   templateUrl: './categorytransport.component.html',
   styleUrls: ['./categorytransport.component.scss']
})
export class CategoryTransportComponent implements OnInit {
   categories_transport: CategoryTransport[] = [];
   category_transportSelected: CategoryTransport = new CategoryTransport();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private category_transportDataService: CategoryTransportService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectCategoryTransport(category_transport: CategoryTransport) {
      this.category_transportSelected = category_transport;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getCategoriesTransport();
   }

   getCategoriesTransport() {
      this.categories_transport = [];
      this.category_transportSelected = new CategoryTransport();
      this.category_transportDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.categories_transport = r.data as CategoryTransport[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newCategoryTransport(content) {
      this.category_transportSelected = new CategoryTransport();
      this.openDialog(content);
   }

   editCategoryTransport(content) {
      if (typeof this.category_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteCategoryTransport() {
      if (typeof this.category_transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.category_transportDataService.delete(this.category_transportSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getCategoriesTransport();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.category_transportDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_CategoriesTransport.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.category_transportDataService.get().then( r => {
         const backupData = r as CategoryTransport[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_CategoriesTransport.csv');
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
            this.category_transportDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.category_transportSelected.id === 'undefined') {
               this.category_transportDataService.post(this.category_transportSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getCategoriesTransport();
               }).catch( e => console.log(e) );
            } else {
               this.category_transportDataService.put(this.category_transportSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getCategoriesTransport();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}