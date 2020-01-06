(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{PhUt:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){return function(){}}(),o=u("pMnS"),i=u("Ip0R"),a=u("gIcY"),c=u("XgrQ"),r=u("+o/m"),d=u("JEAp"),s=u("W1ll"),g=function(){return function(){}}(),p=function(){function l(l,n,u){this.modalService=l,this.toastr=n,this.inactivation_requestDataService=u,this.inactivation_requests=[],this.inactivation_requestSelected=new g,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5}return l.prototype.ngOnInit=function(){this.goToPage(1)},l.prototype.selectInactivationRequest=function(l){this.inactivation_requestSelected=l},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getInactivationRequests())},l.prototype.getInactivationRequests=function(){var l=this;this.inactivation_requests=[],this.inactivation_requestSelected=new g,this.inactivation_requestDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.inactivation_requests=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newInactivationRequest=function(l){this.inactivation_requestSelected=new g,this.openDialog(l)},l.prototype.editInactivationRequest=function(l){void 0!==this.inactivation_requestSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteInactivationRequest=function(){var l=this;void 0!==this.inactivation_requestSelected.id?this.inactivation_requestDataService.delete(this.inactivation_requestSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getInactivationRequests()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.inactivation_requestDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),u=new Date;Object(d.saveAs)(n,u.toLocaleDateString()+"_InactivationRequests.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.inactivation_requestDataService.get().then(function(l){var n="id;ruc;ruc__code__ids;comments;contact_phone_main_number;contact_phone_seconday_number;email\n";l.forEach(function(l){n+=l.id});var u=new Blob([n],{type:"text/plain"}),t=new Date;Object(d.saveAs)(u,t.toLocaleDateString()+"_InactivationRequests.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,u=new FileReader;l.target.files&&l.target.files.length>0&&(u.readAsDataURL(l.target.files[0]),u.onload=function(){var l=u.result.toString().split(",")[1],t=JSON.parse(decodeURIComponent(escape(atob(l))));n.inactivation_requestDataService.masiveLoad(t).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0,size:"lg"}).result.then(function(l){"Guardar click"===l&&(void 0===n.inactivation_requestSelected.id?n.inactivation_requestDataService.post(n.inactivation_requestSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getInactivationRequests()}).catch(function(l){return console.log(l)}):n.inactivation_requestDataService.put(n.inactivation_requestSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getInactivationRequests()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),m=u("4GxJ"),v=u("3EpR"),f=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function h(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,15,"tr",[],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.selectInactivationRequest(l.context.$implicit)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](3,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["",""])),(l()(),t["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](7,null,["",""])),(l()(),t["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,["",""])),(l()(),t["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](11,null,["",""])),(l()(),t["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](13,null,["",""])),(l()(),t["\u0275eld"](14,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](15,null,["",""]))],function(l,n){l(n,3,0,n.component.inactivation_requestSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.ruc),l(n,7,0,n.context.$implicit.ruc__code__ids),l(n,9,0,n.context.$implicit.comments),l(n,11,0,n.context.$implicit.contact_phone_main_number),l(n,13,0,n.context.$implicit.contact_phone_seconday_number),l(n,15,0,n.context.$implicit.email)})}function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goToPage(1)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.goToPage(1*e.currentPage-1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.goToPage(1*e.currentPage+1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.goToPage(e.lastPage)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Datos:"])),(l()(),t["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.dismiss("Cross click")&&t),t},null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xd7"])),(l()(),t["\u0275eld"](6,0,null,null,62,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,61,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,60,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","ruc"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc"])),(l()(),t["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","ruc"],["name","ruc"],["placeholder","RUC"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t["\u0275nov"](l,14)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,14).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,14)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,14)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.inactivation_requestSelected.ruc=u)&&e),e},null,null)),t["\u0275did"](14,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](16,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](18,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](19,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","ruc__code__ids"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc__code__ids"])),(l()(),t["\u0275eld"](22,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,5,"ck-editor",[["id","ruc__code__ids"],["name","ruc__code__ids"],["skin","moono-lisa"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;return"ngModelChange"===n&&(t=!1!==(l.component.inactivation_requestSelected.ruc__code__ids=u)&&t),t},c.b,c.a)),t["\u0275did"](24,9158656,null,0,r.a,[t.NgZone,t.ElementRef],{skin:[0,"skin"],id:[1,"id"]},null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[r.a]),t["\u0275did"](26,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](28,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](29,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","comments"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["comments"])),(l()(),t["\u0275eld"](32,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](33,0,null,null,5,"ck-editor",[["id","comments"],["name","comments"],["skin","moono-lisa"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;return"ngModelChange"===n&&(t=!1!==(l.component.inactivation_requestSelected.comments=u)&&t),t},c.b,c.a)),t["\u0275did"](34,9158656,null,0,r.a,[t.NgZone,t.ElementRef],{skin:[0,"skin"],id:[1,"id"]},null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[r.a]),t["\u0275did"](36,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](38,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](39,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","contact_phone_main_number"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["contact_phone_main_number"])),(l()(),t["\u0275eld"](42,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](43,0,null,null,5,"input",[["class","form-control"],["id","contact_phone_main_number"],["name","contact_phone_main_number"],["placeholder","contactPhoneMainNumber"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t["\u0275nov"](l,44)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,44).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,44)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,44)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.inactivation_requestSelected.contact_phone_main_number=u)&&e),e},null,null)),t["\u0275did"](44,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](46,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](48,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](49,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","contact_phone_seconday_number"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["contact_phone_seconday_number"])),(l()(),t["\u0275eld"](52,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](53,0,null,null,5,"input",[["class","form-control"],["id","contact_phone_seconday_number"],["name","contact_phone_seconday_number"],["placeholder","contactPhoneSecondayNumber"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t["\u0275nov"](l,54)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,54).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,54)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,54)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.inactivation_requestSelected.contact_phone_seconday_number=u)&&e),e},null,null)),t["\u0275did"](54,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](56,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](58,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](59,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](60,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","email"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["email"])),(l()(),t["\u0275eld"](62,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](63,0,null,null,5,"input",[["class","form-control"],["id","email"],["name","email"],["placeholder","email"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t["\u0275nov"](l,64)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,64).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,64)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,64)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.inactivation_requestSelected.email=u)&&e),e},null,null)),t["\u0275did"](64,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](66,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](68,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](69,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](70,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Guardar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Guardar"])),(l()(),t["\u0275eld"](72,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Cancelar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var u=n.component;l(n,16,0,"ruc",u.inactivation_requestSelected.ruc),l(n,24,0,"moono-lisa","ruc__code__ids"),l(n,26,0,"ruc__code__ids",u.inactivation_requestSelected.ruc__code__ids),l(n,34,0,"moono-lisa","comments"),l(n,36,0,"comments",u.inactivation_requestSelected.comments),l(n,46,0,"contact_phone_main_number",u.inactivation_requestSelected.contact_phone_main_number),l(n,56,0,"contact_phone_seconday_number",u.inactivation_requestSelected.contact_phone_seconday_number),l(n,66,0,"email",u.inactivation_requestSelected.email)},function(l,n){l(n,13,0,t["\u0275nov"](n,18).ngClassUntouched,t["\u0275nov"](n,18).ngClassTouched,t["\u0275nov"](n,18).ngClassPristine,t["\u0275nov"](n,18).ngClassDirty,t["\u0275nov"](n,18).ngClassValid,t["\u0275nov"](n,18).ngClassInvalid,t["\u0275nov"](n,18).ngClassPending),l(n,23,0,t["\u0275nov"](n,28).ngClassUntouched,t["\u0275nov"](n,28).ngClassTouched,t["\u0275nov"](n,28).ngClassPristine,t["\u0275nov"](n,28).ngClassDirty,t["\u0275nov"](n,28).ngClassValid,t["\u0275nov"](n,28).ngClassInvalid,t["\u0275nov"](n,28).ngClassPending),l(n,33,0,t["\u0275nov"](n,38).ngClassUntouched,t["\u0275nov"](n,38).ngClassTouched,t["\u0275nov"](n,38).ngClassPristine,t["\u0275nov"](n,38).ngClassDirty,t["\u0275nov"](n,38).ngClassValid,t["\u0275nov"](n,38).ngClassInvalid,t["\u0275nov"](n,38).ngClassPending),l(n,43,0,t["\u0275nov"](n,48).ngClassUntouched,t["\u0275nov"](n,48).ngClassTouched,t["\u0275nov"](n,48).ngClassPristine,t["\u0275nov"](n,48).ngClassDirty,t["\u0275nov"](n,48).ngClassValid,t["\u0275nov"](n,48).ngClassInvalid,t["\u0275nov"](n,48).ngClassPending),l(n,53,0,t["\u0275nov"](n,58).ngClassUntouched,t["\u0275nov"](n,58).ngClassTouched,t["\u0275nov"](n,58).ngClassPristine,t["\u0275nov"](n,58).ngClassDirty,t["\u0275nov"](n,58).ngClassValid,t["\u0275nov"](n,58).ngClassInvalid,t["\u0275nov"](n,58).ngClassPending),l(n,63,0,t["\u0275nov"](n,68).ngClassUntouched,t["\u0275nov"](n,68).ngClassTouched,t["\u0275nov"](n,68).ngClassPristine,t["\u0275nov"](n,68).ngClassDirty,t["\u0275nov"](n,68).ngClassValid,t["\u0275nov"](n,68).ngClassInvalid,t["\u0275nov"](n,68).ngClassPending)})}function q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" InactivationRequest "])),(l()(),t["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.goToPage(e.currentPage)&&t),t},null,null)),(l()(),t["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.newInactivationRequest(t["\u0275nov"](l,70))&&e),e},null,null)),(l()(),t["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.editInactivationRequest(t["\u0275nov"](l,70))&&e),e},null,null)),(l()(),t["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.deleteInactivationRequest()&&t),t},null,null)),(l()(),t["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.backup()&&t),t},null,null)),(l()(),t["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.toCSV()&&t),t},null,null)),(l()(),t["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t["\u0275nov"](l,24).click()&&e),e},null,null)),(l()(),t["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,u){var t=!0;return"change"===n&&(t=!1!==l.component.decodeUploadFile(u)&&t),t},null,null)),(l()(),t["\u0275eld"](25,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,19,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,15,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](29,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Seleccionado"])),(l()(),t["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc"])),(l()(),t["\u0275eld"](34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc__code__ids"])),(l()(),t["\u0275eld"](36,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["comments"])),(l()(),t["\u0275eld"](38,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["contact_phone_main_number"])),(l()(),t["\u0275eld"](40,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["contact_phone_seconday_number"])),(l()(),t["\u0275eld"](42,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["email"])),(l()(),t["\u0275eld"](44,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](46,278528,null,0,i.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](47,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](48,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](49,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](52,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](54,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](56,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](57,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](58,null,["",""])),(l()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](60,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](62,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](64,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](65,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](66,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t["\u0275eld"](67,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.goToPage(t["\u0275nov"](l,69).value)&&e),e},null,null)),(l()(),t["\u0275ted"](-1,null,["Ir a"])),(l()(),t["\u0275eld"](69,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),t["\u0275and"](0,[["content",2]],null,0,null,k))],function(l,n){var u=n.component;l(n,46,0,u.inactivation_requests),l(n,52,0,1===u.currentPage),l(n,54,0,1!==u.currentPage),l(n,56,0,u.currentPage>1),l(n,60,0,u.currentPage<u.lastPage),l(n,62,0,u.currentPage!==u.lastPage),l(n,64,0,u.currentPage===u.lastPage)},function(l,n){var u=n.component;l(n,24,0,!0),l(n,58,0,u.currentPage),l(n,69,0,t["\u0275inlineInterpolate"](1,"",1,""),t["\u0275inlineInterpolate"](1,"",u.lastPage,""))})}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-inactivationrequest",[],null,null,null,q,f)),t["\u0275did"](1,114688,null,0,p,[m.y,v.a,s.a],null,null)],function(l,n){l(n,1,0)},null)}var w=t["\u0275ccf"]("app-inactivationrequest",p,S,{},{},[]),T=u("sE5F"),D=u("ZYCi"),x=function(){return function(){}}();u.d(n,"InactivationRequestModuleNgFactory",function(){return M});var M=t["\u0275cmf"](e,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,w]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[t.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,a.s,a.s,[]),t["\u0275mpd"](4608,m.y,m.y,[t.ComponentFactoryResolver,t.Injector,m.tb,m.z]),t["\u0275mpd"](4608,s.a,s.a,[T.e,D.l]),t["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),t["\u0275mpd"](1073742336,D.o,D.o,[[2,D.u],[2,D.l]]),t["\u0275mpd"](1073742336,x,x,[]),t["\u0275mpd"](1073742336,a.p,a.p,[]),t["\u0275mpd"](1073742336,a.e,a.e,[]),t["\u0275mpd"](1073742336,r.b,r.b,[]),t["\u0275mpd"](1073742336,e,e,[]),t["\u0275mpd"](1024,D.j,function(){return[[{path:"",component:p}]]},[])])})},XgrQ:function(l,n,u){"use strict";u.d(n,"a",function(){return e}),u.d(n,"b",function(){return o});var t=u("CcnG"),e=(u("+o/m"),u("gIcY"),t["\u0275crt"]({encapsulation:2,styles:[],data:{}}));function o(l){return t["\u0275vid"](0,[t["\u0275qud"](402653184,1,{textareaRef:0}),(l()(),t["\u0275eld"](1,0,[[1,0],["textarea",1]],null,0,"textarea",[],null,null,null,null,null))],null,null)}}}]);