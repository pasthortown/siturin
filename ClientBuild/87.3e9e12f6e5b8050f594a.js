(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{"+o/m":function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o});var i=n("CcnG"),l={contentsCss:[""],customConfig:""},a=function(){function e(t,n){this.ngZone=t,this.hostEl=n,this.innerValue="",this.disabled=!1,this.editorInitialized=!1,this.readonly=!1,this.config={},this.skin="moono-lisa",this.language="en",this.fullPage=!1,this.inline=!1,this.change=new i.EventEmitter,this.ready=new i.EventEmitter,this.blur=new i.EventEmitter,this.focus=new i.EventEmitter,this.onChange=function(e){},this.onTouched=function(){},this.identifier=e.getRandomIdentifier(this.id)}return e.getRandomIdentifier=function(t){return void 0===t&&(t=""),"editor-"+(""!==t?t:String(e.idx++))},Object.defineProperty(e.prototype,"instance",{get:function(){return this.ckIns},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){this.editorInitialized&&(this.destroyEditor(),this.initEditor(this.identifier))},e.prototype.ngAfterViewChecked=function(){!this.editorInitialized&&this.documentContains(this.textareaRef.nativeElement)?(this.editorInitialized=!0,this.initEditor(this.identifier)):this.editorInitialized&&!this.documentContains(this.textareaRef.nativeElement)&&(this.editorInitialized=!1,this.destroyEditor())},e.prototype.ngOnDestroy=function(){this.destroyEditor()},e.prototype.initEditor=function(e){var t=this;if("undefined"==typeof CKEDITOR)return console.warn("CKEditor 4.x is missing (http://ckeditor.com/)");var n=this.textareaRef.nativeElement;if(this.identifier=e,n.setAttribute("name",this.identifier),!this.ckIns&&this.documentContains(this.textareaRef.nativeElement)){var i=Object.assign({},l,this.config,{readOnly:this.readonly,skin:this.skin,language:this.language,fullPage:this.fullPage,inline:this.inline});this.ckIns=this.inline?CKEDITOR.inline(n,i):CKEDITOR.replace(n,i),this.ckIns.setData(this.innerValue),this.ckIns.on("change",function(){var e=t.ckIns.getData();t.updateValue(e)}),this.ckIns.on("instanceReady",function(e){t.ngZone.run(function(){t.ready.emit(e)})}),this.ckIns.on("blur",function(e){t.ngZone.run(function(){t.blur.emit(e),t.onTouched()})}),this.ckIns.on("focus",function(e){t.ngZone.run(function(){t.focus.emit(e)})})}},e.prototype.destroyEditor=function(){if(this.ckIns){CKEDITOR.instances.hasOwnProperty(this.ckIns.name)&&CKEDITOR.remove(CKEDITOR.instances[this.ckIns.name]),this.ckIns=null;var e=this.hostEl.nativeElement.querySelector("#cke_"+this.identifier);null!=e&&e.parentElement&&e.parentElement.removeChild(e)}},e.prototype.updateValue=function(e){var t=this;this.ngZone.run(function(){t.innerValue=e,t.onChange(e),t.onTouched(),t.change.emit(e)})},e.prototype.documentContains=function(e){return document.contains?document.contains(e):document.body.contains(e)},e.prototype.writeValue=function(e){if(this.innerValue=e||"",this.ckIns){this.ckIns.setData(this.innerValue);var t=this.ckIns.getData();this.ckIns.setData(t)}},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.disabled=e},e.idx=1,e}(),o=function(){return function(){}}()},"7QCc":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){return function(){this.code="",this.father_code="",this.name="",this.acronym="",this.gmap_reference_latitude=-.2153676,this.gmap_reference_longitude=-78.5036064}}()},SwDF:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var i=n("sE5F"),l=n("AytR"),a=n("CcnG"),o=n("ZYCi"),r=function(){function e(e,t){this.http=e,this.router=t,this.url=l.a.api_alojamiento+"state/",this.options=new i.g,this.options.headers=new i.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return e.prototype.get=function(e){var t=this;return void 0===e?this.http.get(this.url,this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())}):this.http.get(this.url+"?id="+e.toString(),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())})},e.prototype.get_paginate=function(e,t){var n=this;return this.http.get(this.url+"paginate?size="+e.toString()+"&page="+t.toString(),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){n.handledError(e.json())})},e.prototype.delete=function(e){var t=this;return this.http.delete(this.url+"?id="+e.toString(),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())})},e.prototype.getBackUp=function(){var e=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(e){return e.json()}).catch(function(t){e.handledError(t.json())})},e.prototype.post=function(e){var t=this;return this.http.post(this.url,JSON.stringify(e),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())})},e.prototype.put=function(e){var t=this;return this.http.put(this.url,JSON.stringify(e),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())})},e.prototype.masiveLoad=function(e){var t=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:e}),this.options).toPromise().then(function(e){return e.json()}).catch(function(e){t.handledError(e.json())})},e.prototype.handledError=function(e){console.log(e),sessionStorage.clear(),this.router.navigate(["/login"])},e.ngInjectableDef=a.defineInjectable({factory:function(){return new e(a.inject(i.e),a.inject(o.l))},token:e,providedIn:"root"}),e}()},iZSA:function(e,t,n){"use strict";n.r(t);var i=n("CcnG"),l=function(){return function(){}}(),a=n("9AJC"),o=n("pMnS"),r=n("Vnl2"),s=n("gIcY"),u=n("4GxJ"),c=n("Ip0R"),d=n("cfkQ"),g=n("z8lh"),p=n("ZYjt"),h=n("7QCc"),m=n("iNZF"),f=n("c4FF"),v=n("m3oD"),_=function(){function e(e,t){this.consultorDataService=e,this.ubicationDataService=t,this.user=new f.a,this.change=new i.EventEmitter,this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]},this.config={paging:!0,filtering:{filterString:""},className:["table-striped","table-hover","table-bordered"]},this.rows=[],this.columns=[],this.data=[],this.currentPageMinturRegisters=1,this.lastPageMinturRegisters=1,this.recordsByPageRegisterMintur=5,this.ubications=[],this.registers_mintur=[],this.idTramiteEstadoFilter=0}return e.prototype.ngOnInit=function(){this.loadCatalogos(),this.refresh()},e.prototype.ngOnChanges=function(){this.refresh()},e.prototype.loadCatalogos=function(){this.getUbications()},e.prototype.refresh=function(){this.getRegistersMintur()},e.prototype.getUbications=function(){var e=this;this.ubications=[],this.ubicationDataService.get().then(function(t){e.ubications=t}).catch(function(e){console.log(e)})},e.prototype.filterByTramiteState=function(e){var t=this,n="";this.estados_tramites.forEach(function(e){e.id==t.idTramiteEstadoFilter&&(n=e.name)}),this.config.filtering=void 0!==e?"-"==e?{filterString:n}:{filterString:n+" - "+e}:{filterString:n},this.onChangeTable(this.config)},e.prototype.getRegistersMintur=function(){var e=this;this.registers_mintur=[],this.consultorDataService.get_registers_assigned_inspector_id(this.user.id).then(function(t){e.registers_mintur=t,e.buildDataTable()}).catch(function(e){return console.log(e)})},e.prototype.buildDataTable=function(){var e=this;this.columns=[{title:"",name:"selected"},{title:"N\xfamero de RUC",name:"number"},{title:"N\xfamero de Establecimiento",name:"ruc_code_id"},{title:"Nombre Comercial",name:"establishment"},{title:"Sistema de Origen",name:"system_source"},{title:"Bandeja",name:"status"},{title:"Actividad",name:"actividad"},{title:"Provincia",name:"provincia"},{title:"Cant\xf3n",name:"canton"},{title:"Parroquia",name:"parroquia"},{title:"Direcci\xf3n",name:"address"},{title:"Clasificaci\xf3n - Categor\xeda",name:"category"},{title:"Fecha de Solicitud",name:"created_at"},{title:"N\xfamero de Registro",name:"code"},{title:"Fecha de Asignaci\xf3n",name:"date_assigment"}];var t=[];this.registers_mintur.forEach(function(n){var i="",l=new Date,a=e.getRegisterState(n.states.state_id,n.activity_id);0==a.search("Aprobado")&&(l=new Date(n.states.updated_at)),0==a.search("Negado")&&(l=new Date(n.states.updated_at));var o=new Date(n.register.created_at),r=Math.abs(o.getTime()-l.getTime()),s=Math.ceil(r/864e5);s<7&&(i='<div class="col-12 text-center"><span class="badge badge-success">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>=7&&s<=10&&(i='<div class="col-12 text-center"><span class="badge badge-warning">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>10&&(i='<div class="col-12 text-center"><span class="badge badge-danger">&nbsp;'+s.toString()+"&nbsp;</span></div>");var u=n.states.state_id.toString(),c=u.substring(u.length-1,u.length),d=new h.a,g=new h.a,p=new h.a;new h.a,e.ubications.forEach(function(e){e.id==n.establishment.ubication_id&&(p=e)}),e.ubications.forEach(function(e){e.code==p.father_code&&(g=e)}),e.ubications.forEach(function(e){e.code==g.father_code&&(d=e)}),e.ubications.forEach(function(e){});var m="";if(m="5"==n.states.state_id.toString().substring(0,1)||"60"==n.states.state_id.toString()?""==n.register_data_on_catastro.classification?e.getRegisterCategory(n.register.register_type_id,n.activity_id).toString():n.register_data_on_catastro.classification.toString()+" - "+n.register_data_on_catastro.category.toString():e.getRegisterCategory(n.register.register_type_id,n.activity_id).toString(),"4"==c||"5"==c||"6"==c){var f=new Date(n.register.created_at.toString());t.push({selected:"",date_assigment_alert:i,number:n.ruc.number,date_assigment:new Date(n.register.date_assigment.toString()).toLocaleDateString(),registerId:n.register.id,actividad:n.activity,provincia:d.name,canton:g.name,parroquia:p.name,ruc_code_id:n.establishment.ruc_code_id,establishment:n.establishment.commercially_known_name,address:n.establishment.address_main_street+" "+n.establishment.address_number+" "+n.establishment.address_secondary_street,created_at:f.toLocaleDateString(),code:n.register.code,category:m.toUpperCase(),catastro_category:n.register_data_on_catastro.category.toUpperCase(),catastro_classification:n.register_data_on_catastro.classification.toUpperCase(),system_source:n.register_data_on_catastro.system_source,status:a,status_id:n.states.state_id})}}),this.data=t,this.onChangeTable(this.config)},e.prototype.getRegisterCategory=function(e,t){var n="",i="";return 1==t&&(this.register_types_block.register_types_alojamiento.forEach(function(t){t.id==e&&(n=t.name,i=t.father_code)}),this.register_types_block.register_types_alojamiento.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),2==t&&(this.register_types_block.register_types_alimentos_bebidas.forEach(function(t){t.id==e&&(n=t.name,"Pendiente"==t.name&&(n="No Cumple Inspecci\xf3n (No Tur\xedstico)"),i=t.father_code)}),this.register_types_block.register_types_alimentos_bebidas.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),3==t&&(this.register_types_block.register_types_operacion_intermediacion.forEach(function(t){t.id==e&&(n=t.name,i=t.father_code)}),this.register_types_block.register_types_operacion_intermediacion.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),n},e.prototype.getRegisterState=function(e,t){var n="",i="";return 1==t&&(this.states.alojamiento.forEach(function(t){t.id==e&&(n=t.name,i=t.father_code)}),this.states.alojamiento.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),2==t&&(this.states.alimentos_bebidas.forEach(function(t){t.id==e&&(n=t.name,i=t.father_code)}),this.states.alimentos_bebidas.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),3==t&&(this.states.operacion_intermediacion.forEach(function(t){t.id==e&&(n=t.name,i=t.father_code)}),this.states.operacion_intermediacion.forEach(function(e){e.code==i&&(n=e.name+" - "+n)})),n},e.prototype.onChangeTable=function(e,t){var n={page:this.currentPageMinturRegisters,itemsPerPage:this.recordsByPageRegisterMintur};e.filtering&&Object.assign(this.config.filtering,e.filtering),e.sorting&&Object.assign(this.config.sorting,e.sorting);var i=this.changeFilter(this.data,this.config),l=this.changeSort(i,this.config);this.rows=n&&e.paging?this.changePage(n,l):l},e.prototype.changeFilter=function(e,t){var n=this;this.rows.forEach(function(e){e.selected=""});var i=e;if(this.columns.forEach(function(e){e.filtering&&(i=i.filter(function(t){return t[e.name].toUpperCase().match(e.filtering.filterString.toUpperCase())}))}),!t.filtering)return i;if(t.filtering.columnName)return i.filter(function(e){return e[t.filtering.columnName].match(n.config.filtering.filterString)});var l=[];return i.forEach(function(e){var t=!1;n.columns.forEach(function(i){e[i.name].toString().match(n.config.filtering.filterString)&&(t=!0)}),t&&l.push(e)}),i=l},e.prototype.changeSort=function(e,t){if(!t.sorting)return e;for(var n=this.config.sorting.columns||[],i=void 0,l=void 0,a=0;a<n.length;a++)""!==n[a].sort&&!1!==n[a].sort&&(i=n[a].name,l=n[a].sort);return i?e.sort(function(e,t){return e[i]>t[i]?"desc"===l?-1:1:e[i]<t[i]?"asc"===l?-1:1:0}):e},e.prototype.changePage=function(e,t){void 0===t&&(t=this.data);var n=(e.page-1)*e.itemsPerPage;return t.slice(n,e.itemsPerPage>-1?n+e.itemsPerPage:t.length)},e.prototype.onCellClick=function(e){var t=e.row.actividad,n=e.row.registerId,i={row:e.row,register:null};this.rows.forEach(function(t){t.selected=e.row==t?'<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>':""}),this.registers_mintur.forEach(function(e){e.register.id==n&&e.activity==t&&(i.register=e)}),this.change.emit(i)},e}(),b=i["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function y(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,1,"input",[["class","form-control"],["placeholder","Buscar..."]],null,[[null,"input"]],function(e,t,n){var l=!0,a=e.component;return"input"===t&&(l=!1!==i["\u0275nov"](e,1).onChangeFilter(n.target.value)&&l),"input"===t&&(l=!1!==a.onChangeTable(a.config)&&l),l},null,null)),i["\u0275did"](1,16384,null,0,r.NgTableFilteringDirective,[i.ElementRef,i.Renderer],{ngTableFiltering:[0,"ngTableFiltering"]},null)],function(e,t){e(t,1,0,t.component.config.filtering)},null)}function R(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),i["\u0275did"](1,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](2,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](3,null,["",""]))],function(e,t){e(t,1,0,i["\u0275inlineInterpolate"](1,"",t.context.$implicit.id,"")),e(t,2,0,i["\u0275inlineInterpolate"](1,"",t.context.$implicit.id,""))},function(e,t){e(t,3,0,t.context.$implicit.name)})}function C(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,34,"div",[["class","input-group-append"]],null,null,null,null,null)),(e()(),i["\u0275eld"](1,0,null,null,33,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var l=!0,a=e.component;return"change"===t&&(l=!1!==i["\u0275nov"](e,2).onChange(n.target.value)&&l),"blur"===t&&(l=!1!==i["\u0275nov"](e,2).onTouched()&&l),"ngModelChange"===t&&(l=!1!==(a.tramite=n)&&l),"change"===t&&(l=!1!==a.filterByTramiteState(a.tramite)&&l),l},null,null)),i["\u0275did"](2,16384,null,0,s.o,[i.Renderer2,i.ElementRef],null,null),i["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),i["\u0275did"](4,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),i["\u0275prd"](2048,null,s.i,null,[s.m]),i["\u0275did"](6,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),i["\u0275eld"](7,0,null,null,3,"option",[["selected",""],["value","-"]],null,null,null,null,null)),i["\u0275did"](8,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](9,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Todas"])),(e()(),i["\u0275eld"](11,0,null,null,3,"option",[["selected",""],["value","Registro"]],null,null,null,null,null)),i["\u0275did"](12,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](13,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Registro"])),(e()(),i["\u0275eld"](15,0,null,null,3,"option",[["selected",""],["value","Reclasificaci\xf3n"]],null,null,null,null,null)),i["\u0275did"](16,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](17,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Reclasificaci\xf3n"])),(e()(),i["\u0275eld"](19,0,null,null,3,"option",[["selected",""],["value","Recategorizaci\xf3n"]],null,null,null,null,null)),i["\u0275did"](20,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](21,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Recategorizaci\xf3n"])),(e()(),i["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","Actualizaci\xf3n"]],null,null,null,null,null)),i["\u0275did"](24,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](25,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Actualizaci\xf3n"])),(e()(),i["\u0275eld"](27,0,null,null,3,"option",[["selected",""],["value","Inactivaci\xf3n"]],null,null,null,null,null)),i["\u0275did"](28,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](29,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Inactivaci\xf3n"])),(e()(),i["\u0275eld"](31,0,null,null,3,"option",[["selected",""],["value","Reingreso"]],null,null,null,null,null)),i["\u0275did"](32,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](33,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Reingreso"]))],function(e,t){e(t,4,0,"filter-tramite-estado",t.component.tramite),e(t,8,0,"-"),e(t,9,0,"-"),e(t,12,0,"Registro"),e(t,13,0,"Registro"),e(t,16,0,"Reclasificaci\xf3n"),e(t,17,0,"Reclasificaci\xf3n"),e(t,20,0,"Recategorizaci\xf3n"),e(t,21,0,"Recategorizaci\xf3n"),e(t,24,0,"Actualizaci\xf3n"),e(t,25,0,"Actualizaci\xf3n"),e(t,28,0,"Inactivaci\xf3n"),e(t,29,0,"Inactivaci\xf3n"),e(t,32,0,"Reingreso"),e(t,33,0,"Reingreso")},function(e,t){e(t,1,0,i["\u0275nov"](t,6).ngClassUntouched,i["\u0275nov"](t,6).ngClassTouched,i["\u0275nov"](t,6).ngClassPristine,i["\u0275nov"](t,6).ngClassDirty,i["\u0275nov"](t,6).ngClassValid,i["\u0275nov"](t,6).ngClassInvalid,i["\u0275nov"](t,6).ngClassPending)})}function E(e){return i["\u0275vid"](0,[(e()(),i["\u0275ted"](-1,null,["Primera"]))],null,null)}function S(e){return i["\u0275vid"](0,[(e()(),i["\u0275ted"](-1,null,["Anterior"]))],null,null)}function I(e){return i["\u0275vid"](0,[(e()(),i["\u0275ted"](-1,null,["Siguiente"]))],null,null)}function k(e){return i["\u0275vid"](0,[(e()(),i["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function T(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,15,"ngb-pagination",[["role","navigation"]],null,[[null,"pageChange"]],function(e,t,n){var i=!0,l=e.component;return"pageChange"===t&&(i=!1!==(l.currentPageMinturRegisters=n)&&i),"pageChange"===t&&(i=!1!==l.onChangeTable(l.config,n)&&i),i},a.g,a.d)),i["\u0275did"](1,573440,null,6,u.C,[u.D],{boundaryLinks:[0,"boundaryLinks"],collectionSize:[1,"collectionSize"],maxSize:[2,"maxSize"],page:[3,"page"],pageSize:[4,"pageSize"]},{pageChange:"pageChange"}),i["\u0275qud"](335544320,1,{tplEllipsis:0}),i["\u0275qud"](335544320,2,{tplFirst:0}),i["\u0275qud"](335544320,3,{tplLast:0}),i["\u0275qud"](335544320,4,{tplNext:0}),i["\u0275qud"](335544320,5,{tplNumber:0}),i["\u0275qud"](335544320,6,{tplPrevious:0}),(e()(),i["\u0275and"](0,null,null,1,null,E)),i["\u0275did"](9,16384,[[2,4]],0,u.E,[i.TemplateRef],null,null),(e()(),i["\u0275and"](0,null,null,1,null,S)),i["\u0275did"](11,16384,[[6,4]],0,u.I,[i.TemplateRef],null,null),(e()(),i["\u0275and"](0,null,null,1,null,I)),i["\u0275did"](13,16384,[[4,4]],0,u.H,[i.TemplateRef],null,null),(e()(),i["\u0275and"](0,null,null,1,null,k)),i["\u0275did"](15,16384,[[3,4]],0,u.F,[i.TemplateRef],null,null)],function(e,t){var n=t.component;e(t,1,0,!0,n.data.length,10,n.currentPageMinturRegisters,n.recordsByPageRegisterMintur)},null)}function w(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,36,"div",[["class","row"]],null,null,null,null,null)),(e()(),i["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(e()(),i["\u0275ted"](-1,null,[" Registros - MINTUR "])),(e()(),i["\u0275eld"](3,0,null,null,27,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),i["\u0275eld"](4,0,null,null,26,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(e()(),i["\u0275eld"](5,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),i["\u0275eld"](6,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.refresh()&&i),i},null,null)),(e()(),i["\u0275eld"](7,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(e()(),i["\u0275eld"](8,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),i["\u0275and"](16777216,null,null,1,null,y)),i["\u0275did"](10,16384,null,0,c.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),i["\u0275eld"](11,0,null,null,19,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),i["\u0275eld"](12,0,null,null,18,"div",[["class","input-group"]],null,null,null,null,null)),(e()(),i["\u0275eld"](13,0,null,null,3,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(e()(),i["\u0275eld"](14,0,null,null,2,"span",[["class","input-group-text"]],null,null,null,null,null)),(e()(),i["\u0275eld"](15,0,null,null,0,"i",[["class","fas fa-search"]],null,null,null,null,null)),(e()(),i["\u0275ted"](-1,null,["\xa0Bandejas"])),(e()(),i["\u0275eld"](17,0,null,null,11,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var l=!0,a=e.component;return"change"===t&&(l=!1!==i["\u0275nov"](e,18).onChange(n.target.value)&&l),"blur"===t&&(l=!1!==i["\u0275nov"](e,18).onTouched()&&l),"ngModelChange"===t&&(l=!1!==(a.idTramiteEstadoFilter=n)&&l),"change"===t&&(l=!1!==a.filterByTramiteState()&&l),l},null,null)),i["\u0275did"](18,16384,null,0,s.o,[i.Renderer2,i.ElementRef],null,null),i["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),i["\u0275did"](20,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),i["\u0275prd"](2048,null,s.i,null,[s.m]),i["\u0275did"](22,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),i["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),i["\u0275did"](24,147456,null,0,s.n,[i.ElementRef,i.Renderer2,[2,s.o]],{value:[0,"value"]},null),i["\u0275did"](25,147456,null,0,s.t,[i.ElementRef,i.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),i["\u0275ted"](-1,null,["Todas"])),(e()(),i["\u0275and"](16777216,null,null,1,null,R)),i["\u0275did"](28,278528,null,0,c.NgForOf,[i.ViewContainerRef,i.TemplateRef,i.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),i["\u0275and"](16777216,null,null,1,null,C)),i["\u0275did"](30,16384,null,0,c.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),i["\u0275eld"](31,0,null,null,2,"div",[["class","col-12 mt-2"],["style","width: 100%; overflow-x: auto;"]],null,null,null,null,null)),(e()(),i["\u0275eld"](32,0,null,null,1,"ng-table",[],null,[[null,"cellClicked"],[null,"tableChanged"]],function(e,t,n){var i=!0,l=e.component;return"cellClicked"===t&&(i=!1!==l.onCellClick(n)&&i),"tableChanged"===t&&(i=!1!==l.onChangeTable(l.config)&&i),i},d.b,d.a)),i["\u0275did"](33,49152,null,0,g.NgTableComponent,[p.DomSanitizer],{rows:[0,"rows"],config:[1,"config"],columns:[2,"columns"]},{tableChanged:"tableChanged",cellClicked:"cellClicked"}),(e()(),i["\u0275eld"](34,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),i["\u0275and"](16777216,null,null,1,null,T)),i["\u0275did"](36,16384,null,0,c.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(e,t){var n=t.component;e(t,10,0,n.config.filtering),e(t,20,0,"filter-tramite-estado",n.idTramiteEstadoFilter),e(t,24,0,"0"),e(t,25,0,"0"),e(t,28,0,n.estados_tramites),e(t,30,0,n.idTramiteEstadoFilter>0),e(t,33,0,n.rows,n.config,n.columns),e(t,36,0,n.config.paging)},function(e,t){e(t,17,0,i["\u0275nov"](t,22).ngClassUntouched,i["\u0275nov"](t,22).ngClassTouched,i["\u0275nov"](t,22).ngClassPristine,i["\u0275nov"](t,22).ngClassDirty,i["\u0275nov"](t,22).ngClassValid,i["\u0275nov"](t,22).ngClassInvalid,i["\u0275nov"](t,22).ngClassPending)})}var j=n("teKj"),D=n("SwDF"),P=n("jbLj"),F=n("2Tfx"),N=function(){function e(e,t,n,i,l){this.consultorDataService=e,this.state_alojamiento_DataService=t,this.state_alimentos_bebidas_DataService=n,this.userDataService=i,this.state_operacion_intermediacion_DataService=l,this.user=new f.a,this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types=[],this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]}}return e.prototype.ngOnInit=function(){this.getStates(),this.getRegisterTypes(),this.getUser()},e.prototype.getUser=function(){var e=this;this.userDataService.get(JSON.parse(sessionStorage.getItem("user")).id).then(function(t){e.user=t}).catch(function(e){return console.log(e)})},e.prototype.getRegisterTypes=function(){var e=this;this.register_types=[];var t=[],n=[],i=[];this.consultorDataService.get_all_register_types().then(function(l){e.register_types=l,e.register_types.forEach(function(e){1==e.activity_id&&t.push(e.register_type),2==e.activity_id&&n.push(e.register_type),3==e.activity_id&&i.push(e.register_type)}),e.register_types_block.register_types_alojamiento=t,e.register_types_block.register_types_alimentos_bebidas=n,e.register_types_block.register_types_operacion_intermediacion=i}).catch(function(e){console.log(e)})},e.prototype.getStates=function(){var e=this;this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.state_alojamiento_DataService.get().then(function(t){e.states.alojamiento=t,e.buildEstadostramite(e.states.alojamiento)}).catch(function(e){console.log(e)}),this.state_alimentos_bebidas_DataService.get().then(function(t){e.states.alimentos_bebidas=t,e.buildEstadostramite(e.states.alimentos_bebidas)}).catch(function(e){console.log(e)}),this.state_operacion_intermediacion_DataService.get().then(function(t){e.states.operacion_intermediacion=t,e.buildEstadostramite(e.states.operacion_intermediacion)}).catch(function(e){console.log(e)})},e.prototype.buildEstadostramite=function(e){var t=this;e.forEach(function(e){if("-"==e.father_code&&"Documentaci\xf3n Entregada"!=e.name){var n=!1;t.estados_tramites.forEach(function(t){t.name==e.name&&(n=!0)}),n||t.estados_tramites.push(e)}}),this.estados_tramites.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0})},e}(),z=i["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function O(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,1,"app-inspector-bandejas-data",[],null,null,null,w,b)),i["\u0275did"](1,638976,null,0,_,[m.a,v.a],{user:[0,"user"],estados_tramites:[1,"estados_tramites"],states:[2,"states"],register_types_block:[3,"register_types_block"]},null)],function(e,t){var n=t.component;e(t,1,0,n.user,n.estados_tramites,n.states,n.register_types_block)},null)}function M(e){return i["\u0275vid"](0,[(e()(),i["\u0275eld"](0,0,null,null,1,"app-cliente-interno-inspector",[],null,null,null,O,z)),i["\u0275did"](1,114688,null,0,N,[m.a,D.a,P.a,j.a,F.a],null,null)],function(e,t){e(t,1,0)},null)}var x=i["\u0275ccf"]("app-cliente-interno-inspector",N,M,{},{},[]),A=n("BBZF"),U=n("Izlp"),L=n("Ry/H"),V=n("rhjU"),q=n("sE5F"),B=n("dV+S"),K=n("ZYCi"),Y=n("3Cp6"),Z=n("rPlE"),G=n("H9RC"),J=n("yipI"),Q=n("+Uyi"),H=n("KhKY"),X=n("SSr2"),W=n("0Zic"),$=n("FVSd"),ee=n("wG/G"),te=n("A65b"),ne=n("z89T"),ie=n("hx3Q"),le=n("wftt"),ae=n("BRoz"),oe=n("b1Qd"),re=n("iYF/"),se=n("N6VH"),ue=n("ALPY"),ce=n("rCiw"),de=n("7q7Q"),ge=n("rYF7"),pe=n("vUtf"),he=n("1wkq"),me=n("tCKL"),fe=n("tZdX"),ve=n("eiqJ"),_e=n("7WnB"),be=n("FExI"),ye=n("FhSF"),Re=n("078p"),Ce=n("8Kln"),Ee=n("LqiL"),Se=n("EiH4"),Ie=n("V63N"),ke=n("vUqE"),Te=n("QkQD"),we=n("3Nac"),je=n("GSUL"),De=n("eYel"),Pe=n("mjTs"),Fe=n("Xzm7"),Ne=n("UGkY"),ze=n("XEkc"),Oe=n("7ePi"),Me=n("+o/m"),xe=n("/fSM"),Ae=n("jVYb"),Ue=n("kY/A"),Le=function(){return function(){}}();n.d(t,"ClienteInternoInspectorModuleNgFactory",function(){return Ve});var Ve=i["\u0275cmf"](l,[],function(e){return i["\u0275mod"]([i["\u0275mpd"](512,i.ComponentFactoryResolver,i["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,a.b,a.l,a.m,a.i,a.j,a.k,o.a,x]],[3,i.ComponentFactoryResolver],i.NgModuleRef]),i["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[i.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),i["\u0275mpd"](4608,s.s,s.s,[]),i["\u0275mpd"](4608,u.y,u.y,[i.ComponentFactoryResolver,i.Injector,u.tb,u.z]),i["\u0275mpd"](4608,A.c,A.c,[]),i["\u0275mpd"](4608,A.b,A.b,[]),i["\u0275mpd"](4608,U.a,L.b,[[2,L.a],A.c,A.b]),i["\u0275mpd"](4608,V.b,V.b,[c.DOCUMENT,i.PLATFORM_ID]),i["\u0275mpd"](4608,j.a,j.a,[q.e]),i["\u0275mpd"](4608,B.a,B.a,[q.e,K.l]),i["\u0275mpd"](4608,Y.a,Y.a,[q.e,K.l]),i["\u0275mpd"](4608,Z.a,Z.a,[q.e,K.l]),i["\u0275mpd"](4608,G.a,G.a,[q.e,K.l]),i["\u0275mpd"](4608,J.a,J.a,[q.e,K.l]),i["\u0275mpd"](4608,Q.a,Q.a,[q.e,K.l]),i["\u0275mpd"](4608,H.a,H.a,[q.e,K.l]),i["\u0275mpd"](4608,m.a,m.a,[q.e,K.l]),i["\u0275mpd"](4608,X.a,X.a,[q.e,K.l]),i["\u0275mpd"](4608,W.a,W.a,[q.e,K.l]),i["\u0275mpd"](4608,$.a,$.a,[q.e,K.l]),i["\u0275mpd"](4608,ee.a,ee.a,[q.e,K.l]),i["\u0275mpd"](4608,te.a,te.a,[q.e,K.l]),i["\u0275mpd"](4608,ne.a,ne.a,[q.e,K.l]),i["\u0275mpd"](4608,ie.a,ie.a,[q.e,K.l]),i["\u0275mpd"](4608,le.a,le.a,[q.e,K.l]),i["\u0275mpd"](4608,ae.a,ae.a,[q.e,K.l]),i["\u0275mpd"](4608,oe.a,oe.a,[q.e,K.l]),i["\u0275mpd"](4608,re.a,re.a,[q.e,K.l]),i["\u0275mpd"](4608,se.a,se.a,[q.e,K.l]),i["\u0275mpd"](4608,ue.a,ue.a,[q.e,K.l]),i["\u0275mpd"](4608,ce.a,ce.a,[q.e,K.l]),i["\u0275mpd"](4608,de.a,de.a,[q.e,K.l]),i["\u0275mpd"](4608,ge.a,ge.a,[q.e,K.l]),i["\u0275mpd"](4608,pe.a,pe.a,[q.e,K.l]),i["\u0275mpd"](4608,he.a,he.a,[q.e,K.l]),i["\u0275mpd"](4608,me.a,me.a,[q.e,K.l]),i["\u0275mpd"](4608,fe.a,fe.a,[q.e,K.l]),i["\u0275mpd"](4608,ve.a,ve.a,[q.e,K.l]),i["\u0275mpd"](4608,_e.a,_e.a,[q.e,K.l]),i["\u0275mpd"](4608,be.a,be.a,[q.e,K.l]),i["\u0275mpd"](4608,ye.a,ye.a,[q.e,K.l]),i["\u0275mpd"](4608,Re.a,Re.a,[q.e,K.l]),i["\u0275mpd"](4608,Ce.a,Ce.a,[q.e,K.l]),i["\u0275mpd"](4608,Ee.a,Ee.a,[q.e,K.l]),i["\u0275mpd"](4608,Se.a,Se.a,[q.e,K.l]),i["\u0275mpd"](4608,Ie.a,Ie.a,[q.e,K.l]),i["\u0275mpd"](4608,ke.a,ke.a,[q.e,K.l]),i["\u0275mpd"](4608,Te.a,Te.a,[q.e,K.l]),i["\u0275mpd"](4608,we.a,we.a,[q.e,K.l]),i["\u0275mpd"](4608,je.a,je.a,[q.e,K.l]),i["\u0275mpd"](4608,De.a,De.a,[q.e,K.l]),i["\u0275mpd"](4608,v.a,v.a,[q.e,K.l]),i["\u0275mpd"](4608,Pe.a,Pe.a,[q.e,K.l]),i["\u0275mpd"](4608,Fe.a,Fe.a,[q.e,K.l]),i["\u0275mpd"](4608,Ne.a,Ne.a,[q.e,K.l]),i["\u0275mpd"](4608,ze.a,ze.a,[q.e,K.l]),i["\u0275mpd"](4608,D.a,D.a,[q.e,K.l]),i["\u0275mpd"](4608,P.a,P.a,[q.e,K.l]),i["\u0275mpd"](4608,F.a,F.a,[q.e,K.l]),i["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),i["\u0275mpd"](1073742336,s.p,s.p,[]),i["\u0275mpd"](1073742336,s.e,s.e,[]),i["\u0275mpd"](1073742336,u.c,u.c,[]),i["\u0275mpd"](1073742336,u.f,u.f,[]),i["\u0275mpd"](1073742336,u.g,u.g,[]),i["\u0275mpd"](1073742336,u.k,u.k,[]),i["\u0275mpd"](1073742336,u.l,u.l,[]),i["\u0275mpd"](1073742336,u.q,u.q,[]),i["\u0275mpd"](1073742336,u.v,u.v,[]),i["\u0275mpd"](1073742336,u.A,u.A,[]),i["\u0275mpd"](1073742336,u.G,u.G,[]),i["\u0275mpd"](1073742336,u.Q,u.Q,[]),i["\u0275mpd"](1073742336,u.T,u.T,[]),i["\u0275mpd"](1073742336,u.W,u.W,[]),i["\u0275mpd"](1073742336,u.bb,u.bb,[]),i["\u0275mpd"](1073742336,u.fb,u.fb,[]),i["\u0275mpd"](1073742336,u.gb,u.gb,[]),i["\u0275mpd"](1073742336,u.hb,u.hb,[]),i["\u0275mpd"](1073742336,u.B,u.B,[]),i["\u0275mpd"](1073742336,Oe.b,Oe.b,[]),i["\u0275mpd"](1073742336,Me.b,Me.b,[]),i["\u0275mpd"](1073742336,xe.a,xe.a,[]),i["\u0275mpd"](1073742336,Ae.b,Ae.b,[]),i["\u0275mpd"](1073742336,Ue.Ng2TableModule,Ue.Ng2TableModule,[]),i["\u0275mpd"](1073742336,V.a,V.a,[]),i["\u0275mpd"](1073742336,K.o,K.o,[[2,K.u],[2,K.l]]),i["\u0275mpd"](1073742336,Le,Le,[]),i["\u0275mpd"](1073742336,l,l,[]),i["\u0275mpd"](1024,K.j,function(){return[[{path:"",component:N}]]},[]),i["\u0275mpd"](256,L.a,{apiKey:"AIzaSyCGUwCcM-LKjRK4rjbBJ06_GLmX2LaYzfg"},[])])})}}]);