(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{XgrQ:function(l,n,u){"use strict";u.d(n,"a",function(){return t}),u.d(n,"b",function(){return o});var e=u("CcnG"),t=(u("+o/m"),u("gIcY"),e["\u0275crt"]({encapsulation:2,styles:[],data:{}}));function o(l){return e["\u0275vid"](0,[e["\u0275qud"](402653184,1,{textareaRef:0}),(l()(),e["\u0275eld"](1,0,[[1,0],["textarea",1]],null,0,"textarea",[],null,null,null,null,null))],null,null)}},Yx6d:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=function(){return function(){}}(),o=u("pMnS"),i=u("Ip0R"),r=u("gIcY"),a=u("XgrQ"),c=u("+o/m"),d=u("JEAp"),s=u("whD1"),p=function(){return function(){}}(),g=function(){function l(l,n,u){this.modalService=l,this.toastr=n,this.reportDataService=u,this.reports=[],this.reportSelected=new p,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5}return l.prototype.ngOnInit=function(){this.goToPage(1)},l.prototype.selectReport=function(l){this.reportSelected=l},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getReports())},l.prototype.getReports=function(){var l=this;this.reports=[],this.reportSelected=new p,this.reportDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.reports=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newReport=function(l){this.reportSelected=new p,this.openDialog(l)},l.prototype.editReport=function(l){void 0!==this.reportSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteReport=function(){var l=this;void 0!==this.reportSelected.id?this.reportDataService.delete(this.reportSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getReports()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.reportDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),u=new Date;Object(d.saveAs)(n,u.toLocaleDateString()+"_Reports.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.reportDataService.get().then(function(l){var n="id;id_register;date;comment;id_ubication;id_user\n";l.forEach(function(l){n+=l.id});var u=new Blob([n],{type:"text/plain"}),e=new Date;Object(d.saveAs)(u,e.toLocaleDateString()+"_Reports.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,u=new FileReader;l.target.files&&l.target.files.length>0&&(u.readAsDataURL(l.target.files[0]),u.onload=function(){var l=u.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(l))));n.reportDataService.masiveLoad(e).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0,size:"lg"}).result.then(function(l){"Guardar click"===l&&(void 0===n.reportSelected.id?n.reportDataService.post(n.reportSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getReports()}).catch(function(l){return console.log(l)}):n.reportDataService.put(n.reportSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getReports()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),m=u("4GxJ"),v=u("3EpR"),f=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,13,"tr",[],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.selectReport(l.context.$implicit)&&e),e},null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,h)),e["\u0275did"](3,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""])),(l()(),e["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](7,null,["",""])),(l()(),e["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](11,null,["",""])),(l()(),e["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](13,null,["",""]))],function(l,n){l(n,3,0,n.component.reportSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.id_register),l(n,7,0,n.context.$implicit.date),l(n,9,0,n.context.$implicit.comment),l(n,11,0,n.context.$implicit.id_ubication),l(n,13,0,n.context.$implicit.id_user)})}function C(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.goToPage(1)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0,t=l.component;return"click"===n&&(e=!1!==t.goToPage(1*t.currentPage-1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function P(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0,t=l.component;return"click"===n&&(e=!1!==t.goToPage(1*t.currentPage+1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function _(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0,t=l.component;return"click"===n&&(e=!1!==t.goToPage(t.lastPage)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Datos:"])),(l()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xd7"])),(l()(),e["\u0275eld"](6,0,null,null,56,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,55,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,54,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","id_register"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_register"])),(l()(),e["\u0275eld"](12,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,6,"input",[["class","form-control"],["id","id_register"],["name","id_register"],["placeholder","idRegister"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,14)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,14).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,14)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,14)._compositionEnd(u.target.value)&&t),"change"===n&&(t=!1!==e["\u0275nov"](l,15).onChange(u.target.value)&&t),"input"===n&&(t=!1!==e["\u0275nov"](l,15).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,15).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.reportSelected.id_register=u)&&t),t},null,null)),e["\u0275did"](14,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275did"](15,16384,null,0,r.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l,n){return[l,n]},[r.d,r.q]),e["\u0275did"](17,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](19,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](20,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](21,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","date"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["date"])),(l()(),e["\u0275eld"](23,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,6,"input",[["class","form-control"],["id","date"],["name","date"],["placeholder","date"],["type","date"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,25)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,25).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,25)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,25)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.reportSelected.date=u)&&t),t},null,null)),e["\u0275did"](25,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.d]),e["\u0275did"](27,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275ppd"](28,2),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](30,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](31,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](32,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","comment"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["comment"])),(l()(),e["\u0275eld"](34,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](35,0,null,null,5,"ck-editor",[["id","comment"],["name","comment"],["skin","moono-lisa"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var e=!0;return"ngModelChange"===n&&(e=!1!==(l.component.reportSelected.comment=u)&&e),e},a.b,a.a)),e["\u0275did"](36,9158656,null,0,c.a,[e.NgZone,e.ElementRef],{skin:[0,"skin"],id:[1,"id"]},null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[c.a]),e["\u0275did"](38,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](40,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](41,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](42,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","id_ubication"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_ubication"])),(l()(),e["\u0275eld"](44,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,6,"input",[["class","form-control"],["id","id_ubication"],["name","id_ubication"],["placeholder","idUbication"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,46)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,46).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,46)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,46)._compositionEnd(u.target.value)&&t),"change"===n&&(t=!1!==e["\u0275nov"](l,47).onChange(u.target.value)&&t),"input"===n&&(t=!1!==e["\u0275nov"](l,47).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,47).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.reportSelected.id_ubication=u)&&t),t},null,null)),e["\u0275did"](46,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275did"](47,16384,null,0,r.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l,n){return[l,n]},[r.d,r.q]),e["\u0275did"](49,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](51,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](52,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](53,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","id_user"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_user"])),(l()(),e["\u0275eld"](55,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](56,0,null,null,6,"input",[["class","form-control"],["id","id_user"],["name","id_user"],["placeholder","idUser"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,57)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,57).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,57)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,57)._compositionEnd(u.target.value)&&t),"change"===n&&(t=!1!==e["\u0275nov"](l,58).onChange(u.target.value)&&t),"input"===n&&(t=!1!==e["\u0275nov"](l,58).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,58).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.reportSelected.id_user=u)&&t),t},null,null)),e["\u0275did"](57,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275did"](58,16384,null,0,r.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l,n){return[l,n]},[r.d,r.q]),e["\u0275did"](60,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](62,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](63,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),e["\u0275eld"](64,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Guardar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Guardar"])),(l()(),e["\u0275eld"](66,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Cancelar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var u=n.component;l(n,17,0,"id_register",u.reportSelected.id_register);var t=e["\u0275unv"](n,27,1,l(n,28,0,e["\u0275nov"](n.parent,0),u.reportSelected.date,"y-MM-dd"));l(n,27,0,"date",t),l(n,36,0,"moono-lisa","comment"),l(n,38,0,"comment",u.reportSelected.comment),l(n,49,0,"id_ubication",u.reportSelected.id_ubication),l(n,60,0,"id_user",u.reportSelected.id_user)},function(l,n){l(n,13,0,e["\u0275nov"](n,19).ngClassUntouched,e["\u0275nov"](n,19).ngClassTouched,e["\u0275nov"](n,19).ngClassPristine,e["\u0275nov"](n,19).ngClassDirty,e["\u0275nov"](n,19).ngClassValid,e["\u0275nov"](n,19).ngClassInvalid,e["\u0275nov"](n,19).ngClassPending),l(n,24,0,e["\u0275nov"](n,30).ngClassUntouched,e["\u0275nov"](n,30).ngClassTouched,e["\u0275nov"](n,30).ngClassPristine,e["\u0275nov"](n,30).ngClassDirty,e["\u0275nov"](n,30).ngClassValid,e["\u0275nov"](n,30).ngClassInvalid,e["\u0275nov"](n,30).ngClassPending),l(n,35,0,e["\u0275nov"](n,40).ngClassUntouched,e["\u0275nov"](n,40).ngClassTouched,e["\u0275nov"](n,40).ngClassPristine,e["\u0275nov"](n,40).ngClassDirty,e["\u0275nov"](n,40).ngClassValid,e["\u0275nov"](n,40).ngClassInvalid,e["\u0275nov"](n,40).ngClassPending),l(n,45,0,e["\u0275nov"](n,51).ngClassUntouched,e["\u0275nov"](n,51).ngClassTouched,e["\u0275nov"](n,51).ngClassPristine,e["\u0275nov"](n,51).ngClassDirty,e["\u0275nov"](n,51).ngClassValid,e["\u0275nov"](n,51).ngClassInvalid,e["\u0275nov"](n,51).ngClassPending),l(n,56,0,e["\u0275nov"](n,62).ngClassUntouched,e["\u0275nov"](n,62).ngClassTouched,e["\u0275nov"](n,62).ngClassPristine,e["\u0275nov"](n,62).ngClassDirty,e["\u0275nov"](n,62).ngClassValid,e["\u0275nov"](n,62).ngClassInvalid,e["\u0275nov"](n,62).ngClassPending)})}function I(l){return e["\u0275vid"](0,[e["\u0275pid"](0,i.DatePipe,[e.LOCALE_ID]),(l()(),e["\u0275eld"](1,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Report "])),(l()(),e["\u0275eld"](4,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0,t=l.component;return"click"===n&&(e=!1!==t.goToPage(t.currentPage)&&e),e},null,null)),(l()(),e["\u0275eld"](9,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.newReport(e["\u0275nov"](l,69))&&t),t},null,null)),(l()(),e["\u0275eld"](12,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.editReport(e["\u0275nov"](l,69))&&t),t},null,null)),(l()(),e["\u0275eld"](14,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.deleteReport()&&e),e},null,null)),(l()(),e["\u0275eld"](17,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.backup()&&e),e},null,null)),(l()(),e["\u0275eld"](20,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),e["\u0275eld"](21,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.toCSV()&&e),e},null,null)),(l()(),e["\u0275eld"](22,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,25).click()&&t),t},null,null)),(l()(),e["\u0275eld"](24,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),e["\u0275eld"](25,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,u){var e=!0;return"change"===n&&(e=!1!==l.component.decodeUploadFile(u)&&e),e},null,null)),(l()(),e["\u0275eld"](26,0,null,null,19,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,18,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](28,0,null,null,17,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](29,0,null,null,13,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Seleccionado"])),(l()(),e["\u0275eld"](33,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_register"])),(l()(),e["\u0275eld"](35,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["date"])),(l()(),e["\u0275eld"](37,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["comment"])),(l()(),e["\u0275eld"](39,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_ubication"])),(l()(),e["\u0275eld"](41,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["id_user"])),(l()(),e["\u0275eld"](43,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](45,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](46,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](47,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](48,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](49,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](51,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](53,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](55,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](56,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](57,null,["",""])),(l()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](59,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](61,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,k)),e["\u0275did"](63,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](64,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](65,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),e["\u0275eld"](66,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goToPage(e["\u0275nov"](l,68).value)&&t),t},null,null)),(l()(),e["\u0275ted"](-1,null,["Ir a"])),(l()(),e["\u0275eld"](68,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),e["\u0275and"](0,[["content",2]],null,0,null,S))],function(l,n){var u=n.component;l(n,45,0,u.reports),l(n,51,0,1===u.currentPage),l(n,53,0,1!==u.currentPage),l(n,55,0,u.currentPage>1),l(n,59,0,u.currentPage<u.lastPage),l(n,61,0,u.currentPage!==u.lastPage),l(n,63,0,u.currentPage===u.lastPage)},function(l,n){var u=n.component;l(n,25,0,!0),l(n,57,0,u.currentPage),l(n,68,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",u.lastPage,""))})}function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-report",[],null,null,null,I,f)),e["\u0275did"](1,114688,null,0,g,[m.y,v.a,s.a],null,null)],function(l,n){l(n,1,0)},null)}var T=e["\u0275ccf"]("app-report",g,w,{},{},[]),D=u("sE5F"),E=u("ZYCi"),x=function(){return function(){}}();u.d(n,"ReportModuleNgFactory",function(){return M});var M=e["\u0275cmf"](t,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,T]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[e.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,r.s,r.s,[]),e["\u0275mpd"](4608,m.y,m.y,[e.ComponentFactoryResolver,e.Injector,m.tb,m.z]),e["\u0275mpd"](4608,s.a,s.a,[D.e,E.l]),e["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),e["\u0275mpd"](1073742336,E.o,E.o,[[2,E.u],[2,E.l]]),e["\u0275mpd"](1073742336,x,x,[]),e["\u0275mpd"](1073742336,r.p,r.p,[]),e["\u0275mpd"](1073742336,r.e,r.e,[]),e["\u0275mpd"](1073742336,c.b,c.b,[]),e["\u0275mpd"](1073742336,t,t,[]),e["\u0275mpd"](1024,E.j,function(){return[[{path:"",component:g}]]},[])])})}}]);