(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{"8ZX2":function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),i=e("pMnS"),o=e("Ip0R"),r=e("gIcY"),s=e("JEAp"),a=e("sE5F"),c=e("AytR"),d=e("ZYCi"),g=function(){function l(l,n){this.http=l,this.router=n,this.url=c.a.api_alimentosbebidas+"registerrequisite/",this.options=new a.g,this.options.headers=new a.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return l.prototype.get=function(l){var n=this;return void 0===l?this.http.get(this.url,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())}):this.http.get(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.get_paginate=function(l,n){var e=this;return this.http.get(this.url+"paginate?size="+l.toString()+"&page="+n.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){e.handledError(l.json())})},l.prototype.delete=function(l){var n=this;return this.http.delete(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.getBackUp=function(){var l=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(l){return l.json()}).catch(function(n){l.handledError(n.json())})},l.prototype.post=function(l){var n=this;return this.http.post(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.put=function(l){var n=this;return this.http.put(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.masiveLoad=function(l){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:l}),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.handledError=function(l){console.log(l),sessionStorage.clear(),this.router.navigate(["/login"])},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(a.e),t.inject(d.l))},token:l,providedIn:"root"}),l}(),p=function(){return function(){}}(),f=e("vUqE"),h=e("GSUL"),v=function(){function l(l,n,e,t,u){this.modalService=l,this.toastr=n,this.requisiteDataService=e,this.registerDataService=t,this.register_requisiteDataService=u,this.register_requisites=[],this.register_requisiteSelected=new p,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.requisites=[],this.registers=[]}return l.prototype.ngOnInit=function(){this.goToPage(1),this.getRequisite(),this.getRegister()},l.prototype.selectRegisterRequisite=function(l){this.register_requisiteSelected=l},l.prototype.getRequisite=function(){var l=this;this.requisites=[],this.requisiteDataService.get().then(function(n){l.requisites=n}).catch(function(l){return console.log(l)})},l.prototype.getRegister=function(){var l=this;this.registers=[],this.registerDataService.get().then(function(n){l.registers=n}).catch(function(l){return console.log(l)})},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getRegisterRequisites())},l.prototype.getRegisterRequisites=function(){var l=this;this.register_requisites=[],this.register_requisiteSelected=new p,this.register_requisiteSelected.requisite_id=0,this.register_requisiteSelected.register_id=0,this.register_requisiteDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.register_requisites=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newRegisterRequisite=function(l){this.register_requisiteSelected=new p,this.register_requisiteSelected.requisite_id=0,this.register_requisiteSelected.register_id=0,this.openDialog(l)},l.prototype.editRegisterRequisite=function(l){void 0!==this.register_requisiteSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteRegisterRequisite=function(){var l=this;void 0!==this.register_requisiteSelected.id?this.register_requisiteDataService.delete(this.register_requisiteSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getRegisterRequisites()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.register_requisiteDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),e=new Date;Object(s.saveAs)(n,e.toLocaleDateString()+"_RegisterRequisites.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.register_requisiteDataService.get().then(function(l){var n="id;fullfill;value;requisite_id;register_id\n";l.forEach(function(l){n+=l.id});var e=new Blob([n],{type:"text/plain"}),t=new Date;Object(s.saveAs)(e,t.toLocaleDateString()+"_RegisterRequisites.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,e=new FileReader;l.target.files&&l.target.files.length>0&&(e.readAsDataURL(l.target.files[0]),e.onload=function(){var l=e.result.toString().split(",")[1],t=JSON.parse(decodeURIComponent(escape(atob(l))));n.register_requisiteDataService.masiveLoad(t).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0}).result.then(function(l){"Guardar click"===l&&(void 0===n.register_requisiteSelected.id?n.register_requisiteDataService.post(n.register_requisiteSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getRegisterRequisites()}).catch(function(l){return console.log(l)}):n.register_requisiteDataService.put(n.register_requisiteSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getRegisterRequisites()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),m=e("4GxJ"),b=e("3EpR"),R=t["\u0275crt"]({encapsulation:0,styles:[['.switch[_ngcontent-%COMP%]{position:relative;display:inline-block;width:60px;height:34px}.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:none}.slider[_ngcontent-%COMP%]{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s}.slider[_ngcontent-%COMP%]:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;transition:.4s}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]{background-color:#218838}input[_ngcontent-%COMP%]:focus + .slider[_ngcontent-%COMP%]{box-shadow:0 0 1px #218838}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]:before{-webkit-transform:translateX(26px);transform:translateX(26px)}.slider.round[_ngcontent-%COMP%]{border-radius:34px}.slider.round[_ngcontent-%COMP%]:before{border-radius:50%}']],data:{}});function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"tr",[],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.selectRegisterRequisite(l.context.$implicit)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](3,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["",""])),(l()(),t["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](7,null,["",""]))],function(l,n){l(n,3,0,n.component.register_requisiteSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.fullfill),l(n,7,0,n.context.$implicit.value)})}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.goToPage(1)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage-1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage+1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.lastPage)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,r.n,[t.ElementRef,t.Renderer2,[2,r.o]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,r.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,[" "," "]))],function(l,n){l(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.id)})}function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,r.n,[t.ElementRef,t.Renderer2,[2,r.o]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,r.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,[" "," "]))],function(l,n){l(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.id)})}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Datos:"])),(l()(),t["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.dismiss("Cross click")&&t),t},null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xd7"])),(l()(),t["\u0275eld"](6,0,null,null,56,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,55,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,54,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,11,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","fullfill"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["fullfill"])),(l()(),t["\u0275eld"](12,0,null,null,8,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,7,"label",[["class","switch"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,5,"input",[["id","fullfill"],["name","fullfill"],["type","checkbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var u=!0,i=l.component;return"change"===n&&(u=!1!==t["\u0275nov"](l,15).onChange(e.target.checked)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,15).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(i.register_requisiteSelected.fullfill=e)&&u),u},null,null)),t["\u0275did"](15,16384,null,0,r.b,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.b]),t["\u0275did"](17,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.i,null,[r.m]),t["\u0275did"](19,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),t["\u0275eld"](20,0,null,null,0,"span",[["class","slider round"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","value"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["value"])),(l()(),t["\u0275eld"](24,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](25,0,null,null,5,"input",[["class","form-control"],["id","value"],["name","value"],["placeholder","value"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,i=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,26)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,26).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,26)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,26)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(i.register_requisiteSelected.value=e)&&u),u},null,null)),t["\u0275did"](26,16384,null,0,r.d,[t.Renderer2,t.ElementRef,[2,r.a]],null,null),t["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.d]),t["\u0275did"](28,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.i,null,[r.m]),t["\u0275did"](30,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),t["\u0275eld"](31,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","requisite_id"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Requisite"])),(l()(),t["\u0275eld"](34,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,11,"select",[["class","form-control"],["id","requisite_id"],["name","requisite_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var u=!0,i=l.component;return"change"===n&&(u=!1!==t["\u0275nov"](l,36).onChange(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,36).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(i.register_requisiteSelected.requisite_id=e)&&u),u},null,null)),t["\u0275did"](36,16384,null,0,r.o,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.o]),t["\u0275did"](38,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.i,null,[r.m]),t["\u0275did"](40,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),t["\u0275eld"](41,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),t["\u0275did"](42,147456,null,0,r.n,[t.ElementRef,t.Renderer2,[2,r.o]],{value:[0,"value"]},null),t["\u0275did"](43,147456,null,0,r.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Seleccione..."])),(l()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](46,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](47,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](48,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","register_id"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Register"])),(l()(),t["\u0275eld"](50,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](51,0,null,null,11,"select",[["class","form-control"],["id","register_id"],["name","register_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var u=!0,i=l.component;return"change"===n&&(u=!1!==t["\u0275nov"](l,52).onChange(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,52).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(i.register_requisiteSelected.register_id=e)&&u),u},null,null)),t["\u0275did"](52,16384,null,0,r.o,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.o]),t["\u0275did"](54,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.i,null,[r.m]),t["\u0275did"](56,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),t["\u0275eld"](57,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),t["\u0275did"](58,147456,null,0,r.n,[t.ElementRef,t.Renderer2,[2,r.o]],{value:[0,"value"]},null),t["\u0275did"](59,147456,null,0,r.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Seleccione..."])),(l()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](62,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](63,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](64,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Guardar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Guardar"])),(l()(),t["\u0275eld"](66,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Cancelar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var e=n.component;l(n,17,0,"fullfill",e.register_requisiteSelected.fullfill),l(n,28,0,"value",e.register_requisiteSelected.value),l(n,38,0,"requisite_id",e.register_requisiteSelected.requisite_id),l(n,42,0,"0"),l(n,43,0,"0"),l(n,46,0,e.requisites),l(n,54,0,"register_id",e.register_requisiteSelected.register_id),l(n,58,0,"0"),l(n,59,0,"0"),l(n,62,0,e.registers)},function(l,n){l(n,14,0,t["\u0275nov"](n,19).ngClassUntouched,t["\u0275nov"](n,19).ngClassTouched,t["\u0275nov"](n,19).ngClassPristine,t["\u0275nov"](n,19).ngClassDirty,t["\u0275nov"](n,19).ngClassValid,t["\u0275nov"](n,19).ngClassInvalid,t["\u0275nov"](n,19).ngClassPending),l(n,25,0,t["\u0275nov"](n,30).ngClassUntouched,t["\u0275nov"](n,30).ngClassTouched,t["\u0275nov"](n,30).ngClassPristine,t["\u0275nov"](n,30).ngClassDirty,t["\u0275nov"](n,30).ngClassValid,t["\u0275nov"](n,30).ngClassInvalid,t["\u0275nov"](n,30).ngClassPending),l(n,35,0,t["\u0275nov"](n,40).ngClassUntouched,t["\u0275nov"](n,40).ngClassTouched,t["\u0275nov"](n,40).ngClassPristine,t["\u0275nov"](n,40).ngClassDirty,t["\u0275nov"](n,40).ngClassValid,t["\u0275nov"](n,40).ngClassInvalid,t["\u0275nov"](n,40).ngClassPending),l(n,51,0,t["\u0275nov"](n,56).ngClassUntouched,t["\u0275nov"](n,56).ngClassTouched,t["\u0275nov"](n,56).ngClassPristine,t["\u0275nov"](n,56).ngClassDirty,t["\u0275nov"](n,56).ngClassValid,t["\u0275nov"](n,56).ngClassInvalid,t["\u0275nov"](n,56).ngClassPending)})}function O(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" RegisterRequisite "])),(l()(),t["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.currentPage)&&t),t},null,null)),(l()(),t["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.newRegisterRequisite(t["\u0275nov"](l,62))&&u),u},null,null)),(l()(),t["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.editRegisterRequisite(t["\u0275nov"](l,62))&&u),u},null,null)),(l()(),t["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.deleteRegisterRequisite()&&t),t},null,null)),(l()(),t["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.backup()&&t),t},null,null)),(l()(),t["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toCSV()&&t),t},null,null)),(l()(),t["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,24).click()&&u),u},null,null)),(l()(),t["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.decodeUploadFile(e)&&t),t},null,null)),(l()(),t["\u0275eld"](25,0,null,null,13,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,12,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,11,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](29,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Seleccionado"])),(l()(),t["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["fullfill"])),(l()(),t["\u0275eld"](34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["value"])),(l()(),t["\u0275eld"](36,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](38,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](39,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](41,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](42,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](44,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](46,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](48,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](49,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](50,null,["",""])),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](52,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](54,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](56,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](57,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](58,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t["\u0275eld"](59,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(t["\u0275nov"](l,61).value)&&u),u},null,null)),(l()(),t["\u0275ted"](-1,null,["Ir a"])),(l()(),t["\u0275eld"](61,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),t["\u0275and"](0,[["content",2]],null,0,null,x))],function(l,n){var e=n.component;l(n,38,0,e.register_requisites),l(n,44,0,1===e.currentPage),l(n,46,0,1!==e.currentPage),l(n,48,0,e.currentPage>1),l(n,52,0,e.currentPage<e.lastPage),l(n,54,0,e.currentPage!==e.lastPage),l(n,56,0,e.currentPage===e.lastPage)},function(l,n){var e=n.component;l(n,24,0,!0),l(n,50,0,e.currentPage),l(n,61,0,t["\u0275inlineInterpolate"](1,"",1,""),t["\u0275inlineInterpolate"](1,"",e.lastPage,""))})}function T(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-registerrequisite",[],null,null,null,O,R)),t["\u0275did"](1,114688,null,0,v,[m.y,b.a,f.a,h.a,g],null,null)],function(l,n){l(n,1,0)},null)}var D=t["\u0275ccf"]("app-registerrequisite",v,T,{},{},[]),j=function(){return function(){}}();e.d(n,"RegisterRequisiteModuleNgFactory",function(){return M});var M=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,D]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,o.NgLocalization,o.NgLocaleLocalization,[t.LOCALE_ID,[2,o["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,r.s,r.s,[]),t["\u0275mpd"](4608,m.y,m.y,[t.ComponentFactoryResolver,t.Injector,m.tb,m.z]),t["\u0275mpd"](4608,f.a,f.a,[a.e,d.l]),t["\u0275mpd"](4608,h.a,h.a,[a.e,d.l]),t["\u0275mpd"](4608,g,g,[a.e,d.l]),t["\u0275mpd"](1073742336,o.CommonModule,o.CommonModule,[]),t["\u0275mpd"](1073742336,d.o,d.o,[[2,d.u],[2,d.l]]),t["\u0275mpd"](1073742336,j,j,[]),t["\u0275mpd"](1073742336,r.p,r.p,[]),t["\u0275mpd"](1073742336,r.e,r.e,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,d.j,function(){return[[{path:"",component:v}]]},[])])})},B9Yq:function(l,n){l.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(l,n,e){var t,u=u||function(l){"use strict";if(!(void 0===l||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var n=function(){return l.URL||l.webkitURL||l},e=l.document.createElementNS("http://www.w3.org/1999/xhtml","a"),t="download"in e,u=/constructor/i.test(l.HTMLElement)||l.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent),o=function(n){(l.setImmediate||l.setTimeout)(function(){throw n},0)},r=function(l){setTimeout(function(){"string"==typeof l?n().revokeObjectURL(l):l.remove()},4e4)},s=function(l){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob([String.fromCharCode(65279),l],{type:l.type}):l},a=function(a,c,d){d||(a=s(a));var g,p=this,f="application/octet-stream"===a.type,h=function(){!function(l,n,e){for(var t=(n=[].concat(n)).length;t--;){var u=l["on"+n[t]];if("function"==typeof u)try{u.call(l,l)}catch(i){o(i)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,t)return g=n().createObjectURL(a),void setTimeout(function(){var l,n;e.href=g,e.download=c,l=e,n=new MouseEvent("click"),l.dispatchEvent(n),h(),r(g),p.readyState=p.DONE});!function(){if((i||f&&u)&&l.FileReader){var e=new FileReader;return e.onloadend=function(){var n=i?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");l.open(n,"_blank")||(l.location.href=n),n=void 0,p.readyState=p.DONE,h()},e.readAsDataURL(a),void(p.readyState=p.INIT)}g||(g=n().createObjectURL(a)),f?l.location.href=g:l.open(g,"_blank")||(l.location.href=g),p.readyState=p.DONE,h(),r(g)}()},c=a.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(l,n,e){return n=n||l.name||"download",e||(l=s(l)),navigator.msSaveOrOpenBlob(l,n)}:(c.abort=function(){},c.readyState=c.INIT=0,c.WRITING=1,c.DONE=2,c.error=c.onwritestart=c.onprogress=c.onwrite=c.onabort=c.onerror=c.onwriteend=null,function(l,n,e){return new a(l,n||l.name||"download",e)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);l.exports?l.exports.saveAs=u:null!==e("B9Yq")&&null!==e("PDX0")&&(void 0===(t=(function(){return u}).call(n,e,n,l))||(l.exports=t))},PDX0:function(l,n){(function(n){l.exports=n}).call(this,{})}}]);