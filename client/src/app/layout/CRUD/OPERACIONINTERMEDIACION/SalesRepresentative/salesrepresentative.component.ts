import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { SalesRepresentativeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/salesrepresentative.service';
import { SalesRepresentative } from './../../../../models/OPERACIONINTERMEDIACION/SalesRepresentative';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { Register } from './../../../../models/OPERACIONINTERMEDIACION/Register';


@Component({
   selector: 'app-salesrepresentative',
   templateUrl: './salesrepresentative.component.html',
   styleUrls: ['./salesrepresentative.component.scss']
})
export class SalesRepresentativeComponent implements OnInit {
   sales_representatives: SalesRepresentative[] = [];
   sales_representativeSelected: SalesRepresentative = new SalesRepresentative();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   registers: Register[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private registerDataService: RegisterService,
               private sales_representativeDataService: SalesRepresentativeService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getRegister();
   }

   selectSalesRepresentative(sales_representative: SalesRepresentative) {
      this.sales_representativeSelected = sales_representative;
   }

   getRegister() {
      this.registers = [];
      this.registerDataService.get().then( r => {
         this.registers = r as Register[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getSalesRepresentatives();
   }

   getSalesRepresentatives() {
      this.sales_representatives = [];
      this.sales_representativeSelected = new SalesRepresentative();
      this.sales_representativeSelected.register_id = 0;
      this.sales_representativeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.sales_representatives = r.data as SalesRepresentative[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newSalesRepresentative(content) {
      this.sales_representativeSelected = new SalesRepresentative();
      this.sales_representativeSelected.register_id = 0;
      this.openDialog(content);
   }

   editSalesRepresentative(content) {
      if (typeof this.sales_representativeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteSalesRepresentative() {
      if (typeof this.sales_representativeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.sales_representativeDataService.delete(this.sales_representativeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getSalesRepresentatives();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.sales_representativeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SalesRepresentatives.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.sales_representativeDataService.get().then( r => {
         const backupData = r as SalesRepresentative[];
         let output = 'id;ruc;has_professional_degree;has_contract;has_experience;social_name;register_id\n';
         backupData.forEach(element => {
            output += element.id; + element.ruc + ';' + element.has_professional_degree + ';' + element.has_contract + ';' + element.has_experience + ';' + element.social_name + ';' + element.register_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SalesRepresentatives.csv');
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
            this.sales_representativeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.sales_representativeSelected.id === 'undefined') {
               this.sales_representativeDataService.post(this.sales_representativeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getSalesRepresentatives();
               }).catch( e => console.log(e) );
            } else {
               this.sales_representativeDataService.put(this.sales_representativeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getSalesRepresentatives();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}