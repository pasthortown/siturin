(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{B9Yq:function(l,n){l.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(l,n,t){var e,u=u||function(l){"use strict";if(!(void 0===l||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var n=function(){return l.URL||l.webkitURL||l},t=l.document.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in t,u=/constructor/i.test(l.HTMLElement)||l.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),a=function(n){(l.setImmediate||l.setTimeout)(function(){throw n},0)},i=function(l){setTimeout(function(){"string"==typeof l?n().revokeObjectURL(l):l.remove()},4e4)},r=function(l){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob([String.fromCharCode(65279),l],{type:l.type}):l},c=function(c,s,d){d||(c=r(c));var p,f=this,g="application/octet-stream"===c.type,m=function(){!function(l,n,t){for(var e=(n=[].concat(n)).length;e--;){var u=l["on"+n[e]];if("function"==typeof u)try{u.call(l,l)}catch(o){a(o)}}}(f,"writestart progress write writeend".split(" "))};if(f.readyState=f.INIT,e)return p=n().createObjectURL(c),void setTimeout(function(){var l,n;t.href=p,t.download=s,l=t,n=new MouseEvent("click"),l.dispatchEvent(n),m(),i(p),f.readyState=f.DONE});!function(){if((o||g&&u)&&l.FileReader){var t=new FileReader;return t.onloadend=function(){var n=o?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");l.open(n,"_blank")||(l.location.href=n),n=void 0,f.readyState=f.DONE,m()},t.readAsDataURL(c),void(f.readyState=f.INIT)}p||(p=n().createObjectURL(c)),g?l.location.href=p:l.open(p,"_blank")||(l.location.href=p),f.readyState=f.DONE,m(),i(p)}()},s=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(l,n,t){return n=n||l.name||"download",t||(l=r(l)),navigator.msSaveOrOpenBlob(l,n)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(l,n,t){return new c(l,n||l.name||"download",t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);l.exports?l.exports.saveAs=u:null!==t("B9Yq")&&null!==t("PDX0")&&(void 0===(e=(function(){return u}).call(n,t,n,l))||(l.exports=e))},PDX0:function(l,n){(function(n){l.exports=n}).call(this,{})},UQAU:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){return function(){this.declaration_item_id=0,this.value=0}}()},"l+3K":function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){return function(){}}(),o=t("pMnS"),a=t("Ip0R"),i=t("gIcY"),r=t("JEAp"),c=t("skdo"),s=t("UQAU"),d=t("rYF7"),p=function(){function l(l,n,t,e){this.modalService=l,this.toastr=n,this.declaration_itemDataService=t,this.declaration_item_valueDataService=e,this.declaration_item_values=[],this.declaration_item_valueSelected=new s.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.declaration_items=[]}return l.prototype.ngOnInit=function(){this.goToPage(1),this.getDeclarationItem()},l.prototype.selectDeclarationItemValue=function(l){this.declaration_item_valueSelected=l},l.prototype.getDeclarationItem=function(){var l=this;this.declaration_items=[],this.declaration_itemDataService.get().then(function(n){l.declaration_items=n}).catch(function(l){return console.log(l)})},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getDeclarationItemValues())},l.prototype.getDeclarationItemValues=function(){var l=this;this.declaration_item_values=[],this.declaration_item_valueSelected=new s.a,this.declaration_item_valueSelected.declaration_item_id=0,this.declaration_item_valueDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.declaration_item_values=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newDeclarationItemValue=function(l){this.declaration_item_valueSelected=new s.a,this.declaration_item_valueSelected.declaration_item_id=0,this.openDialog(l)},l.prototype.editDeclarationItemValue=function(l){void 0!==this.declaration_item_valueSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteDeclarationItemValue=function(){var l=this;void 0!==this.declaration_item_valueSelected.id?this.declaration_item_valueDataService.delete(this.declaration_item_valueSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getDeclarationItemValues()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.declaration_item_valueDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),t=new Date;Object(r.saveAs)(n,t.toLocaleDateString()+"_DeclarationItemValues.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.declaration_item_valueDataService.get().then(function(l){var n="id;value;declaration_item_id\n";l.forEach(function(l){n+=l.id+";"+l.value+";"+l.declaration_item_id+"\n"});var t=new Blob(["\ufeff",n],{type:"text/plain"}),e=new Date;Object(r.saveAs)(t,e.toLocaleDateString()+"_DeclarationItemValues.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,t=new FileReader;l.target.files&&l.target.files.length>0&&(t.readAsDataURL(l.target.files[0]),t.onload=function(){var l=t.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(l))));n.declaration_item_valueDataService.masiveLoad(e).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0}).result.then(function(l){"Guardar click"===l&&(void 0===n.declaration_item_valueSelected.id?n.declaration_item_valueDataService.post(n.declaration_item_valueSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getDeclarationItemValues()}).catch(function(l){return console.log(l)}):n.declaration_item_valueDataService.put(n.declaration_item_valueSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getDeclarationItemValues()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),f=t("4GxJ"),g=t("3EpR"),m=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,5,"tr",[],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.selectDeclarationItemValue(l.context.$implicit)&&e),e},null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,v)),e["\u0275did"](3,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""]))],function(l,n){l(n,3,0,n.component.declaration_item_valueSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.value)})}function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function _(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.goToPage(1)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(1*u.currentPage-1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function I(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(1*u.currentPage+1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(u.lastPage)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function P(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](3,null,[" "," "]))],function(l,n){l(n,1,0,e["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,2,0,e["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.id)})}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Datos:"])),(l()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xd7"])),(l()(),e["\u0275eld"](6,0,null,null,29,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,28,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,27,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","value"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["value"])),(l()(),e["\u0275eld"](12,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,6,"input",[["class","form-control"],["id","value"],["name","value"],["placeholder","value"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(l,n,t){var u=!0,o=l.component;return"input"===n&&(u=!1!==e["\u0275nov"](l,14)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,14).onTouched()&&u),"compositionstart"===n&&(u=!1!==e["\u0275nov"](l,14)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e["\u0275nov"](l,14)._compositionEnd(t.target.value)&&u),"change"===n&&(u=!1!==e["\u0275nov"](l,15).onChange(t.target.value)&&u),"input"===n&&(u=!1!==e["\u0275nov"](l,15).onChange(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,15).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.declaration_item_valueSelected.value=t)&&u),u},null,null)),e["\u0275did"](14,16384,null,0,i.d,[e.Renderer2,e.ElementRef,[2,i.a]],null,null),e["\u0275did"](15,16384,null,0,i.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.h,function(l,n){return[l,n]},[i.d,i.q]),e["\u0275did"](17,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.i,null,[i.m]),e["\u0275did"](19,16384,null,0,i.j,[[4,i.i]],null,null),(l()(),e["\u0275eld"](20,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](21,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","declaration_item_id"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["DeclarationItem"])),(l()(),e["\u0275eld"](23,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,11,"select",[["class","form-control"],["id","declaration_item_id"],["name","declaration_item_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,t){var u=!0,o=l.component;return"change"===n&&(u=!1!==e["\u0275nov"](l,25).onChange(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,25).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.declaration_item_valueSelected.declaration_item_id=t)&&u),u},null,null)),e["\u0275did"](25,16384,null,0,i.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.h,function(l){return[l]},[i.o]),e["\u0275did"](27,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.i,null,[i.m]),e["\u0275did"](29,16384,null,0,i.j,[[4,i.i]],null,null),(l()(),e["\u0275eld"](30,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](31,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](32,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Seleccione..."])),(l()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](35,278528,null,0,a.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](36,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Guardar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Guardar"])),(l()(),e["\u0275eld"](39,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Cancelar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var t=n.component;l(n,17,0,"value",t.declaration_item_valueSelected.value),l(n,27,0,"declaration_item_id",t.declaration_item_valueSelected.declaration_item_id),l(n,31,0,"0"),l(n,32,0,"0"),l(n,35,0,t.declaration_items)},function(l,n){l(n,13,0,e["\u0275nov"](n,19).ngClassUntouched,e["\u0275nov"](n,19).ngClassTouched,e["\u0275nov"](n,19).ngClassPristine,e["\u0275nov"](n,19).ngClassDirty,e["\u0275nov"](n,19).ngClassValid,e["\u0275nov"](n,19).ngClassInvalid,e["\u0275nov"](n,19).ngClassPending),l(n,24,0,e["\u0275nov"](n,29).ngClassUntouched,e["\u0275nov"](n,29).ngClassTouched,e["\u0275nov"](n,29).ngClassPristine,e["\u0275nov"](n,29).ngClassDirty,e["\u0275nov"](n,29).ngClassValid,e["\u0275nov"](n,29).ngClassInvalid,e["\u0275nov"](n,29).ngClassPending)})}function D(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" DeclarationItemValue "])),(l()(),e["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(u.currentPage)&&e),e},null,null)),(l()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.newDeclarationItemValue(e["\u0275nov"](l,60))&&u),u},null,null)),(l()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.editDeclarationItemValue(e["\u0275nov"](l,60))&&u),u},null,null)),(l()(),e["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.deleteDeclarationItemValue()&&e),e},null,null)),(l()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.backup()&&e),e},null,null)),(l()(),e["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.toCSV()&&e),e},null,null)),(l()(),e["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==e["\u0275nov"](l,24).click()&&u),u},null,null)),(l()(),e["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,t){var e=!0;return"change"===n&&(e=!1!==l.component.decodeUploadFile(t)&&e),e},null,null)),(l()(),e["\u0275eld"](25,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](26,0,null,null,10,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,9,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](28,0,null,null,5,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](29,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Seleccionado"])),(l()(),e["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["value"])),(l()(),e["\u0275eld"](34,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,h)),e["\u0275did"](36,278528,null,0,a.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](37,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](38,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](39,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](40,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](42,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](44,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](46,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](47,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](48,null,["",""])),(l()(),e["\u0275and"](16777216,null,null,1,null,I)),e["\u0275did"](50,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](52,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](54,16384,null,0,a.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](55,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](56,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),e["\u0275eld"](57,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(e["\u0275nov"](l,59).value)&&u),u},null,null)),(l()(),e["\u0275ted"](-1,null,["Ir a"])),(l()(),e["\u0275eld"](59,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),e["\u0275and"](0,[["content",2]],null,0,null,k))],function(l,n){var t=n.component;l(n,36,0,t.declaration_item_values),l(n,42,0,1===t.currentPage),l(n,44,0,1!==t.currentPage),l(n,46,0,t.currentPage>1),l(n,50,0,t.currentPage<t.lastPage),l(n,52,0,t.currentPage!==t.lastPage),l(n,54,0,t.currentPage===t.lastPage)},function(l,n){var t=n.component;l(n,24,0,!0),l(n,48,0,t.currentPage),l(n,59,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function C(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-declarationitemvalue",[],null,null,null,D,m)),e["\u0275did"](1,114688,null,0,p,[f.y,g.a,d.a,c.a],null,null)],function(l,n){l(n,1,0)},null)}var R=e["\u0275ccf"]("app-declarationitemvalue",p,C,{},{},[]),E=t("sE5F"),T=t("ZYCi"),j=function(){return function(){}}();t.d(n,"DeclarationItemValueModuleNgFactory",function(){return V});var V=e["\u0275cmf"](u,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,R]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[e.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,i.s,i.s,[]),e["\u0275mpd"](4608,f.y,f.y,[e.ComponentFactoryResolver,e.Injector,f.tb,f.z]),e["\u0275mpd"](4608,d.a,d.a,[E.e,T.l]),e["\u0275mpd"](4608,c.a,c.a,[E.e,T.l]),e["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),e["\u0275mpd"](1073742336,T.o,T.o,[[2,T.u],[2,T.l]]),e["\u0275mpd"](1073742336,j,j,[]),e["\u0275mpd"](1073742336,i.p,i.p,[]),e["\u0275mpd"](1073742336,i.e,i.e,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,T.j,function(){return[[{path:"",component:p}]]},[])])})},rYF7:function(l,n,t){"use strict";t.d(n,"a",function(){return i});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),a=t("ZYCi"),i=function(){function l(l,n){this.http=l,this.router=n,this.url=u.a.api_financiero+"declarationitem/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return l.prototype.get=function(l){var n=this;return void 0===l?this.http.get(this.url,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())}):this.http.get(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.get_paginate=function(l,n){var t=this;return this.http.get(this.url+"paginate?size="+l.toString()+"&page="+n.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){t.handledError(l.json())})},l.prototype.delete=function(l){var n=this;return this.http.delete(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.getBackUp=function(){var l=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(l){return l.json()}).catch(function(n){l.handledError(n.json())})},l.prototype.post=function(l){var n=this;return this.http.post(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.put=function(l){var n=this;return this.http.put(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.masiveLoad=function(l){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:l}),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.handledError=function(l){console.log(l),sessionStorage.clear(),this.router.navigate(["/login"])},l.ngInjectableDef=o.defineInjectable({factory:function(){return new l(o.inject(e.e),o.inject(a.l))},token:l,providedIn:"root"}),l}()}}]);