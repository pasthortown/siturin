(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{B9Yq:function(l,n){l.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(l,n,e){var t,u=u||function(l){"use strict";if(!(void 0===l||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var n=function(){return l.URL||l.webkitURL||l},e=l.document.createElementNS("http://www.w3.org/1999/xhtml","a"),t="download"in e,u=/constructor/i.test(l.HTMLElement)||l.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),r=function(n){(l.setImmediate||l.setTimeout)(function(){throw n},0)},a=function(l){setTimeout(function(){"string"==typeof l?n().revokeObjectURL(l):l.remove()},4e4)},i=function(l){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob([String.fromCharCode(65279),l],{type:l.type}):l},s=function(s,c,d){d||(s=i(s));var p,v=this,h="application/octet-stream"===s.type,m=function(){!function(l,n,e){for(var t=(n=[].concat(n)).length;t--;){var u=l["on"+n[t]];if("function"==typeof u)try{u.call(l,l)}catch(o){r(o)}}}(v,"writestart progress write writeend".split(" "))};if(v.readyState=v.INIT,t)return p=n().createObjectURL(s),void setTimeout(function(){var l,n;e.href=p,e.download=c,l=e,n=new MouseEvent("click"),l.dispatchEvent(n),m(),a(p),v.readyState=v.DONE});!function(){if((o||h&&u)&&l.FileReader){var e=new FileReader;return e.onloadend=function(){var n=o?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");l.open(n,"_blank")||(l.location.href=n),n=void 0,v.readyState=v.DONE,m()},e.readAsDataURL(s),void(v.readyState=v.INIT)}p||(p=n().createObjectURL(s)),h?l.location.href=p:l.open(p,"_blank")||(l.location.href=p),v.readyState=v.DONE,m(),a(p)}()},c=s.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(l,n,e){return n=n||l.name||"download",e||(l=i(l)),navigator.msSaveOrOpenBlob(l,n)}:(c.abort=function(){},c.readyState=c.INIT=0,c.WRITING=1,c.DONE=2,c.error=c.onwritestart=c.onprogress=c.onwrite=c.onabort=c.onerror=c.onwriteend=null,function(l,n,e){return new s(l,n||l.name||"download",e)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);l.exports?l.exports.saveAs=u:null!==e("B9Yq")&&null!==e("PDX0")&&(void 0===(t=(function(){return u}).call(n,e,n,l))||(l.exports=t))},PDX0:function(l,n){(function(n){l.exports=n}).call(this,{})},Qqte:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),o=e("pMnS"),r=e("Ip0R"),a=e("gIcY"),i=e("JEAp"),s=e("iYF/"),c=e("mhEj"),d=e("jsSy"),p=function(){function l(l,n,e,t){this.modalService=l,this.toastr=n,this.person_representativeDataService=e,this.person_representative_attachmentDataService=t,this.person_representative_attachments=[],this.person_representative_attachmentSelected=new c.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.person_representatives=[]}return l.prototype.ngOnInit=function(){this.goToPage(1),this.getPersonRepresentative()},l.prototype.CodeFilePersonRepresentativeAttachment=function(l){var n=this,e=new FileReader;if(l.target.files&&l.target.files.length>0){var t=l.target.files[0];e.readAsDataURL(t),e.onload=function(){n.person_representative_attachmentSelected.person_representative_attachment_file_name=t.name,n.person_representative_attachmentSelected.person_representative_attachment_file_type=t.type,n.person_representative_attachmentSelected.person_representative_attachment_file=e.result.toString().split(",")[1]}}},l.prototype.selectPersonRepresentativeAttachment=function(l){this.person_representative_attachmentSelected=l},l.prototype.getPersonRepresentative=function(){var l=this;this.person_representatives=[],this.person_representativeDataService.get().then(function(n){l.person_representatives=n}).catch(function(l){return console.log(l)})},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getPersonRepresentativeAttachments())},l.prototype.getPersonRepresentativeAttachments=function(){var l=this;this.person_representative_attachments=[],this.person_representative_attachmentSelected=new c.a,this.person_representative_attachmentSelected.person_representative_id=0,this.person_representative_attachmentDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.person_representative_attachments=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newPersonRepresentativeAttachment=function(l){this.person_representative_attachmentSelected=new c.a,this.person_representative_attachmentSelected.person_representative_id=0,this.openDialog(l)},l.prototype.editPersonRepresentativeAttachment=function(l){void 0!==this.person_representative_attachmentSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deletePersonRepresentativeAttachment=function(){var l=this;void 0!==this.person_representative_attachmentSelected.id?this.person_representative_attachmentDataService.delete(this.person_representative_attachmentSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getPersonRepresentativeAttachments()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.person_representative_attachmentDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),e=new Date;Object(i.saveAs)(n,e.toLocaleDateString()+"_PersonRepresentativeAttachments.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.person_representative_attachmentDataService.get().then(function(l){var n="id;person_representative_attachment_file_type;person_representative_attachment_file_name;person_representative_attachment_file;ruc;assignment_date;person_representative_id\n";l.forEach(function(l){n+=l.id+";"+l.person_representative_attachment_file_type+";"+l.person_representative_attachment_file_name+";"+l.person_representative_attachment_file+";"+l.ruc+";"+l.assignment_date+";"+l.person_representative_id+"\n"});var e=new Blob(["\ufeff",n],{type:"text/plain"}),t=new Date;Object(i.saveAs)(e,t.toLocaleDateString()+"_PersonRepresentativeAttachments.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,e=new FileReader;l.target.files&&l.target.files.length>0&&(e.readAsDataURL(l.target.files[0]),e.onload=function(){var l=e.result.toString().split(",")[1],t=JSON.parse(decodeURIComponent(escape(atob(l))));n.person_representative_attachmentDataService.masiveLoad(t).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.downloadFile=function(l,n,e){for(var t=atob(l),u=new Array(t.length),o=0;o<t.length;o++)u[o]=t.charCodeAt(o);var r=new Uint8Array(u),a=new Blob([r],{type:n});Object(i.saveAs)(a,e)},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0,size:"lg"}).result.then(function(l){"Guardar click"===l&&(void 0===n.person_representative_attachmentSelected.id?n.person_representative_attachmentDataService.post(n.person_representative_attachmentSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getPersonRepresentativeAttachments()}).catch(function(l){return console.log(l)}):n.person_representative_attachmentDataService.put(n.person_representative_attachmentSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getPersonRepresentativeAttachments()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),v=e("4GxJ"),h=e("3EpR"),m=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function f(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,16,"tr",[],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.selectPersonRepresentativeAttachment(l.context.$implicit)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["",""])),(l()(),t["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](7,null,["",""])),(l()(),t["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,["",""])),(l()(),t["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](11,null,["",""])),(l()(),t["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](13,null,["",""])),(l()(),t["\u0275eld"](14,0,null,null,2,"th",[],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-success"],["title","Descargar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.downloadFile(l.context.$implicit.person_representative_attachment_file,l.context.$implicit.person_representative_attachment_file_type,l.context.$implicit.person_representative_attachment_file_name)&&t),t},null,null)),(l()(),t["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null))],function(l,n){l(n,3,0,n.component.person_representative_attachmentSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.person_representative_attachment_file_type),l(n,7,0,n.context.$implicit.person_representative_attachment_file_name),l(n,9,0,n.context.$implicit.person_representative_attachment_file),l(n,11,0,n.context.$implicit.ruc),l(n,13,0,n.context.$implicit.assignment_date)})}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.goToPage(1)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage-1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage+1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.lastPage)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,a.n,[t.ElementRef,t.Renderer2,[2,a.o]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,a.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,[" "," "]))],function(l,n){l(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.id)})}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Datos:"])),(l()(),t["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.dismiss("Cross click")&&t),t},null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xd7"])),(l()(),t["\u0275eld"](6,0,null,null,64,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,63,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,62,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","person_representative_attachment_file_type"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file_type"])),(l()(),t["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","person_representative_attachment_file_type"],["name","person_representative_attachment_file_type"],["placeholder","PersonRepresentativeAttachmentFileType"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,14)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,14).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,14)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,14)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.person_representative_attachmentSelected.person_representative_attachment_file_type=e)&&u),u},null,null)),t["\u0275did"](14,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](16,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](18,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](19,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","person_representative_attachment_file_name"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file_name"])),(l()(),t["\u0275eld"](22,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,5,"input",[["class","form-control"],["id","person_representative_attachment_file_name"],["name","person_representative_attachment_file_name"],["placeholder","PersonRepresentativeAttachmentFileName"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,24)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,24).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,24)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,24)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.person_representative_attachmentSelected.person_representative_attachment_file_name=e)&&u),u},null,null)),t["\u0275did"](24,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](26,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](28,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](29,0,null,null,4,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","person_representative_attachment_file"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file"])),(l()(),t["\u0275eld"](32,0,null,null,1,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](33,0,null,null,0,"input",[["class","form-control"],["id","person_representative_attachment_file"],["name","person_representative_attachment_file"],["placeholder","PersonRepresentativeAttachmentFile"],["type","file"]],null,[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.CodeFilePersonRepresentativeAttachment(e)&&t),t},null,null)),(l()(),t["\u0275eld"](34,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","ruc"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc"])),(l()(),t["\u0275eld"](37,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](38,0,null,null,5,"input",[["class","form-control"],["id","ruc"],["name","ruc"],["placeholder","RUC"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,39)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,39).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,39)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,39)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.person_representative_attachmentSelected.ruc=e)&&u),u},null,null)),t["\u0275did"](39,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](41,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](43,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](44,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](45,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","assignment_date"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["assignment_date"])),(l()(),t["\u0275eld"](47,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](48,0,null,null,6,"input",[["class","form-control"],["id","assignment_date"],["name","assignment_date"],["placeholder","assignmentDate"],["type","date"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,49)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,49).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,49)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,49)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.person_representative_attachmentSelected.assignment_date=e)&&u),u},null,null)),t["\u0275did"](49,16384,null,0,a.d,[t.Renderer2,t.ElementRef,[2,a.a]],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.d]),t["\u0275did"](51,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275ppd"](52,2),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](54,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](55,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](56,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","person_representative_id"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["PersonRepresentative"])),(l()(),t["\u0275eld"](58,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](59,0,null,null,11,"select",[["class","form-control"],["id","person_representative_id"],["name","person_representative_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var u=!0,o=l.component;return"change"===n&&(u=!1!==t["\u0275nov"](l,60).onChange(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,60).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.person_representative_attachmentSelected.person_representative_id=e)&&u),u},null,null)),t["\u0275did"](60,16384,null,0,a.o,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,a.h,function(l){return[l]},[a.o]),t["\u0275did"](62,671744,null,0,a.m,[[8,null],[8,null],[8,null],[6,a.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,a.i,null,[a.m]),t["\u0275did"](64,16384,null,0,a.j,[[4,a.i]],null,null),(l()(),t["\u0275eld"](65,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),t["\u0275did"](66,147456,null,0,a.n,[t.ElementRef,t.Renderer2,[2,a.o]],{value:[0,"value"]},null),t["\u0275did"](67,147456,null,0,a.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Seleccione..."])),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](70,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](71,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](72,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Guardar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Guardar"])),(l()(),t["\u0275eld"](74,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Cancelar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var e=n.component;l(n,16,0,"person_representative_attachment_file_type",e.person_representative_attachmentSelected.person_representative_attachment_file_type),l(n,26,0,"person_representative_attachment_file_name",e.person_representative_attachmentSelected.person_representative_attachment_file_name),l(n,41,0,"ruc",e.person_representative_attachmentSelected.ruc);var u=t["\u0275unv"](n,51,1,l(n,52,0,t["\u0275nov"](n.parent,0),e.person_representative_attachmentSelected.assignment_date,"y-MM-dd"));l(n,51,0,"assignment_date",u),l(n,62,0,"person_representative_id",e.person_representative_attachmentSelected.person_representative_id),l(n,66,0,"0"),l(n,67,0,"0"),l(n,70,0,e.person_representatives)},function(l,n){l(n,13,0,t["\u0275nov"](n,18).ngClassUntouched,t["\u0275nov"](n,18).ngClassTouched,t["\u0275nov"](n,18).ngClassPristine,t["\u0275nov"](n,18).ngClassDirty,t["\u0275nov"](n,18).ngClassValid,t["\u0275nov"](n,18).ngClassInvalid,t["\u0275nov"](n,18).ngClassPending),l(n,23,0,t["\u0275nov"](n,28).ngClassUntouched,t["\u0275nov"](n,28).ngClassTouched,t["\u0275nov"](n,28).ngClassPristine,t["\u0275nov"](n,28).ngClassDirty,t["\u0275nov"](n,28).ngClassValid,t["\u0275nov"](n,28).ngClassInvalid,t["\u0275nov"](n,28).ngClassPending),l(n,38,0,t["\u0275nov"](n,43).ngClassUntouched,t["\u0275nov"](n,43).ngClassTouched,t["\u0275nov"](n,43).ngClassPristine,t["\u0275nov"](n,43).ngClassDirty,t["\u0275nov"](n,43).ngClassValid,t["\u0275nov"](n,43).ngClassInvalid,t["\u0275nov"](n,43).ngClassPending),l(n,48,0,t["\u0275nov"](n,54).ngClassUntouched,t["\u0275nov"](n,54).ngClassTouched,t["\u0275nov"](n,54).ngClassPristine,t["\u0275nov"](n,54).ngClassDirty,t["\u0275nov"](n,54).ngClassValid,t["\u0275nov"](n,54).ngClassInvalid,t["\u0275nov"](n,54).ngClassPending),l(n,59,0,t["\u0275nov"](n,64).ngClassUntouched,t["\u0275nov"](n,64).ngClassTouched,t["\u0275nov"](n,64).ngClassPristine,t["\u0275nov"](n,64).ngClassDirty,t["\u0275nov"](n,64).ngClassValid,t["\u0275nov"](n,64).ngClassInvalid,t["\u0275nov"](n,64).ngClassPending)})}function I(l){return t["\u0275vid"](0,[t["\u0275pid"](0,r.DatePipe,[t.LOCALE_ID]),(l()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" PersonRepresentativeAttachment "])),(l()(),t["\u0275eld"](4,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.currentPage)&&t),t},null,null)),(l()(),t["\u0275eld"](9,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.newPersonRepresentativeAttachment(t["\u0275nov"](l,71))&&u),u},null,null)),(l()(),t["\u0275eld"](12,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.editPersonRepresentativeAttachment(t["\u0275nov"](l,71))&&u),u},null,null)),(l()(),t["\u0275eld"](14,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.deletePersonRepresentativeAttachment()&&t),t},null,null)),(l()(),t["\u0275eld"](17,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](19,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.backup()&&t),t},null,null)),(l()(),t["\u0275eld"](20,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toCSV()&&t),t},null,null)),(l()(),t["\u0275eld"](22,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,25).click()&&u),u},null,null)),(l()(),t["\u0275eld"](24,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),t["\u0275eld"](25,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.decodeUploadFile(e)&&t),t},null,null)),(l()(),t["\u0275eld"](26,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,19,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](29,0,null,null,15,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Seleccionado"])),(l()(),t["\u0275eld"](33,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file_type"])),(l()(),t["\u0275eld"](35,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file_name"])),(l()(),t["\u0275eld"](37,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["person_representative_attachment_file"])),(l()(),t["\u0275eld"](39,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ruc"])),(l()(),t["\u0275eld"](41,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["assignment_date"])),(l()(),t["\u0275eld"](43,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Opciones"])),(l()(),t["\u0275eld"](45,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](47,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](48,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](49,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](51,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](53,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](55,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](57,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](58,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](59,null,["",""])),(l()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](61,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](63,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](65,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](66,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](67,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t["\u0275eld"](68,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(t["\u0275nov"](l,70).value)&&u),u},null,null)),(l()(),t["\u0275ted"](-1,null,["Ir a"])),(l()(),t["\u0275eld"](70,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),t["\u0275and"](0,[["content",2]],null,0,null,w))],function(l,n){var e=n.component;l(n,47,0,e.person_representative_attachments),l(n,53,0,1===e.currentPage),l(n,55,0,1!==e.currentPage),l(n,57,0,e.currentPage>1),l(n,61,0,e.currentPage<e.lastPage),l(n,63,0,e.currentPage!==e.lastPage),l(n,65,0,e.currentPage===e.lastPage)},function(l,n){var e=n.component;l(n,25,0,!0),l(n,59,0,e.currentPage),l(n,70,0,t["\u0275inlineInterpolate"](1,"",1,""),t["\u0275inlineInterpolate"](1,"",e.lastPage,""))})}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-personrepresentativeattachment",[],null,null,null,I,m)),t["\u0275did"](1,114688,null,0,p,[v.y,h.a,d.a,s.a],null,null)],function(l,n){l(n,1,0)},null)}var E=t["\u0275ccf"]("app-personrepresentativeattachment",p,k,{},{},[]),D=e("sE5F"),T=e("ZYCi"),A=function(){return function(){}}();e.d(n,"PersonRepresentativeAttachmentModuleNgFactory",function(){return j});var j=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,E]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,a.s,a.s,[]),t["\u0275mpd"](4608,v.y,v.y,[t.ComponentFactoryResolver,t.Injector,v.tb,v.z]),t["\u0275mpd"](4608,d.a,d.a,[D.e,T.l]),t["\u0275mpd"](4608,s.a,s.a,[D.e,T.l]),t["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["\u0275mpd"](1073742336,T.o,T.o,[[2,T.u],[2,T.l]]),t["\u0275mpd"](1073742336,A,A,[]),t["\u0275mpd"](1073742336,a.p,a.p,[]),t["\u0275mpd"](1073742336,a.e,a.e,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,T.j,function(){return[[{path:"",component:p}]]},[])])})},"iYF/":function(l,n,e){"use strict";e.d(n,"a",function(){return a});var t=e("sE5F"),u=e("AytR"),o=e("CcnG"),r=e("ZYCi"),a=function(){function l(l,n){this.http=l,this.router=n,this.url=u.a.api_base+"personrepresentativeattachment/",this.options=new t.g,this.options.headers=new t.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return l.prototype.get=function(l){var n=this;return void 0===l?this.http.get(this.url,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())}):this.http.get(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.get_paginate=function(l,n){var e=this;return this.http.get(this.url+"paginate?size="+l.toString()+"&page="+n.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){e.handledError(l.json())})},l.prototype.get_filtered=function(l){var n=this;return this.http.get(this.url+"filtered?ruc_number="+l,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.delete=function(l){var n=this;return this.http.delete(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.getBackUp=function(){var l=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(l){return l.json()}).catch(function(n){l.handledError(n.json())})},l.prototype.post=function(l){var n=this;return this.http.post(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.put=function(l){var n=this;return this.http.put(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.masiveLoad=function(l){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:l}),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.handledError=function(l){console.log(l),sessionStorage.clear(),this.router.navigate(["/login"])},l.ngInjectableDef=o.defineInjectable({factory:function(){return new l(o.inject(t.e),o.inject(r.l))},token:l,providedIn:"root"}),l}()},mhEj:function(l,n,e){"use strict";e.d(n,"a",function(){return t});var t=function(){return function(){this.person_representative_attachment_file_type="",this.person_representative_attachment_file_name="",this.person_representative_attachment_file="",this.assignment_date=new Date,this.ruc="",this.person_representative_id=0}}()}}]);