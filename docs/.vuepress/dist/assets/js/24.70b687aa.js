(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{388:function(e,l,a){"use strict";a.r(l);var t=a(126);const i=[{value:"zhinan",label:"指南",children:[{value:"shejiyuanze",label:"设计原则",children:[{value:"yizhi",label:"一致"}]},{value:"daohang",label:"导航",children:[{value:"cexiangdaohang",label:"侧向导航"}]}]},{value:"zujian",label:"组件",children:[{value:"basic",label:"Basic",children:[{value:"layout",label:"Layout 布局"}]},{value:"form",label:"Form",children:[{value:"radio",label:"Radio 单选框"}]},{value:"data",label:"Data",children:[{value:"table",label:"Table 表格"}]},{value:"notice",label:"Notice",children:[{value:"alert",label:"Alert 警告"}]},{value:"navigation",label:"Navigation",children:[{value:"menu",label:"NavMenu 导航菜单"}]},{value:"others",label:"Others",children:[{value:"dialog",label:"Dialog 对话框"}]}]},{value:"ziyuan",label:"资源",children:[{value:"axure",label:"Axure Components"}]}],r=[{label:"一级 1",children:[{label:"二级 1-1",children:[{label:"三级 1-1-1"}]}]},{label:"一级 2",children:[{label:"二级 2-1",children:[{label:"三级 2-1-1"}]},{label:"二级 2-2",children:[{label:"三级 2-2-1"}]}]},{label:"一级 3",children:[{label:"二级 3-1",children:[{label:"三级 3-1-1"}]},{label:"二级 3-2",children:[{label:"三级 3-2-1"}]}]}];var n={data:()=>({form:{name:"",phone:"",sex:1,birthday:"",hobbys:[],status:1,mark:0,hide:!1,test:"",remark:"",slider:50,grade:0,sort:0,city:[],dept:[],file:"https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641"},options:{form:{labelWidth:"80px",size:"mini"},btns:{hide:!1,searchBtnText:"确定"},col:{xs:24,sm:12},fold:{enable:!1,defaultCollapsed:!1}},columns:[{type:"group-title",label:"基本信息",field:"base-title",span:24,item:{labelColStyle:{display:"none"}}},{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{validator:(...e)=>t.validator(e,t.OnlyCh,"仅支持中文姓名"),trigger:"blur"}]},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{validator:(...e)=>t.validator(e,t.Phone,"请输入正确手机号"),trigger:"blur"}]},{type:"select",label:"性别",field:"sex",options:[],init:!0,request:async()=>new Promise(e=>{setTimeout(()=>{e({data:[{label:"男",value:1},{label:"女",value:0}]})},1e3)})},{type:"date-picker",label:"生日",field:"birthday",props:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"}},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,options:[],init:!0,request:async()=>new Promise(e=>{setTimeout(()=>{e({data:[{label:"电影",value:"1"},{label:"音乐",value:"2"},{label:"旅行",value:"3"},{label:"游戏",value:"4"}]})},1e3)})},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",field:"status",options:[{label:"启用",value:1},{label:"禁用",value:0}]},{type:"input",label:"测试",field:"test",disabled:e=>0===e.status,item:{extra:"查看这里效果请切换状态"}},{type:"rate",label:"评分",field:"mark"},{type:"switch",label:"是否隐藏",field:"hide",activeValue:1,inactiveValue:0,item:{extra:"隐藏成绩项"}},{type:"slider",label:"成绩",field:"grade",span:24,hide:e=>(e.hide&&(e.grade=0),!0===e.hide)},{type:"group-title",label:"分组标题1",field:"group-title1",span:24,item:{labelColStyle:{display:"none"}}},{type:"cascader",label:"城市",span:24,field:"city",options:i,hide:e=>(0===e.status&&(e.city=[]),0===e.status)},{type:"tree-select",label:"部门",field:"dept",span:24,data:r,props:{defaultProps:{children:"children",label:"label"}},disabled:e=>0===e.status},{type:"group-title",label:"分组标题2",field:"group-title2",span:24,item:{labelColStyle:{display:"none"}}},{type:"textarea",label:"备注",field:"remark",span:24,item:{extra:"这里是额外信息"}},{type:"upload",label:"附件",field:"fileList",span:24,props:{listType:"picture-card",action:"/uploadImage/localup.php",headers:{},name:"file",data:{uuid:"o_1iaunor451j18ghmsdt6mq1vd3a",nameMode:"isRenameMode",authToken_today:"FJ932YTHEWOJG94YHEWJGOWEK349"},"on-success":(e,l,a)=>{console.log("🚀🚀🚀----response, file, fileList:",e,l,a)}},resultFormat:e=>e.map(e=>"success"!==e.status?e:{name:e.response.originFileName||"",url:e.response.url}),item:{extra:"上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式"}}]}),watch:{form:{deep:!0,handler(e){console.log("🚀🚀🚀----val:",e)}}},methods:{reset(){}}},s=a(1),o={components:{JinFormDemo:Object(s.a)(n,(function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("div",[a("JinForm",{ref:"formRef",attrs:{"label-width":"80px",inline:!1,size:"normal",options:e.options,columns:e.columns},model:{value:e.form,callback:function(l){e.form=l},expression:"form"}})],1)}),[],!1,null,"80e5bc40",null).exports}},d=Object(s.a)(o,(function(){var e=this.$createElement,l=this._self._c||e;return l("div",[l("JinFormDemo")],1)}),[],!1,null,"484f825e",null);l.default=d.exports}}]);