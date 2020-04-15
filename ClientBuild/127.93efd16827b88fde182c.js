(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{"3V+q":function(l,n,t){"use strict";t.d(n,"a",function(){return i});var u=t("sE5F"),e=t("AytR"),o=t("CcnG"),a=t("ZYCi"),i=function(){function l(l,n){this.http=l,this.router=n,this.url=e.a.api_base+"taxpayertype/",this.options=new u.g,this.options.headers=new u.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return l.prototype.get=function(l){var n=this;return void 0===l?this.http.get(this.url,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())}):this.http.get(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.get_paginate=function(l,n){var t=this;return this.http.get(this.url+"paginate?size="+l.toString()+"&page="+n.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){t.handledError(l.json())})},l.prototype.delete=function(l){var n=this;return this.http.delete(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.getBackUp=function(){var l=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(l){return l.json()}).catch(function(n){l.handledError(n.json())})},l.prototype.post=function(l){var n=this;return this.http.post(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.put=function(l){var n=this;return this.http.put(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.masiveLoad=function(l){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:l}),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.handledError=function(l){console.log(l),sessionStorage.clear(),this.router.navigate(["/login"])},l.ngInjectableDef=o.defineInjectable({factory:function(){return new l(o.inject(u.e),o.inject(a.l))},token:l,providedIn:"root"}),l}()},AkLy:function(l,n,t){"use strict";t.r(n);var u=t("CcnG"),e=function(){return function(){}}(),o=t("pMnS"),a=t("Ip0R"),i=t("gIcY"),r=t("XgrQ"),c=t("+o/m"),s=t("JEAp"),d=t("3V+q"),p=function(){return function(){}}(),g=function(){function l(l,n,t){this.modalService=l,this.toastr=n,this.tax_payer_typeDataService=t,this.tax_payer_types=[],this.tax_payer_typeSelected=new p,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5}return l.prototype.ngOnInit=function(){this.goToPage(1)},l.prototype.selectTaxPayerType=function(l){this.tax_payer_typeSelected=l},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getTaxPayerTypes())},l.prototype.getTaxPayerTypes=function(){var l=this;this.tax_payer_types=[],this.tax_payer_typeSelected=new p,this.tax_payer_typeDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.tax_payer_types=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newTaxPayerType=function(l){this.tax_payer_typeSelected=new p,this.openDialog(l)},l.prototype.editTaxPayerType=function(l){void 0!==this.tax_payer_typeSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteTaxPayerType=function(){var l=this;void 0!==this.tax_payer_typeSelected.id?this.tax_payer_typeDataService.delete(this.tax_payer_typeSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getTaxPayerTypes()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.tax_payer_typeDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),t=new Date;Object(s.saveAs)(n,t.toLocaleDateString()+"_TaxPayerTypes.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.tax_payer_typeDataService.get().then(function(l){var n="id;name;description\n";l.forEach(function(l){n+=l.id+";"+l.name+";"+l.description+"\n"});var t=new Blob(["\ufeff",n],{type:"text/plain"}),u=new Date;Object(s.saveAs)(t,u.toLocaleDateString()+"_TaxPayerTypes.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,t=new FileReader;l.target.files&&l.target.files.length>0&&(t.readAsDataURL(l.target.files[0]),t.onload=function(){var l=t.result.toString().split(",")[1],u=JSON.parse(decodeURIComponent(escape(atob(l))));n.tax_payer_typeDataService.masiveLoad(u).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0,size:"lg"}).result.then(function(l){"Guardar click"===l&&(void 0===n.tax_payer_typeSelected.id?n.tax_payer_typeDataService.post(n.tax_payer_typeSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getTaxPayerTypes()}).catch(function(l){return console.log(l)}):n.tax_payer_typeDataService.put(n.tax_payer_typeSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getTaxPayerTypes()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),f=t("4GxJ"),h=t("3EpR"),y=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function m(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function v(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,6,"tr",[],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.selectTaxPayerType(l.context.$implicit)&&u),u},null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,m)),u["\u0275did"](3,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u["\u0275ted"](5,null,["",""])),(l()(),u["\u0275eld"](6,0,null,null,0,"td",[],[[8,"innerHTML",1]],null,null,null,null))],function(l,n){l(n,3,0,n.component.tax_payer_typeSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.name),l(n,6,0,n.context.$implicit.description)})}function b(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Primera"]))],null,null)}function P(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(1)&&u),u},null,null)),(l()(),u["\u0275ted"](-1,null,["Primera"]))],null,null)}function _(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0,e=l.component;return"click"===n&&(u=!1!==e.goToPage(1*e.currentPage-1)&&u),u},null,null)),(l()(),u["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function x(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0,e=l.component;return"click"===n&&(u=!1!==e.goToPage(1*e.currentPage+1)&&u),u},null,null)),(l()(),u["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function T(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0,e=l.component;return"click"===n&&(u=!1!==e.goToPage(e.lastPage)&&u),u},null,null)),(l()(),u["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function C(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Datos:"])),(l()(),u["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.context.$implicit.dismiss("Cross click")&&u),u},null,null)),(l()(),u["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\xd7"])),(l()(),u["\u0275eld"](6,0,null,null,22,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","name"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Nombre"])),(l()(),u["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),u["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","name"],["name","name"],["placeholder","Nombre"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var e=!0,o=l.component;return"input"===n&&(e=!1!==u["\u0275nov"](l,14)._handleInput(t.target.value)&&e),"blur"===n&&(e=!1!==u["\u0275nov"](l,14).onTouched()&&e),"compositionstart"===n&&(e=!1!==u["\u0275nov"](l,14)._compositionStart()&&e),"compositionend"===n&&(e=!1!==u["\u0275nov"](l,14)._compositionEnd(t.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.tax_payer_typeSelected.name=t)&&e),e},null,null)),u["\u0275did"](14,16384,null,0,i.d,[u.Renderer2,u.ElementRef,[2,i.a]],null,null),u["\u0275prd"](1024,null,i.h,function(l){return[l]},[i.d]),u["\u0275did"](16,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,i.i,null,[i.m]),u["\u0275did"](18,16384,null,0,i.j,[[4,i.i]],null,null),(l()(),u["\u0275eld"](19,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","description"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Descripci\xf3n"])),(l()(),u["\u0275eld"](22,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,5,"ck-editor",[["id","description"],["name","description"],["skin","moono-lisa"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,t){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.tax_payer_typeSelected.description=t)&&u),u},r.b,r.a)),u["\u0275did"](24,9158656,null,0,c.a,[u.NgZone,u.ElementRef],{skin:[0,"skin"],id:[1,"id"]},null),u["\u0275prd"](1024,null,i.h,function(l){return[l]},[c.a]),u["\u0275did"](26,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,i.i,null,[i.m]),u["\u0275did"](28,16384,null,0,i.j,[[4,i.i]],null,null),(l()(),u["\u0275eld"](29,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),u["\u0275eld"](30,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.context.$implicit.close("Guardar click")&&u),u},null,null)),(l()(),u["\u0275ted"](-1,null,["Guardar"])),(l()(),u["\u0275eld"](32,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.context.$implicit.close("Cancelar click")&&u),u},null,null)),(l()(),u["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var t=n.component;l(n,16,0,"name",t.tax_payer_typeSelected.name),l(n,24,0,"moono-lisa","description"),l(n,26,0,"description",t.tax_payer_typeSelected.description)},function(l,n){l(n,13,0,u["\u0275nov"](n,18).ngClassUntouched,u["\u0275nov"](n,18).ngClassTouched,u["\u0275nov"](n,18).ngClassPristine,u["\u0275nov"](n,18).ngClassDirty,u["\u0275nov"](n,18).ngClassValid,u["\u0275nov"](n,18).ngClassInvalid,u["\u0275nov"](n,18).ngClassPending),l(n,23,0,u["\u0275nov"](n,28).ngClassUntouched,u["\u0275nov"](n,28).ngClassTouched,u["\u0275nov"](n,28).ngClassPristine,u["\u0275nov"](n,28).ngClassDirty,u["\u0275nov"](n,28).ngClassValid,u["\u0275nov"](n,28).ngClassInvalid,u["\u0275nov"](n,28).ngClassPending)})}function S(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Tipos de Contribuyente "])),(l()(),u["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0,e=l.component;return"click"===n&&(u=!1!==e.goToPage(e.currentPage)&&u),u},null,null)),(l()(),u["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.newTaxPayerType(u["\u0275nov"](l,62))&&e),e},null,null)),(l()(),u["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),u["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.editTaxPayerType(u["\u0275nov"](l,62))&&e),e},null,null)),(l()(),u["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.deleteTaxPayerType()&&u),u},null,null)),(l()(),u["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.backup()&&u),u},null,null)),(l()(),u["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),u["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.toCSV()&&u),u},null,null)),(l()(),u["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),u["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==u["\u0275nov"](l,24).click()&&e),e},null,null)),(l()(),u["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),u["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,t){var u=!0;return"change"===n&&(u=!1!==l.component.decodeUploadFile(t)&&u),u},null,null)),(l()(),u["\u0275eld"](25,0,null,null,13,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](26,0,null,null,12,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](27,0,null,null,11,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](28,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),u["\u0275eld"](29,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),u["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Seleccionado"])),(l()(),u["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Nombre"])),(l()(),u["\u0275eld"](34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Descripci\xf3n"])),(l()(),u["\u0275eld"](36,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,v)),u["\u0275did"](38,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275eld"](39,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](40,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](41,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),u["\u0275eld"](42,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,b)),u["\u0275did"](44,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,P)),u["\u0275did"](46,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,_)),u["\u0275did"](48,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](49,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),u["\u0275ted"](50,null,["",""])),(l()(),u["\u0275and"](16777216,null,null,1,null,x)),u["\u0275did"](52,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,T)),u["\u0275did"](54,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,k)),u["\u0275did"](56,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](57,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](58,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),u["\u0275eld"](59,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.goToPage(u["\u0275nov"](l,61).value)&&e),e},null,null)),(l()(),u["\u0275ted"](-1,null,["Ir a"])),(l()(),u["\u0275eld"](61,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),u["\u0275and"](0,[["content",2]],null,0,null,C))],function(l,n){var t=n.component;l(n,38,0,t.tax_payer_types),l(n,44,0,1===t.currentPage),l(n,46,0,1!==t.currentPage),l(n,48,0,t.currentPage>1),l(n,52,0,t.currentPage<t.lastPage),l(n,54,0,t.currentPage!==t.lastPage),l(n,56,0,t.currentPage===t.lastPage)},function(l,n){var t=n.component;l(n,24,0,!0),l(n,50,0,t.currentPage),l(n,61,0,u["\u0275inlineInterpolate"](1,"",1,""),u["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function I(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-taxpayertype",[],null,null,null,S,y)),u["\u0275did"](1,114688,null,0,g,[f.y,h.a,d.a],null,null)],function(l,n){l(n,1,0)},null)}var w=u["\u0275ccf"]("app-taxpayertype",g,I,{},{},[]),R=t("sE5F"),j=t("ZYCi"),D=function(){return function(){}}();t.d(n,"TaxPayerTypeModuleNgFactory",function(){return E});var E=u["\u0275cmf"](e,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,w]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[u.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,i.s,i.s,[]),u["\u0275mpd"](4608,f.y,f.y,[u.ComponentFactoryResolver,u.Injector,f.tb,f.z]),u["\u0275mpd"](4608,d.a,d.a,[R.e,j.l]),u["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),u["\u0275mpd"](1073742336,j.o,j.o,[[2,j.u],[2,j.l]]),u["\u0275mpd"](1073742336,D,D,[]),u["\u0275mpd"](1073742336,i.p,i.p,[]),u["\u0275mpd"](1073742336,i.e,i.e,[]),u["\u0275mpd"](1073742336,c.b,c.b,[]),u["\u0275mpd"](1073742336,e,e,[]),u["\u0275mpd"](1024,j.j,function(){return[[{path:"",component:g}]]},[])])})},XgrQ:function(l,n,t){"use strict";t.d(n,"a",function(){return e}),t.d(n,"b",function(){return o});var u=t("CcnG"),e=(t("+o/m"),t("gIcY"),u["\u0275crt"]({encapsulation:2,styles:[],data:{}}));function o(l){return u["\u0275vid"](0,[u["\u0275qud"](402653184,1,{textareaRef:0}),(l()(),u["\u0275eld"](1,0,[[1,0],["textarea",1]],null,0,"textarea",[],null,null,null,null,null))],null,null)}}}]);