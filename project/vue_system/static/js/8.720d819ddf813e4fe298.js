webpackJsonp([8],{dAs2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"system_menu",data:function(){var t=this;return{columns16:[{title:"图标",key:"ico",width:70,align:"center",render:function(t,e){return t("div",[t("Icon",{props:{type:e.row.ico,size:"20"}})])}},{title:"菜单名称",key:"name",width:200,tree:!0},{title:"排序",key:"sort",align:"center"},{title:"请求地址",key:"url",align:"center"},{title:"类型",key:"type",align:"center"},{title:"可见",key:"showText",align:"center"},{title:"权限标识",key:"jurisdiction",align:"center"},{title:"操作",key:"operation",width:200,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.edit(i)}}},"编辑"),e("Button",{props:{type:"info",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.addButton(i)}}},"新增"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.remove(i)}}},"删除")])}}],dataMenu:[],modal1:!1,formItem:{input:"",radio:"",inputmenu:"",inputurl:"",select:"",inputidentification:"",inputsort:"",inputico:"",status:""},inputFlage:{inputurl:!0,select:!0,inputidentification:!0,inputico:!0},formItemRadio:"",getThisId:"",popTemplate:!0,menuProModa:!1,treeTemporary:{treeVal:"",treeId:""}}},methods:{edit:function(t){this.getThisId=t.row.menuId,this.modal1=!0,this.popTemplate=!0,"catalog"==t.row.typeAttr&&(this.formItem.inputsort=t.row.sort,this.formItem.inputico=t.row.ico),"menu"==t.row.typeAttr&&(this.formItem.inputurl=t.row.url,this.formItem.select=t.row.typeOpen,this.formItem.inputidentification=t.row.jurisdiction),"button"==t.row.typeAttr&&(this.formItem.inputidentification=t.row.jurisdiction),this.formItem.input=t.row.parentName,this.formItem.inputmenu=t.row.name,this.formItem.inputsort=t.row.sort,this.formItem.status=t.row.show,this.formItemRadio=t.row.typeAttr},addButton:function(){this.modal1=!0,this.popTemplate=!1,this.formItemRadio="catalog",this.formItem.inputsort="",this.formItem.inputico="",this.formItem.inputurl="",this.formItem.select="",this.formItem.inputidentification="",this.formItem.inputidentification="",this.formItem.input="",this.formItem.inputmenu="",this.formItem.inputsort="",this.formItem.status=""},remove:function(t){var e=this;this.prompt(function(){var i=t.index;e.getThisId=t.row.menuId,e.loopData(e.dataMenu,"menuId",e.getThisId,function(t,e,o){e.splice(i,1)}),e.submitAPI(e.dataMenu)})},submit_menu:function(){this.modal1=!1,this.formItem.radio=this.formItemRadio;var t=this;this.loopData(this.dataMenu,"menuId",this.getThisId,function(e){"catalog"==t.formItem.radio&&(e.sort=t.formItem.inputsort,e.ico=t.formItem.inputico,e.type="目录"),"menu"==t.formItem.radio&&(e.url=t.formItem.inputurl,e.typeOpen=t.formItem.select,e.jurisdiction=t.formItem.inputidentification,e.type="菜单"),"button"==t.formItem.radio&&(e.jurisdiction=t.formItem.inputidentification,e.type="按钮"),e.typeAttr=t.formItem.radio,e.parentName=t.formItem.input,e.name=t.formItem.inputmenu,e.sort=t.formItem.inputsort,e.show=t.formItem.status,"show"==t.formItem.status?e.showText="显示":e.showText="隐藏"}),this.submitAPI(this.dataMenu)},submit_menu_add:function(){this.modal1=!1,this.formItem.radio=this.formItemRadio;var t=this;this.treeTemporary.treeId&&(this.loopData(this.dataMenu,"menuId",this.treeTemporary.treeId,function(e){var i={};"catalog"==t.formItem.radio&&(i.sort=t.formItem.inputsort,i.ico=t.formItem.inputico,i.type="目录"),"menu"==t.formItem.radio&&(i.url=t.formItem.inputurl,i.typeOpen=t.formItem.select,i.jurisdiction=t.formItem.inputidentification,i.type="菜单"),"button"==t.formItem.radio&&(i.jurisdiction=t.formItem.inputidentification,i.type="按钮"),i.typeAttr=t.formItem.radio,i.parentName=t.formItem.input,i.parentId=t.treeTemporary.treeId,i.name=t.formItem.inputmenu,i.sort=t.formItem.inputsort,i.show=t.formItem.status,"show"==t.formItem.status?i.showText="显示":i.showText="隐藏",e.children.push(i)}),this.submitAPI(this.dataMenu))},submit_menu_cancle:function(){this.modal1=!1},menuStatus:function(t){"catalog"==t&&(this.inputFlage.inputurl=!1,this.inputFlage.select=!1,this.inputFlage.inputidentification=!1,this.inputFlage.inputico=!0),"menu"==t&&(this.inputFlage.inputurl=!0,this.inputFlage.select=!0,this.inputFlage.inputidentification=!0,this.inputFlage.inputico=!1),"button"==t&&(this.inputFlage.inputurl=!1,this.inputFlage.select=!1,this.inputFlage.inputidentification=!0,this.inputFlage.inputico=!1)},loopData:function(t,e,i,o){for(var n=0;n<t.length;n++)t[n][e]===i?o(t[n],t,n):t[n].children&&t[n].children.length>0&&this.loopData(t[n].children,e,i,o)},setLoopData:function(t,e){for(var i=0;i<t.length;i++)e(t[i]),t[i].children&&t[i].children.length>0&&this.setLoopData(t[i].children,e)},getData:function(){var t=this;this.API.navApi(function(e){t.setLoopData(e,function(t){t.expand=!0}),t.dataMenu=e})},renderContent:function(t,e){e.root,e.node;var i=e.data;return t("span",{style:{display:"inline-block",width:"100%"}},[t("span",[t("Icon",{props:{type:"ios-paper-outline"},style:{marginRight:"8px"}}),t("span",i.name)]),t("span",{style:{display:"inline-block",float:"right",marginRight:"32px"}})])},getTreeVal:function(t){t[0]&&t[0].name&&t[0].menuId?(this.treeTemporary.treeVal=t[0].name,this.treeTemporary.treeId=t[0].menuId):(this.treeTemporary.treeVal="",this.treeTemporary.treeId=null)},treeOk:function(){this.formItem.input=this.treeTemporary.treeVal},treeCancel:function(){this.treeTemporary.treeVal="",this.treeTemporary.treeId=null},prompt:function(t){this.$Modal.confirm({title:"提示框",content:"<p>确定删除该条数据！</p>",onOk:function(){t&&t()},onCancel:function(){}})},submitAPI:function(t){console.log(t)}},watch:{formItemRadio:function(t,e){this.menuStatus(t)}},mounted:function(){this.getData()}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"system_menu"},[i("div",{staticClass:"right-items-box"},[i("div",{staticClass:"system_menu_button"},[[i("div",{staticClass:"system_menu_button_con"},[i("Button",{attrs:{size:"small",type:"primary",icon:"md-add"},on:{click:t.addButton}},[t._v("新增")])],1)]],2),t._v(" "),[i("Table",{attrs:{"row-key":"menuId",columns:t.columns16,data:t.dataMenu,border:""}})]],2),t._v(" "),[i("Modal",{attrs:{title:"菜单修改",width:"50%"},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[i("p",{staticStyle:{color:"#666","text-align":"center"},attrs:{slot:"header"},slot:"header"},[i("span",[t._v("菜单修改")])]),t._v(" "),i("Form",{attrs:{model:t.formItem,"label-width":80}},[i("div",{staticClass:"form-menu"},[i("FormItem",{attrs:{label:"上级菜单："}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.formItem.input,expression:"formItem.input"}],staticClass:"ivu-input",attrs:{type:"text",placeholder:"上级菜单"},domProps:{value:t.formItem.input},on:{focus:function(e){t.menuProModa=!0},input:function(e){e.target.composing||t.$set(t.formItem,"input",e.target.value)}}})]),t._v(" "),i("FormItem",{attrs:{label:"菜单类型："}},[i("RadioGroup",{model:{value:t.formItemRadio,callback:function(e){t.formItemRadio=e},expression:"formItemRadio"}},[i("Radio",{attrs:{label:"catalog"}},[t._v("目录")]),t._v(" "),i("Radio",{attrs:{label:"menu"}},[t._v("菜单")]),t._v(" "),i("Radio",{attrs:{label:"button"}},[t._v("按钮")])],1)],1),t._v(" "),i("FormItem",{attrs:{label:"菜单名称："}},[i("Input",{attrs:{placeholder:"菜单名称"},model:{value:t.formItem.inputmenu,callback:function(e){t.$set(t.formItem,"inputmenu",e)},expression:"formItem.inputmenu"}})],1),t._v(" "),t.inputFlage.inputurl?i("FormItem",{attrs:{label:"请求地址："}},[i("Input",{attrs:{placeholder:"请求地址"},model:{value:t.formItem.inputurl,callback:function(e){t.$set(t.formItem,"inputurl",e)},expression:"formItem.inputurl"}})],1):t._e(),t._v(" "),t.inputFlage.select?i("FormItem",{attrs:{label:"打开方式："}},[i("Select",{model:{value:t.formItem.select,callback:function(e){t.$set(t.formItem,"select",e)},expression:"formItem.select"}},[i("Option",{attrs:{value:"page"}},[t._v("页签")]),t._v(" "),i("Option",{attrs:{value:"newwindow"}},[t._v("新窗口")])],1)],1):t._e(),t._v(" "),t.inputFlage.inputidentification?i("FormItem",{attrs:{label:"权限标识："}},[i("Input",{attrs:{placeholder:"权限标识"},model:{value:t.formItem.inputidentification,callback:function(e){t.$set(t.formItem,"inputidentification",e)},expression:"formItem.inputidentification"}})],1):t._e(),t._v(" "),i("FormItem",{attrs:{label:"显示排序："}},[i("Input",{attrs:{placeholder:"显示排序"},model:{value:t.formItem.inputsort,callback:function(e){t.$set(t.formItem,"inputsort",e)},expression:"formItem.inputsort"}})],1),t._v(" "),t.inputFlage.inputico?i("FormItem",{attrs:{label:"图标："}},[i("Input",{attrs:{placeholder:"图标"},model:{value:t.formItem.inputico,callback:function(e){t.$set(t.formItem,"inputico",e)},expression:"formItem.inputico"}})],1):t._e(),t._v(" "),i("FormItem",{attrs:{label:"菜单状态："}},[i("RadioGroup",{model:{value:t.formItem.status,callback:function(e){t.$set(t.formItem,"status",e)},expression:"formItem.status"}},[i("Radio",{attrs:{label:"show"}},[t._v("显示")]),t._v(" "),i("Radio",{attrs:{label:"hide"}},[t._v("隐藏")])],1)],1)],1)]),t._v(" "),t.popTemplate?i("div",{attrs:{slot:"footer"},slot:"footer"},[i("div",{staticClass:"menu-submit"},[i("Button",{attrs:{type:"primary"},on:{click:t.submit_menu}},[t._v("提交")]),t._v(" "),i("Button",{on:{click:t.submit_menu_cancle}},[t._v("取消")])],1)]):i("div",{attrs:{slot:"footer"},slot:"footer"},[i("div",{staticClass:"menu-submit"},[i("Button",{attrs:{type:"primary"},on:{click:t.submit_menu_add}},[t._v("添加")]),t._v(" "),i("Button",{on:{click:t.submit_menu_cancle}},[t._v("取消")])],1)])],1)],t._v(" "),[i("Modal",{attrs:{title:"菜单选择"},on:{"on-ok":t.treeOk,"on-cancel":t.treeCancel},model:{value:t.menuProModa,callback:function(e){t.menuProModa=e},expression:"menuProModa"}},[i("div",{staticClass:"getTheTreeVal"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.treeTemporary.treeVal,expression:"treeTemporary.treeVal"}],staticClass:"ivu-input",attrs:{type:"text",placeholder:"上级菜单"},domProps:{value:t.treeTemporary.treeVal},on:{focus:function(e){t.menuProModa=!0},input:function(e){e.target.composing||t.$set(t.treeTemporary,"treeVal",e.target.value)}}})]),t._v(" "),[i("Tree",{staticClass:"demo-tree-render",staticStyle:{"min-height":"400px"},attrs:{data:t.dataMenu,render:t.renderContent},on:{"on-select-change":t.getTreeVal}})]],2)]],2)},staticRenderFns:[]};var r=i("VU/8")(o,n,!1,function(t){i("gOyb")},null,null);e.default=r.exports},gOyb:function(t,e){}});