(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"1gwp":function(n,l,t){"use strict";t.r(l);var e=t("CcnG"),u=function(){return function(){}}(),o=t("pMnS"),i=t("Ip0R"),a=t("gIcY"),r=t("JEAp"),c=t("sE5F"),s=t("AytR"),d=t("ZYCi"),h=function(){function n(n,l){this.http=n,this.router=l,this.url=s.a.api_alimentosbebidas+"authorizationattachment/",this.options=new c.g,this.options.headers=new c.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=e.defineInjectable({factory:function(){return new n(e.inject(c.e),e.inject(d.l))},token:n,providedIn:"root"}),n}(),p=function(){return function(){}}(),f=t("GSUL"),g=function(){function n(n,l,t,e){this.modalService=n,this.toastr=l,this.registerDataService=t,this.authorization_attachmentDataService=e,this.authorization_attachments=[],this.authorization_attachmentSelected=new p,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.registers=[]}return n.prototype.ngOnInit=function(){this.goToPage(1),this.getRegister()},n.prototype.CodeFileAuthorizationAttachment=function(n){var l=this,t=new FileReader;if(n.target.files&&n.target.files.length>0){var e=n.target.files[0];t.readAsDataURL(e),t.onload=function(){l.authorization_attachmentSelected.authorization_attachment_file_name=e.name,l.authorization_attachmentSelected.authorization_attachment_file_type=e.type,l.authorization_attachmentSelected.authorization_attachment_file=t.result.toString().split(",")[1]}}},n.prototype.selectAuthorizationAttachment=function(n){this.authorization_attachmentSelected=n},n.prototype.getRegister=function(){var n=this;this.registers=[],this.registerDataService.get().then(function(l){n.registers=l}).catch(function(n){return console.log(n)})},n.prototype.goToPage=function(n){n<1||n>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=n,this.getAuthorizationAttachments())},n.prototype.getAuthorizationAttachments=function(){var n=this;this.authorization_attachments=[],this.authorization_attachmentSelected=new p,this.authorization_attachmentSelected.register_id=0,this.authorization_attachmentDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(l){n.authorization_attachments=l.data,n.lastPage=l.last_page}).catch(function(n){return console.log(n)})},n.prototype.newAuthorizationAttachment=function(n){this.authorization_attachmentSelected=new p,this.authorization_attachmentSelected.register_id=0,this.openDialog(n)},n.prototype.editAuthorizationAttachment=function(n){void 0!==this.authorization_attachmentSelected.id?this.openDialog(n):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.deleteAuthorizationAttachment=function(){var n=this;void 0!==this.authorization_attachmentSelected.id?this.authorization_attachmentDataService.delete(this.authorization_attachmentSelected.id).then(function(l){n.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),n.getAuthorizationAttachments()}).catch(function(n){return console.log(n)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.backup=function(){this.authorization_attachmentDataService.getBackUp().then(function(n){var l=new Blob([JSON.stringify(n)],{type:"text/plain"}),t=new Date;Object(r.saveAs)(l,t.toLocaleDateString()+"_AuthorizationAttachments.json")}).catch(function(n){return console.log(n)})},n.prototype.toCSV=function(){this.authorization_attachmentDataService.get().then(function(n){var l="id;authorization_attachment_file_type;authorization_attachment_file_name;authorization_attachment_file;register_id\n";n.forEach(function(n){l+=n.id});var t=new Blob([l],{type:"text/plain"}),e=new Date;Object(r.saveAs)(t,e.toLocaleDateString()+"_AuthorizationAttachments.csv")}).catch(function(n){return console.log(n)})},n.prototype.decodeUploadFile=function(n){var l=this,t=new FileReader;n.target.files&&n.target.files.length>0&&(t.readAsDataURL(n.target.files[0]),t.onload=function(){var n=t.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(n))));l.authorization_attachmentDataService.masiveLoad(e).then(function(n){l.goToPage(l.currentPage)}).catch(function(n){return console.log(n)})})},n.prototype.downloadFile=function(n,l,t){for(var e=atob(n),u=new Array(e.length),o=0;o<e.length;o++)u[o]=e.charCodeAt(o);var i=new Uint8Array(u),a=new Blob([i],{type:l});Object(r.saveAs)(a,t)},n.prototype.openDialog=function(n){var l=this;this.modalService.open(n,{centered:!0,size:"lg"}).result.then(function(n){"Guardar click"===n&&(void 0===l.authorization_attachmentSelected.id?l.authorization_attachmentDataService.post(l.authorization_attachmentSelected).then(function(n){l.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),l.getAuthorizationAttachments()}).catch(function(n){return console.log(n)}):l.authorization_attachmentDataService.put(l.authorization_attachmentSelected).then(function(n){l.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),l.getAuthorizationAttachments()}).catch(function(n){return console.log(n)}))},function(n){})},n}(),m=t("4GxJ"),v=t("3EpR"),_=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function b(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function y(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,12,"tr",[],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.selectAuthorizationAttachment(n.context.$implicit)&&e),e},null,null)),(n()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](3,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),e["\u0275ted"](5,null,["",""])),(n()(),e["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),e["\u0275ted"](7,null,["",""])),(n()(),e["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),e["\u0275ted"](9,null,["",""])),(n()(),e["\u0275eld"](10,0,null,null,2,"th",[],null,null,null,null,null)),(n()(),e["\u0275eld"](11,0,null,null,1,"button",[["class","btn btn-success"],["title","Descargar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.downloadFile(n.context.$implicit.authorization_attachment_file,n.context.$implicit.authorization_attachment_file_type,n.context.$implicit.authorization_attachment_file_name)&&e),e},null,null)),(n()(),e["\u0275eld"](12,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null))],function(n,l){n(l,3,0,l.component.authorization_attachmentSelected===l.context.$implicit)},function(n,l){n(l,5,0,l.context.$implicit.authorization_attachment_file_type),n(l,7,0,l.context.$implicit.authorization_attachment_file_name),n(l,9,0,l.context.$implicit.authorization_attachment_file)})}function z(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function S(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.goToPage(1)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function P(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage-1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage-1)})}function w(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage+1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage+1)})}function C(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.lastPage)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function j(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function A(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,a.n,[e.ElementRef,e.Renderer2,[2,a.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,a.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function k(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Datos:"])),(n()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(n()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xd7"])),(n()(),e["\u0275eld"](6,0,null,null,43,"div",[["class","modal-body"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,42,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](8,0,null,null,41,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","authorization_attachment_file_type"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file_type"])),(n()(),e["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","authorization_attachment_file_type"],["name","authorization_attachment_file_type"],["placeholder","AuthorizationAttachmentFileType"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,t){var u=!0,o=n.component;return"input"===l&&(u=!1!==e["\u0275nov"](n,14)._handleInput(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,14).onTouched()&&u),"compositionstart"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionStart()&&u),"compositionend"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionEnd(t.target.value)&&u),"ngModelChange"===l&&(u=!1!==(o.authorization_attachmentSelected.authorization_attachment_file_type=t)&&u),u},null,null)),e["\u0275did"](14,16384,null,0,a.d,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.h,function(n){return[n]},[a.d]),e["\u0275did"](16,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.i,null,[a.m]),e["\u0275did"](18,16384,null,0,a.j,[[4,a.i]],null,null),(n()(),e["\u0275eld"](19,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","authorization_attachment_file_name"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file_name"])),(n()(),e["\u0275eld"](22,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](23,0,null,null,5,"input",[["class","form-control"],["id","authorization_attachment_file_name"],["name","authorization_attachment_file_name"],["placeholder","AuthorizationAttachmentFileName"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,t){var u=!0,o=n.component;return"input"===l&&(u=!1!==e["\u0275nov"](n,24)._handleInput(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,24).onTouched()&&u),"compositionstart"===l&&(u=!1!==e["\u0275nov"](n,24)._compositionStart()&&u),"compositionend"===l&&(u=!1!==e["\u0275nov"](n,24)._compositionEnd(t.target.value)&&u),"ngModelChange"===l&&(u=!1!==(o.authorization_attachmentSelected.authorization_attachment_file_name=t)&&u),u},null,null)),e["\u0275did"](24,16384,null,0,a.d,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.h,function(n){return[n]},[a.d]),e["\u0275did"](26,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.i,null,[a.m]),e["\u0275did"](28,16384,null,0,a.j,[[4,a.i]],null,null),(n()(),e["\u0275eld"](29,0,null,null,4,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](30,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","authorization_attachment_file"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file"])),(n()(),e["\u0275eld"](32,0,null,null,1,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](33,0,null,null,0,"input",[["class","form-control"],["id","authorization_attachment_file"],["name","authorization_attachment_file"],["placeholder","AuthorizationAttachmentFile"],["type","file"]],null,[[null,"change"]],function(n,l,t){var e=!0;return"change"===l&&(e=!1!==n.component.CodeFileAuthorizationAttachment(t)&&e),e},null,null)),(n()(),e["\u0275eld"](34,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](35,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","register_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Register"])),(n()(),e["\u0275eld"](37,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](38,0,null,null,11,"select",[["class","form-control"],["id","register_id"],["name","register_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,39).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,39).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.authorization_attachmentSelected.register_id=t)&&u),u},null,null)),e["\u0275did"](39,16384,null,0,a.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,a.h,function(n){return[n]},[a.o]),e["\u0275did"](41,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.i,null,[a.m]),e["\u0275did"](43,16384,null,0,a.j,[[4,a.i]],null,null),(n()(),e["\u0275eld"](44,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](45,147456,null,0,a.n,[e.ElementRef,e.Renderer2,[2,a.o]],{value:[0,"value"]},null),e["\u0275did"](46,147456,null,0,a.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,A)),e["\u0275did"](49,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](50,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(n()(),e["\u0275eld"](51,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Guardar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Guardar"])),(n()(),e["\u0275eld"](53,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Cancelar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(n,l){var t=l.component;n(l,16,0,"authorization_attachment_file_type",t.authorization_attachmentSelected.authorization_attachment_file_type),n(l,26,0,"authorization_attachment_file_name",t.authorization_attachmentSelected.authorization_attachment_file_name),n(l,41,0,"register_id",t.authorization_attachmentSelected.register_id),n(l,45,0,"0"),n(l,46,0,"0"),n(l,49,0,t.registers)},function(n,l){n(l,13,0,e["\u0275nov"](l,18).ngClassUntouched,e["\u0275nov"](l,18).ngClassTouched,e["\u0275nov"](l,18).ngClassPristine,e["\u0275nov"](l,18).ngClassDirty,e["\u0275nov"](l,18).ngClassValid,e["\u0275nov"](l,18).ngClassInvalid,e["\u0275nov"](l,18).ngClassPending),n(l,23,0,e["\u0275nov"](l,28).ngClassUntouched,e["\u0275nov"](l,28).ngClassTouched,e["\u0275nov"](l,28).ngClassPristine,e["\u0275nov"](l,28).ngClassDirty,e["\u0275nov"](l,28).ngClassValid,e["\u0275nov"](l,28).ngClassInvalid,e["\u0275nov"](l,28).ngClassPending),n(l,38,0,e["\u0275nov"](l,43).ngClassUntouched,e["\u0275nov"](l,43).ngClassTouched,e["\u0275nov"](l,43).ngClassPristine,e["\u0275nov"](l,43).ngClassDirty,e["\u0275nov"](l,43).ngClassValid,e["\u0275nov"](l,43).ngClassInvalid,e["\u0275nov"](l,43).ngClassPending)})}function I(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,[" AuthorizationAttachment "])),(n()(),e["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.currentPage)&&e),e},null,null)),(n()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.newAuthorizationAttachment(e["\u0275nov"](n,66))&&u),u},null,null)),(n()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(n()(),e["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.editAuthorizationAttachment(e["\u0275nov"](n,66))&&u),u},null,null)),(n()(),e["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(n()(),e["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.deleteAuthorizationAttachment()&&e),e},null,null)),(n()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(n()(),e["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.backup()&&e),e},null,null)),(n()(),e["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(n()(),e["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.toCSV()&&e),e},null,null)),(n()(),e["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(n()(),e["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==e["\u0275nov"](n,24).click()&&u),u},null,null)),(n()(),e["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(n()(),e["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(n,l,t){var e=!0;return"change"===l&&(e=!1!==n.component.decodeUploadFile(t)&&e),e},null,null)),(n()(),e["\u0275eld"](25,0,null,null,17,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](26,0,null,null,16,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](27,0,null,null,15,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(n()(),e["\u0275eld"](28,0,null,null,11,"thead",[],null,null,null,null,null)),(n()(),e["\u0275eld"](29,0,null,null,10,"tr",[],null,null,null,null,null)),(n()(),e["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Seleccionado"])),(n()(),e["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file_type"])),(n()(),e["\u0275eld"](34,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file_name"])),(n()(),e["\u0275eld"](36,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["authorization_attachment_file"])),(n()(),e["\u0275eld"](38,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Opciones"])),(n()(),e["\u0275eld"](40,0,null,null,2,"tbody",[],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](42,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](43,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](44,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](45,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](46,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,z)),e["\u0275did"](48,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](50,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](52,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](53,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](54,null,["",""])),(n()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](56,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](58,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,j)),e["\u0275did"](60,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](61,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](62,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(n()(),e["\u0275eld"](63,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.goToPage(e["\u0275nov"](n,65).value)&&u),u},null,null)),(n()(),e["\u0275ted"](-1,null,["Ir a"])),(n()(),e["\u0275eld"](65,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(n()(),e["\u0275and"](0,[["content",2]],null,0,null,k))],function(n,l){var t=l.component;n(l,42,0,t.authorization_attachments),n(l,48,0,1===t.currentPage),n(l,50,0,1!==t.currentPage),n(l,52,0,t.currentPage>1),n(l,56,0,t.currentPage<t.lastPage),n(l,58,0,t.currentPage!==t.lastPage),n(l,60,0,t.currentPage===t.lastPage)},function(n,l){var t=l.component;n(l,24,0,!0),n(l,54,0,t.currentPage),n(l,65,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-authorizationattachment",[],null,null,null,I,_)),e["\u0275did"](1,114688,null,0,g,[m.y,v.a,f.a,h],null,null)],function(n,l){n(l,1,0)},null)}var E=e["\u0275ccf"]("app-authorizationattachment",g,R,{},{},[]),T=function(){return function(){}}();t.d(l,"AuthorizationAttachmentModuleNgFactory",function(){return D});var D=e["\u0275cmf"](u,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,E]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[e.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,a.s,a.s,[]),e["\u0275mpd"](4608,m.y,m.y,[e.ComponentFactoryResolver,e.Injector,m.tb,m.z]),e["\u0275mpd"](4608,f.a,f.a,[c.e,d.l]),e["\u0275mpd"](4608,h,h,[c.e,d.l]),e["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),e["\u0275mpd"](1073742336,d.o,d.o,[[2,d.u],[2,d.l]]),e["\u0275mpd"](1073742336,T,T,[]),e["\u0275mpd"](1073742336,a.p,a.p,[]),e["\u0275mpd"](1073742336,a.e,a.e,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,d.j,function(){return[[{path:"",component:g}]]},[])])})},B9Yq:function(n,l){n.exports=function(){throw new Error("define cannot be used indirect")}},GSUL:function(n,l,t){"use strict";t.d(l,"a",function(){return a});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),i=t("ZYCi"),a=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_alimentosbebidas+"register/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.register_register_data=function(n){var l=this;return this.http.post(this.url+"register_register_data",JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_requisites_set_by_user=function(n){var l=this;return this.http.get(this.url+"get_requisites_set_by_user?register_id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.set_register_code=function(n,l){var t=this;return this.http.put(this.url+"set_register_code",JSON.stringify({code:n,id:l}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.get_register_data=function(n){var l=this;return this.http.get(this.url+"get_register_data?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.isNotTuristic=function(n){var l=this;return this.http.get(this.url+"is_not_turistic?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_registers_by_ruc=function(n){var l=this;return this.http.get(this.url+"get_registers_by_ruc?ruc_number="+n,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(i.l))},token:n,providedIn:"root"}),n}()},JEAp:function(n,l,t){var e,u=u||function(n){"use strict";if(!(void 0===n||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var l=function(){return n.URL||n.webkitURL||n},t=n.document.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in t,u=/constructor/i.test(n.HTMLElement)||n.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),i=function(l){(n.setImmediate||n.setTimeout)(function(){throw l},0)},a=function(n){setTimeout(function(){"string"==typeof n?l().revokeObjectURL(n):n.remove()},4e4)},r=function(n){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob([String.fromCharCode(65279),n],{type:n.type}):n},c=function(c,s,d){d||(c=r(c));var h,p=this,f="application/octet-stream"===c.type,g=function(){!function(n,l,t){for(var e=(l=[].concat(l)).length;e--;){var u=n["on"+l[e]];if("function"==typeof u)try{u.call(n,n)}catch(o){i(o)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,e)return h=l().createObjectURL(c),void setTimeout(function(){var n,l;t.href=h,t.download=s,n=t,l=new MouseEvent("click"),n.dispatchEvent(l),g(),a(h),p.readyState=p.DONE});!function(){if((o||f&&u)&&n.FileReader){var t=new FileReader;return t.onloadend=function(){var l=o?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");n.open(l,"_blank")||(n.location.href=l),l=void 0,p.readyState=p.DONE,g()},t.readAsDataURL(c),void(p.readyState=p.INIT)}h||(h=l().createObjectURL(c)),f?n.location.href=h:n.open(h,"_blank")||(n.location.href=h),p.readyState=p.DONE,g(),a(h)}()},s=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(n,l,t){return l=l||n.name||"download",t||(n=r(n)),navigator.msSaveOrOpenBlob(n,l)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(n,l,t){return new c(n,l||n.name||"download",t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);n.exports?n.exports.saveAs=u:null!==t("B9Yq")&&null!==t("PDX0")&&(void 0===(e=(function(){return u}).call(l,t,l,n))||(n.exports=e))},PDX0:function(n,l){(function(l){n.exports=l}).call(this,{})}}]);