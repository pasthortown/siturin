(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{iZSA:function(e,n,l){"use strict";l.r(n);var t=l("CcnG"),a=function(){return function(){}}(),i=l("9AJC"),r=l("pMnS"),o=l("Vnl2"),s=l("gIcY"),u=l("4GxJ"),c=l("Ip0R"),d=l("cfkQ"),g=l("z8lh"),m=l("ZYjt"),p=l("qYr5"),f=l("XqKP"),h=l("7QCc"),_=l("iNZF"),v=l("c4FF"),b=l("m3oD"),y=function(){function e(e,n){this.consultorDataService=e,this.ubicationDataService=n,this.user=new v.a,this.change=new t.EventEmitter,this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]},this.config={paging:!0,filtering:{filterString:""},className:["table-striped","table-hover","table-bordered"]},this.rows=[],this.columns=[],this.data=[],this.currentPageMinturRegisters=1,this.lastPageMinturRegisters=1,this.recordsByPageRegisterMintur=5,this.ubications=[],this.registers_mintur=[],this.idTramiteEstadoFilter=0}return e.prototype.ngOnInit=function(){this.loadCatalogos(),this.refresh()},e.prototype.ngOnChanges=function(){this.refresh()},e.prototype.loadCatalogos=function(){this.getUbications()},e.prototype.refresh=function(){var e={row:null,register:{register:null,activity_id:0,activity:"",establishment:new f.a,ruc:new p.a,states:null,register_data_on_catastro:null}};this.change.emit(e),this.getRegistersMintur()},e.prototype.getUbications=function(){var e=this;this.ubications=[],this.ubicationDataService.get().then(function(n){e.ubications=n}).catch(function(e){console.log(e)})},e.prototype.filterByTramiteState=function(e){var n=this,l="";this.estados_tramites.forEach(function(e){e.id==n.idTramiteEstadoFilter&&(l=e.name)}),this.config.filtering=void 0!==e?"-"==e?{filterString:l}:{filterString:l+" - "+e}:{filterString:l},this.onChangeTable(this.config)},e.prototype.getRegistersMintur=function(){var e=this;this.registers_mintur=[],this.consultorDataService.get_registers_assigned_inspector_id(this.user.id).then(function(n){e.registers_mintur=n,e.buildDataTable()}).catch(function(e){return console.log(e)})},e.prototype.buildDataTable=function(){var e=this;this.columns=[{title:"",name:"selected"},{title:"N\xfamero de RUC",name:"number"},{title:"N\xfamero de Establecimiento",name:"ruc_code_id"},{title:"Nombre Comercial",name:"establishment"},{title:"Sistema de Origen",name:"system_source"},{title:"Bandeja",name:"status"},{title:"Actividad",name:"actividad"},{title:"Provincia",name:"provincia"},{title:"Cant\xf3n",name:"canton"},{title:"Parroquia",name:"parroquia"},{title:"Direcci\xf3n",name:"address"},{title:"Clasificaci\xf3n - Categor\xeda",name:"category"},{title:"Fecha de Solicitud",name:"created_at"},{title:"N\xfamero de Registro",name:"code"},{title:"Fecha de Asignaci\xf3n",name:"date_assigment"}];var n=[];this.registers_mintur.forEach(function(l){var t="",a=new Date,i=e.getRegisterState(l.states.state_id,l.activity_id);0==i.search("Aprobado")&&(a=new Date(l.states.updated_at)),0==i.search("Negado")&&(a=new Date(l.states.updated_at));var r=new Date(l.register.created_at),o=Math.abs(r.getTime()-a.getTime()),s=Math.ceil(o/864e5);s<7&&(t='<div class="col-12 text-center"><span class="badge badge-success">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>=7&&s<=10&&(t='<div class="col-12 text-center"><span class="badge badge-warning">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>10&&(t='<div class="col-12 text-center"><span class="badge badge-danger">&nbsp;'+s.toString()+"&nbsp;</span></div>");var u=l.states.state_id.toString(),c=u.substring(u.length-1,u.length),d=new h.a,g=new h.a,m=new h.a;new h.a,e.ubications.forEach(function(e){e.id==l.establishment.ubication_id&&(m=e)}),e.ubications.forEach(function(e){e.code==m.father_code&&(g=e)}),e.ubications.forEach(function(e){e.code==g.father_code&&(d=e)}),e.ubications.forEach(function(e){});var p="";if(p="5"==l.states.state_id.toString().substring(0,1)||"60"==l.states.state_id.toString()?""==l.register_data_on_catastro.classification?e.getRegisterCategory(l.register.register_type_id,l.activity_id).toString():l.register_data_on_catastro.classification.toString()+" - "+l.register_data_on_catastro.category.toString():e.getRegisterCategory(l.register.register_type_id,l.activity_id).toString(),"4"==c||"5"==c||"6"==c){var f=new Date(l.register.created_at.toString());n.push({selected:"",date_assigment_alert:t,number:l.ruc.number,date_assigment:new Date(l.register.date_assigment.toString()).toLocaleDateString(),registerId:l.register.id,actividad:l.activity,provincia:d.name,canton:g.name,parroquia:m.name,ruc_code_id:l.establishment.ruc_code_id,establishment:l.establishment.commercially_known_name,address:l.establishment.address_main_street+" "+l.establishment.address_number+" "+l.establishment.address_secondary_street,created_at:f.toLocaleDateString(),code:l.register.code,category:p.toUpperCase(),catastro_category:l.register_data_on_catastro.category.toUpperCase(),catastro_classification:l.register_data_on_catastro.classification.toUpperCase(),system_source:l.register_data_on_catastro.system_source,status:i,status_id:l.states.state_id})}}),this.data=n,this.onChangeTable(this.config)},e.prototype.getRegisterCategory=function(e,n){var l="",t="";return 1==n&&(this.register_types_block.register_types_alojamiento.forEach(function(n){n.id==e&&(l=n.name,t=n.father_code)}),this.register_types_block.register_types_alojamiento.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),2==n&&(this.register_types_block.register_types_alimentos_bebidas.forEach(function(n){n.id==e&&(l=n.name,"Pendiente"==n.name&&(l="No Cumple Inspecci\xf3n (No Tur\xedstico)"),t=n.father_code)}),this.register_types_block.register_types_alimentos_bebidas.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),3==n&&(this.register_types_block.register_types_operacion_intermediacion.forEach(function(n){n.id==e&&(l=n.name,t=n.father_code)}),this.register_types_block.register_types_operacion_intermediacion.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),l},e.prototype.getRegisterState=function(e,n){var l="",t="";return 1==n&&(this.states.alojamiento.forEach(function(n){n.id==e&&(l=n.name,t=n.father_code)}),this.states.alojamiento.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),2==n&&(this.states.alimentos_bebidas.forEach(function(n){n.id==e&&(l=n.name,t=n.father_code)}),this.states.alimentos_bebidas.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),3==n&&(this.states.operacion_intermediacion.forEach(function(n){n.id==e&&(l=n.name,t=n.father_code)}),this.states.operacion_intermediacion.forEach(function(e){e.code==t&&(l=e.name+" - "+l)})),l},e.prototype.onChangeTable=function(e,n){var l={page:this.currentPageMinturRegisters,itemsPerPage:this.recordsByPageRegisterMintur};e.filtering&&Object.assign(this.config.filtering,e.filtering),e.sorting&&Object.assign(this.config.sorting,e.sorting);var t=this.changeFilter(this.data,this.config),a=this.changeSort(t,this.config);this.rows=l&&e.paging?this.changePage(l,a):a},e.prototype.changeFilter=function(e,n){var l=this;this.rows.forEach(function(e){e.selected=""});var t=e;if(this.columns.forEach(function(e){e.filtering&&(t=t.filter(function(n){return n[e.name].toUpperCase().match(e.filtering.filterString.toUpperCase())}))}),!n.filtering)return t;if(n.filtering.columnName)return t.filter(function(e){return e[n.filtering.columnName].match(l.config.filtering.filterString)});var a=[];return t.forEach(function(e){var n=!1;l.columns.forEach(function(t){e[t.name].toString().match(l.config.filtering.filterString)&&(n=!0)}),n&&a.push(e)}),t=a},e.prototype.changeSort=function(e,n){if(!n.sorting)return e;for(var l=this.config.sorting.columns||[],t=void 0,a=void 0,i=0;i<l.length;i++)""!==l[i].sort&&!1!==l[i].sort&&(t=l[i].name,a=l[i].sort);return t?e.sort(function(e,n){return e[t]>n[t]?"desc"===a?-1:1:e[t]<n[t]?"asc"===a?-1:1:0}):e},e.prototype.changePage=function(e,n){void 0===n&&(n=this.data);var l=(e.page-1)*e.itemsPerPage;return n.slice(l,e.itemsPerPage>-1?l+e.itemsPerPage:n.length)},e.prototype.onCellClick=function(e){var n=e.row.actividad,l=e.row.registerId,t={row:null,register:{register:null,activity_id:0,activity:"",establishment:new f.a,ruc:new p.a,states:null,register_data_on_catastro:null}};this.rows.forEach(function(n){n.selected=e.row==n?'<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>':""}),this.registers_mintur.forEach(function(e){e.register.id==l&&e.activity==n&&(t.register=e)}),this.change.emit(t)},e}(),R=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function C(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,1,"input",[["class","form-control"],["placeholder","Buscar..."]],null,[[null,"input"]],function(e,n,l){var a=!0,i=e.component;return"input"===n&&(a=!1!==t["\u0275nov"](e,1).onChangeFilter(l.target.value)&&a),"input"===n&&(a=!1!==i.onChangeTable(i.config)&&a),a},null,null)),t["\u0275did"](1,16384,null,0,o.NgTableFilteringDirective,[t.ElementRef,t.Renderer],{ngTableFiltering:[0,"ngTableFiltering"]},null)],function(e,n){e(n,1,0,n.component.config.filtering)},null)}function E(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](3,null,["",""]))],function(e,n){e(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),e(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(e,n){e(n,3,0,n.context.$implicit.name)})}function S(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,34,"div",[["class","input-group-append"]],null,null,null,null,null)),(e()(),t["\u0275eld"](1,0,null,null,33,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,n,l){var a=!0,i=e.component;return"change"===n&&(a=!1!==t["\u0275nov"](e,2).onChange(l.target.value)&&a),"blur"===n&&(a=!1!==t["\u0275nov"](e,2).onTouched()&&a),"ngModelChange"===n&&(a=!1!==(i.tramite=l)&&a),"change"===n&&(a=!1!==i.filterByTramiteState(i.tramite)&&a),a},null,null)),t["\u0275did"](2,16384,null,0,s.o,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),t["\u0275did"](4,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,s.i,null,[s.m]),t["\u0275did"](6,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),t["\u0275eld"](7,0,null,null,3,"option",[["selected",""],["value","-"]],null,null,null,null,null)),t["\u0275did"](8,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](9,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Todas"])),(e()(),t["\u0275eld"](11,0,null,null,3,"option",[["selected",""],["value","Registro"]],null,null,null,null,null)),t["\u0275did"](12,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](13,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Registro"])),(e()(),t["\u0275eld"](15,0,null,null,3,"option",[["selected",""],["value","Reclasificaci\xf3n"]],null,null,null,null,null)),t["\u0275did"](16,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](17,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Reclasificaci\xf3n"])),(e()(),t["\u0275eld"](19,0,null,null,3,"option",[["selected",""],["value","Recategorizaci\xf3n"]],null,null,null,null,null)),t["\u0275did"](20,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](21,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Recategorizaci\xf3n"])),(e()(),t["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","Actualizaci\xf3n"]],null,null,null,null,null)),t["\u0275did"](24,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](25,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Actualizaci\xf3n"])),(e()(),t["\u0275eld"](27,0,null,null,3,"option",[["selected",""],["value","Inactivaci\xf3n"]],null,null,null,null,null)),t["\u0275did"](28,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](29,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Inactivaci\xf3n"])),(e()(),t["\u0275eld"](31,0,null,null,3,"option",[["selected",""],["value","Reingreso"]],null,null,null,null,null)),t["\u0275did"](32,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](33,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Reingreso"]))],function(e,n){e(n,4,0,"filter-tramite-estado",n.component.tramite),e(n,8,0,"-"),e(n,9,0,"-"),e(n,12,0,"Registro"),e(n,13,0,"Registro"),e(n,16,0,"Reclasificaci\xf3n"),e(n,17,0,"Reclasificaci\xf3n"),e(n,20,0,"Recategorizaci\xf3n"),e(n,21,0,"Recategorizaci\xf3n"),e(n,24,0,"Actualizaci\xf3n"),e(n,25,0,"Actualizaci\xf3n"),e(n,28,0,"Inactivaci\xf3n"),e(n,29,0,"Inactivaci\xf3n"),e(n,32,0,"Reingreso"),e(n,33,0,"Reingreso")},function(e,n){e(n,1,0,t["\u0275nov"](n,6).ngClassUntouched,t["\u0275nov"](n,6).ngClassTouched,t["\u0275nov"](n,6).ngClassPristine,t["\u0275nov"](n,6).ngClassDirty,t["\u0275nov"](n,6).ngClassValid,t["\u0275nov"](n,6).ngClassInvalid,t["\u0275nov"](n,6).ngClassPending)})}function w(e){return t["\u0275vid"](0,[(e()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function T(e){return t["\u0275vid"](0,[(e()(),t["\u0275ted"](-1,null,["Anterior"]))],null,null)}function D(e){return t["\u0275vid"](0,[(e()(),t["\u0275ted"](-1,null,["Siguiente"]))],null,null)}function k(e){return t["\u0275vid"](0,[(e()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function I(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,15,"ngb-pagination",[["role","navigation"]],null,[[null,"pageChange"]],function(e,n,l){var t=!0,a=e.component;return"pageChange"===n&&(t=!1!==(a.currentPageMinturRegisters=l)&&t),"pageChange"===n&&(t=!1!==a.onChangeTable(a.config,l)&&t),t},i.g,i.d)),t["\u0275did"](1,573440,null,6,u.C,[u.D],{boundaryLinks:[0,"boundaryLinks"],collectionSize:[1,"collectionSize"],maxSize:[2,"maxSize"],page:[3,"page"],pageSize:[4,"pageSize"]},{pageChange:"pageChange"}),t["\u0275qud"](335544320,1,{tplEllipsis:0}),t["\u0275qud"](335544320,2,{tplFirst:0}),t["\u0275qud"](335544320,3,{tplLast:0}),t["\u0275qud"](335544320,4,{tplNext:0}),t["\u0275qud"](335544320,5,{tplNumber:0}),t["\u0275qud"](335544320,6,{tplPrevious:0}),(e()(),t["\u0275and"](0,null,null,1,null,w)),t["\u0275did"](9,16384,[[2,4]],0,u.E,[t.TemplateRef],null,null),(e()(),t["\u0275and"](0,null,null,1,null,T)),t["\u0275did"](11,16384,[[6,4]],0,u.I,[t.TemplateRef],null,null),(e()(),t["\u0275and"](0,null,null,1,null,D)),t["\u0275did"](13,16384,[[4,4]],0,u.H,[t.TemplateRef],null,null),(e()(),t["\u0275and"](0,null,null,1,null,k)),t["\u0275did"](15,16384,[[3,4]],0,u.F,[t.TemplateRef],null,null)],function(e,n){var l=n.component;e(n,1,0,!0,l.data.length,10,l.currentPageMinturRegisters,l.recordsByPageRegisterMintur)},null)}function F(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,36,"div",[["class","row"]],null,null,null,null,null)),(e()(),t["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(e()(),t["\u0275ted"](-1,null,[" Registros - MINTUR "])),(e()(),t["\u0275eld"](3,0,null,null,27,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),t["\u0275eld"](4,0,null,null,26,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(e()(),t["\u0275eld"](5,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),t["\u0275eld"](6,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(e,n,l){var t=!0;return"click"===n&&(t=!1!==e.component.refresh()&&t),t},null,null)),(e()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(e()(),t["\u0275eld"](8,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](10,16384,null,0,c.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),t["\u0275eld"](11,0,null,null,19,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),t["\u0275eld"](12,0,null,null,18,"div",[["class","input-group"]],null,null,null,null,null)),(e()(),t["\u0275eld"](13,0,null,null,3,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(e()(),t["\u0275eld"](14,0,null,null,2,"span",[["class","input-group-text"]],null,null,null,null,null)),(e()(),t["\u0275eld"](15,0,null,null,0,"i",[["class","fas fa-search"]],null,null,null,null,null)),(e()(),t["\u0275ted"](-1,null,["\xa0Bandejas"])),(e()(),t["\u0275eld"](17,0,null,null,11,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,n,l){var a=!0,i=e.component;return"change"===n&&(a=!1!==t["\u0275nov"](e,18).onChange(l.target.value)&&a),"blur"===n&&(a=!1!==t["\u0275nov"](e,18).onTouched()&&a),"ngModelChange"===n&&(a=!1!==(i.idTramiteEstadoFilter=l)&&a),"change"===n&&(a=!1!==i.filterByTramiteState()&&a),a},null,null)),t["\u0275did"](18,16384,null,0,s.o,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),t["\u0275did"](20,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,s.i,null,[s.m]),t["\u0275did"](22,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),t["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),t["\u0275did"](24,147456,null,0,s.n,[t.ElementRef,t.Renderer2,[2,s.o]],{value:[0,"value"]},null),t["\u0275did"](25,147456,null,0,s.t,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),t["\u0275ted"](-1,null,["Todas"])),(e()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](28,278528,null,0,c.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](30,16384,null,0,c.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),t["\u0275eld"](31,0,null,null,2,"div",[["class","col-12 mt-2"],["style","width: 100%; overflow-x: auto;"]],null,null,null,null,null)),(e()(),t["\u0275eld"](32,0,null,null,1,"ng-table",[],null,[[null,"cellClicked"],[null,"tableChanged"]],function(e,n,l){var t=!0,a=e.component;return"cellClicked"===n&&(t=!1!==a.onCellClick(l)&&t),"tableChanged"===n&&(t=!1!==a.onChangeTable(a.config)&&t),t},d.b,d.a)),t["\u0275did"](33,49152,null,0,g.NgTableComponent,[m.DomSanitizer],{rows:[0,"rows"],config:[1,"config"],columns:[2,"columns"]},{tableChanged:"tableChanged",cellClicked:"cellClicked"}),(e()(),t["\u0275eld"](34,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](36,16384,null,0,c.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(e,n){var l=n.component;e(n,10,0,l.config.filtering),e(n,20,0,"filter-tramite-estado",l.idTramiteEstadoFilter),e(n,24,0,"0"),e(n,25,0,"0"),e(n,28,0,l.estados_tramites),e(n,30,0,l.idTramiteEstadoFilter>0),e(n,33,0,l.rows,l.config,l.columns),e(n,36,0,l.config.paging)},function(e,n){e(n,17,0,t["\u0275nov"](n,22).ngClassUntouched,t["\u0275nov"](n,22).ngClassTouched,t["\u0275nov"](n,22).ngClassPristine,t["\u0275nov"](n,22).ngClassDirty,t["\u0275nov"](n,22).ngClassValid,t["\u0275nov"](n,22).ngClassInvalid,t["\u0275nov"](n,22).ngClassPending)})}var j=function(){function e(){}return e.prototype.ngOnInit=function(){},e}(),P=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function N(e){return t["\u0275vid"](0,[(e()(),t["\u0275ted"](-1,null,["inspector-gestion-data dont works"]))],null,null)}var M=l("DaJy"),z=l("Guh9"),U=l("teKj"),L=l("SwDF"),A=l("jbLj"),q=l("2Tfx"),x=function(){function e(e,n,l,t,a){this.consultorDataService=e,this.state_alojamiento_DataService=n,this.state_alimentos_bebidas_DataService=l,this.userDataService=t,this.state_operacion_intermediacion_DataService=a,this.user=new v.a,this.data_selected={row:null,register:null},this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types=[],this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]}}return e.prototype.ngOnInit=function(){this.getStates(),this.getRegisterTypes(),this.getUser()},e.prototype.getUser=function(){var e=this;this.userDataService.get(JSON.parse(sessionStorage.getItem("user")).id).then(function(n){e.user=n}).catch(function(e){return console.log(e)})},e.prototype.getRegisterTypes=function(){var e=this;this.register_types=[];var n=[],l=[],t=[];this.consultorDataService.get_all_register_types().then(function(a){e.register_types=a,e.register_types.forEach(function(e){1==e.activity_id&&n.push(e.register_type),2==e.activity_id&&l.push(e.register_type),3==e.activity_id&&t.push(e.register_type)}),e.register_types_block.register_types_alojamiento=n,e.register_types_block.register_types_alimentos_bebidas=l,e.register_types_block.register_types_operacion_intermediacion=t}).catch(function(e){console.log(e)})},e.prototype.getStates=function(){var e=this;this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.state_alojamiento_DataService.get().then(function(n){e.states.alojamiento=n,e.buildEstadostramite(e.states.alojamiento)}).catch(function(e){console.log(e)}),this.state_alimentos_bebidas_DataService.get().then(function(n){e.states.alimentos_bebidas=n,e.buildEstadostramite(e.states.alimentos_bebidas)}).catch(function(e){console.log(e)}),this.state_operacion_intermediacion_DataService.get().then(function(n){e.states.operacion_intermediacion=n,e.buildEstadostramite(e.states.operacion_intermediacion)}).catch(function(e){console.log(e)})},e.prototype.buildEstadostramite=function(e){var n=this;e.forEach(function(e){if("-"==e.father_code&&"Documentaci\xf3n Entregada"!=e.name){var l=!1;n.estados_tramites.forEach(function(n){n.name==e.name&&(l=!0)}),l||n.estados_tramites.push(e)}}),this.estados_tramites.sort(function(e,n){return e.name>n.name?1:e.name<n.name?-1:0})},e.prototype.register_selected=function(e){this.data_selected=e},e}(),B=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function O(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,1,"app-inspector-bandejas-data",[],null,[[null,"register_selected"]],function(e,n,l){var t=!0;return"register_selected"===n&&(t=!1!==e.component.register_selected(l)&&t),t},F,R)),t["\u0275did"](1,638976,null,0,y,[_.a,b.a],{user:[0,"user"],estados_tramites:[1,"estados_tramites"],states:[2,"states"],register_types_block:[3,"register_types_block"]},{change:"register_selected"}),(e()(),t["\u0275eld"](2,0,null,null,1,"app-inspector-gestion-data",[],null,null,null,N,P)),t["\u0275did"](3,114688,null,0,j,[],null,null),(e()(),t["\u0275eld"](4,0,null,null,1,"app-register-data",[],null,null,null,M.b,M.a)),t["\u0275did"](5,638976,null,0,z.a,[_.a],{data_selected_table:[0,"data_selected_table"]},null)],function(e,n){var l=n.component;e(n,1,0,l.user,l.estados_tramites,l.states,l.register_types_block),e(n,3,0),e(n,5,0,l.data_selected)},null)}function V(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,1,"app-cliente-interno-inspector",[],null,null,null,O,B)),t["\u0275did"](1,114688,null,0,x,[_.a,L.a,A.a,U.a,q.a],null,null)],function(e,n){e(n,1,0)},null)}var Y=t["\u0275ccf"]("app-cliente-interno-inspector",x,V,{},{},[]),G=l("BBZF"),K=l("Izlp"),Q=l("Ry/H"),J=l("rhjU"),Z=l("sE5F"),H=l("dV+S"),X=l("ZYCi"),W=l("3Cp6"),$=l("rPlE"),ee=l("H9RC"),ne=l("yipI"),le=l("+Uyi"),te=l("KhKY"),ae=l("SSr2"),ie=l("0Zic"),re=l("FVSd"),oe=l("wG/G"),se=l("A65b"),ue=l("z89T"),ce=l("hx3Q"),de=l("wftt"),ge=l("BRoz"),me=l("b1Qd"),pe=l("iYF/"),fe=l("N6VH"),he=l("ALPY"),_e=l("rCiw"),ve=l("7q7Q"),be=l("rYF7"),ye=l("vUtf"),Re=l("1wkq"),Ce=l("tCKL"),Ee=l("tZdX"),Se=l("eiqJ"),we=l("7WnB"),Te=l("FExI"),De=l("FhSF"),ke=l("078p"),Ie=l("8Kln"),Fe=l("LqiL"),je=l("EiH4"),Pe=l("V63N"),Ne=l("vUqE"),Me=l("QkQD"),ze=l("3Nac"),Ue=l("GSUL"),Le=l("eYel"),Ae=l("mjTs"),qe=l("Xzm7"),xe=l("UGkY"),Be=l("XEkc"),Oe=l("7ePi"),Ve=l("+o/m"),Ye=l("/fSM"),Ge=l("jVYb"),Ke=l("kY/A"),Qe=function(){return function(){}}(),Je=l("524+"),Ze=l("Vw1a");l.d(n,"ClienteInternoInspectorModuleNgFactory",function(){return He});var He=t["\u0275cmf"](a,[],function(e){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,i.b,i.l,i.m,i.i,i.j,i.k,r.a,Y]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[t.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,s.s,s.s,[]),t["\u0275mpd"](4608,u.y,u.y,[t.ComponentFactoryResolver,t.Injector,u.tb,u.z]),t["\u0275mpd"](4608,G.c,G.c,[]),t["\u0275mpd"](4608,G.b,G.b,[]),t["\u0275mpd"](4608,K.a,Q.b,[[2,Q.a],G.c,G.b]),t["\u0275mpd"](4608,J.b,J.b,[c.DOCUMENT,t.PLATFORM_ID]),t["\u0275mpd"](4608,U.a,U.a,[Z.e]),t["\u0275mpd"](4608,H.a,H.a,[Z.e,X.l]),t["\u0275mpd"](4608,W.a,W.a,[Z.e,X.l]),t["\u0275mpd"](4608,$.a,$.a,[Z.e,X.l]),t["\u0275mpd"](4608,ee.a,ee.a,[Z.e,X.l]),t["\u0275mpd"](4608,ne.a,ne.a,[Z.e,X.l]),t["\u0275mpd"](4608,le.a,le.a,[Z.e,X.l]),t["\u0275mpd"](4608,te.a,te.a,[Z.e,X.l]),t["\u0275mpd"](4608,_.a,_.a,[Z.e,X.l]),t["\u0275mpd"](4608,ae.a,ae.a,[Z.e,X.l]),t["\u0275mpd"](4608,ie.a,ie.a,[Z.e,X.l]),t["\u0275mpd"](4608,re.a,re.a,[Z.e,X.l]),t["\u0275mpd"](4608,oe.a,oe.a,[Z.e,X.l]),t["\u0275mpd"](4608,se.a,se.a,[Z.e,X.l]),t["\u0275mpd"](4608,ue.a,ue.a,[Z.e,X.l]),t["\u0275mpd"](4608,ce.a,ce.a,[Z.e,X.l]),t["\u0275mpd"](4608,de.a,de.a,[Z.e,X.l]),t["\u0275mpd"](4608,ge.a,ge.a,[Z.e,X.l]),t["\u0275mpd"](4608,me.a,me.a,[Z.e,X.l]),t["\u0275mpd"](4608,pe.a,pe.a,[Z.e,X.l]),t["\u0275mpd"](4608,fe.a,fe.a,[Z.e,X.l]),t["\u0275mpd"](4608,he.a,he.a,[Z.e,X.l]),t["\u0275mpd"](4608,_e.a,_e.a,[Z.e,X.l]),t["\u0275mpd"](4608,ve.a,ve.a,[Z.e,X.l]),t["\u0275mpd"](4608,be.a,be.a,[Z.e,X.l]),t["\u0275mpd"](4608,ye.a,ye.a,[Z.e,X.l]),t["\u0275mpd"](4608,Re.a,Re.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ce.a,Ce.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ee.a,Ee.a,[Z.e,X.l]),t["\u0275mpd"](4608,Se.a,Se.a,[Z.e,X.l]),t["\u0275mpd"](4608,we.a,we.a,[Z.e,X.l]),t["\u0275mpd"](4608,Te.a,Te.a,[Z.e,X.l]),t["\u0275mpd"](4608,De.a,De.a,[Z.e,X.l]),t["\u0275mpd"](4608,ke.a,ke.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ie.a,Ie.a,[Z.e,X.l]),t["\u0275mpd"](4608,Fe.a,Fe.a,[Z.e,X.l]),t["\u0275mpd"](4608,je.a,je.a,[Z.e,X.l]),t["\u0275mpd"](4608,Pe.a,Pe.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ne.a,Ne.a,[Z.e,X.l]),t["\u0275mpd"](4608,Me.a,Me.a,[Z.e,X.l]),t["\u0275mpd"](4608,ze.a,ze.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ue.a,Ue.a,[Z.e,X.l]),t["\u0275mpd"](4608,Le.a,Le.a,[Z.e,X.l]),t["\u0275mpd"](4608,b.a,b.a,[Z.e,X.l]),t["\u0275mpd"](4608,Ae.a,Ae.a,[Z.e,X.l]),t["\u0275mpd"](4608,qe.a,qe.a,[Z.e,X.l]),t["\u0275mpd"](4608,xe.a,xe.a,[Z.e,X.l]),t["\u0275mpd"](4608,Be.a,Be.a,[Z.e,X.l]),t["\u0275mpd"](4608,L.a,L.a,[Z.e,X.l]),t["\u0275mpd"](4608,A.a,A.a,[Z.e,X.l]),t["\u0275mpd"](4608,q.a,q.a,[Z.e,X.l]),t["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),t["\u0275mpd"](1073742336,s.p,s.p,[]),t["\u0275mpd"](1073742336,s.e,s.e,[]),t["\u0275mpd"](1073742336,u.c,u.c,[]),t["\u0275mpd"](1073742336,u.f,u.f,[]),t["\u0275mpd"](1073742336,u.g,u.g,[]),t["\u0275mpd"](1073742336,u.k,u.k,[]),t["\u0275mpd"](1073742336,u.l,u.l,[]),t["\u0275mpd"](1073742336,u.q,u.q,[]),t["\u0275mpd"](1073742336,u.v,u.v,[]),t["\u0275mpd"](1073742336,u.A,u.A,[]),t["\u0275mpd"](1073742336,u.G,u.G,[]),t["\u0275mpd"](1073742336,u.Q,u.Q,[]),t["\u0275mpd"](1073742336,u.T,u.T,[]),t["\u0275mpd"](1073742336,u.W,u.W,[]),t["\u0275mpd"](1073742336,u.bb,u.bb,[]),t["\u0275mpd"](1073742336,u.fb,u.fb,[]),t["\u0275mpd"](1073742336,u.gb,u.gb,[]),t["\u0275mpd"](1073742336,u.hb,u.hb,[]),t["\u0275mpd"](1073742336,u.B,u.B,[]),t["\u0275mpd"](1073742336,Oe.b,Oe.b,[]),t["\u0275mpd"](1073742336,Ve.b,Ve.b,[]),t["\u0275mpd"](1073742336,Ye.a,Ye.a,[]),t["\u0275mpd"](1073742336,Ge.b,Ge.b,[]),t["\u0275mpd"](1073742336,Ke.Ng2TableModule,Ke.Ng2TableModule,[]),t["\u0275mpd"](1073742336,J.a,J.a,[]),t["\u0275mpd"](1073742336,X.o,X.o,[[2,X.u],[2,X.l]]),t["\u0275mpd"](1073742336,Qe,Qe,[]),t["\u0275mpd"](1073742336,Je.a,Je.a,[]),t["\u0275mpd"](1073742336,Ze.a,Ze.a,[]),t["\u0275mpd"](1073742336,a,a,[]),t["\u0275mpd"](1024,X.j,function(){return[[{path:"",component:x}]]},[]),t["\u0275mpd"](256,Q.a,{apiKey:"AIzaSyCGUwCcM-LKjRK4rjbBJ06_GLmX2LaYzfg"},[])])})}}]);