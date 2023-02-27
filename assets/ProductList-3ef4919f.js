import{P as V}from"./PaginationComp-76909f9c.js";import{M as A}from"./bootstrap.esm-f4c59cbe.js";import{m as L,a as D,b as u,h as g,_ as P,r as f,o as c,c as r,d as e,t as _,e as b,w as d,v as m,f as k,F as w,g as x,i as B,j as S}from"./index-8afe259a.js";import{s as C,u as U,a as I}from"./loading-6f7c174d.js";import{D as R}from"./DeleteDlg-377ba88f.js";const E={props:["item"],emits:["update"],data(){return{selectedItem:{},editModal:null,isImgLoading:!1}},watch:{item(){this.selectedItem={...this.item}}},computed:{...L(U,["getContainLoading"])},methods:{...D(U,["setContainLoading"]),show(){this.editModal.show()},hide(){this.editModal.hide()},handleEditOrCreate(){this.$emit("update",{isNew:!this.selectedItem.id,data:this.selectedItem})},handleFileUpload(o,t=!1,a=0){var v;if((v=o.target)!=null&&v.files&&o.target.files.length>0){this.isImgLoading=!0;const s=o.target.files[0],i=new FormData;i.append("file-to-upload",s),u.post(`${g.epUploadFile}`,i).then(p=>{t?this.selectedItem.imageUrl=p.data.imageUrl:this.selectedItem.imagesUrl[a]=p.data.imageUrl}).catch(p=>{C(p.response.data.message||"error","error")}).finally(()=>{o.target.value="",this.isImgLoading=!1})}}},mounted(){this.isImgLoading=!1,this.editModal=new A(this.$refs.productModal,{keyboard:!1})}},F={id:"productModal",ref:"productModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},G={class:"modal-dialog modal-xl"},O={class:"modal-content border-0"},N={class:"modal-header bg-dark text-white"},j={id:"productModalLabel",class:"modal-title"},T=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),q={class:"modal-body"},z={class:"row"},H={class:"col-sm-4 vl-parent"},J={class:"mb-2"},K=e("h3",null,"主要圖片",-1),Q={class:"mb-3"},W=e("label",{for:"imageUrl",class:"form-label"},"輸入圖片網址",-1),X=["src"],Y=e("h3",null,"次要圖片",-1),Z={class:"mb-3"},$=e("label",{for:"imageUrl",class:"form-label"},"輸入圖片網址",-1),ee=["onClick"],te=["onChange"],se=["onUpdate:modelValue"],le=["src"],oe={class:"col-sm-8"},ne={class:"mb-3"},ae=e("label",{for:"title",class:"form-label"},"標題 ",-1),ie={class:"row"},de={class:"mb-3 col-md-6"},ce=e("label",{for:"category",class:"form-label"},"分類",-1),re={class:"mb-3 col-md-6"},me=e("label",{for:"price",class:"form-label"},"單位",-1),pe={class:"row"},he={class:"mb-3 col-md-6"},ue=e("label",{for:"origin_price",class:"form-label"},"原價",-1),ge={class:"mb-3 col-md-6"},_e=e("label",{for:"price",class:"form-label"},"售價",-1),fe=e("hr",null,null,-1),be={class:"mb-3"},ve=e("label",{for:"description",class:"form-label"},"產品描述",-1),ye={class:"mb-3"},Ie=e("label",{for:"content",class:"form-label"},"說明內容",-1),Ce={class:"mb-3"},Ue=e("label",{for:"content",class:"form-label"},"評價",-1),we=e("option",{value:"",disabled:"",selected:""},"給個星吧",-1),ke=e("option",{value:"1"},"✭",-1),Le=e("option",{value:"2"},"✭✭",-1),De=e("option",{value:"3"},"✭✭✭",-1),Pe=[we,ke,Le,De],xe={class:"mb-3"},Me={class:"form-check"},Ve=e("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),Ae={class:"modal-footer"},Be=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Se(o,t,a,v,s,i){var y;const p=f("vue-loading");return c(),r("div",F,[e("div",G,[e("div",O,[e("div",N,[e("h5",j,[e("span",null,_((y=s.selectedItem)!=null&&y.id?"編輯":"新增")+"產品",1)]),T]),e("div",q,[e("div",z,[e("div",H,[b(p,{active:s.isImgLoading,"onUpdate:active":t[0]||(t[0]=l=>s.isImgLoading=l),"can-cancel":!1,"is-full-page":!1},null,8,["active"]),e("div",J,[K,e("div",Q,[W,e("input",{type:"file",placeholder:"please input picture url",class:"form-control",onChange:t[1]||(t[1]=l=>i.handleFileUpload(l,!0))},null,32),d(e("input",{"onUpdate:modelValue":t[2]||(t[2]=l=>s.selectedItem.imageUrl=l),type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,512),[[m,s.selectedItem.imageUrl]])]),s.selectedItem.imageUrl?(c(),r("img",{key:0,class:"img-fluid",src:s.selectedItem.imageUrl,alt:"product image"},null,8,X)):k("",!0)]),Y,(c(!0),r(w,null,x(s.selectedItem.imagesUrl,(l,h)=>(c(),r("div",{key:h,class:"mb-2"},[e("div",Z,[$,e("button",{onClick:n=>s.selectedItem.imagesUrl.splice(h,1),type:"button",class:"btn btn-outline-danger btn-sm ms-2"}," 刪除 ",8,ee),e("input",{type:"file",placeholder:"please input picture url",class:"form-control",onChange:n=>i.handleFileUpload(n,!1,h)},null,40,te),d(e("input",{"onUpdate:modelValue":n=>s.selectedItem.imagesUrl[h]=n,type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,8,se),[[m,s.selectedItem.imagesUrl[h]]])]),l?(c(),r("img",{key:0,class:"img-fluid",src:l,alt:"product image"},null,8,le)):k("",!0)]))),128)),e("div",null,[e("button",{onClick:t[3]||(t[3]=l=>s.selectedItem.imagesUrl?s.selectedItem.imagesUrl.push(""):s.selectedItem.imagesUrl=[""]),class:"btn btn-outline-primary btn-sm d-block w-100"}," 新增圖片 ")])]),e("div",oe,[e("div",ne,[ae,d(e("input",{"onUpdate:modelValue":t[4]||(t[4]=l=>s.selectedItem.title=l),id:"title",type:"text",class:"form-control",placeholder:"請輸入標題"},null,512),[[m,s.selectedItem.title]])]),e("div",ie,[e("div",de,[ce,d(e("input",{"onUpdate:modelValue":t[5]||(t[5]=l=>s.selectedItem.category=l),id:"category",type:"text",class:"form-control",placeholder:"請輸入分類"},null,512),[[m,s.selectedItem.category]])]),e("div",re,[me,d(e("input",{"onUpdate:modelValue":t[6]||(t[6]=l=>s.selectedItem.unit=l),id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位"},null,512),[[m,s.selectedItem.unit]])])]),e("div",pe,[e("div",he,[ue,d(e("input",{"onUpdate:modelValue":t[7]||(t[7]=l=>s.selectedItem.origin_price=l),id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價"},null,512),[[m,s.selectedItem.origin_price]])]),e("div",ge,[_e,d(e("input",{"onUpdate:modelValue":t[8]||(t[8]=l=>s.selectedItem.price=l),id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價"},null,512),[[m,s.selectedItem.price]])])]),fe,e("div",be,[ve,d(e("textarea",{"onUpdate:modelValue":t[9]||(t[9]=l=>s.selectedItem.description=l),id:"description",type:"text",class:"form-control",placeholder:"請輸入產品描述"},`
                `,512),[[m,s.selectedItem.description]])]),e("div",ye,[Ie,d(e("textarea",{"onUpdate:modelValue":t[10]||(t[10]=l=>s.selectedItem.content=l),id:"description",type:"text",class:"form-control",placeholder:"請輸入說明內容"},`
                `,512),[[m,s.selectedItem.content]])]),e("div",Ce,[Ue,d(e("select",{"onUpdate:modelValue":t[11]||(t[11]=l=>s.selectedItem.rate=l),class:"form-select","aria-label":"Default select"},Pe,512),[[B,s.selectedItem.rate]])]),e("div",xe,[e("div",Me,[d(e("input",{"onUpdate:modelValue":t[12]||(t[12]=l=>s.selectedItem.is_enabled=l),id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":1,"false-value":0},null,512),[[S,s.selectedItem.is_enabled]]),Ve])])])])]),e("div",Ae,[Be,e("button",{onClick:t[13]||(t[13]=(...l)=>i.handleEditOrCreate&&i.handleEditOrCreate(...l)),type:"button",class:"btn btn-primary"}," 確認 ")])])])],512)}const Re=P(E,[["render",Se]]),Ee={components:{PageComp:V,EditDlg:Re,DeleteDlg:R},data(){return{items:[],selectedItem:{},page:{}}},computed:{...L(U,["getContainLoading"])},methods:{...D(U,["setContainLoading"]),resetSelected(){this.selectedItem={imagesUrl:[],rate:""}},showCreateModal(){this.resetSelected(),this.$refs.editDlgRef.show()},showDeleteModal(o){this.selectedItem={...o},this.$refs.deleteDlgRef.show()},showUpdateModal(o){this.selectedItem={...o},this.$refs.editDlgRef.show()},handleEditOrCreate({isNew:o,data:t}){this.setContainLoading(!0),o?u.post(`${g.epAdmCreateProduct}`,{data:t}).then(a=>{C(`${a.data.message}`),this.doGetAdminProductsByPage(this.page.current_page)}).catch(a=>{I("失敗",a.response.data.message||"error","error")}).finally(()=>{this.resetSelected(),this.$refs.editDlgRef.hide(),this.setContainLoading(!1)}):u.put(g.epAdmUpdateProduct(this.selectedItem.id),{data:t}).then(a=>{C(`${a.data.message}`),this.doGetAdminProductsByPage(this.page.current_page)}).catch(a=>{I("失敗",a.response.data.message||"error","error")}).finally(()=>{this.resetSelected(),this.$refs.editDlgRef.hide(),this.setContainLoading(!1)})},handleDelete(o=!1){o&&(this.setContainLoading(!0),u.delete(g.epAdmDeleteProducts(this.selectedItem.id)).then(t=>(C(`${t.data.message}`),u.get(`${g.epAdmGetProductsByCatPage}?page=1`))).then(t=>{this.page=t.data.pagination;const a=t.data.products;this.items=a?Object.values(a):[]}).catch(t=>{I("失敗",t.response.data.message||"error","error")}).finally(()=>{this.resetSelected(),this.$refs.deleteDlgRef.hide(),this.setContainLoading(!1)}))},handlePageChange(o){this.page.current_page!==o&&this.doGetAdminProductsByPage(o)},doGetAdminProductsByPage(o=1){this.setContainLoading(!0),u.get(`${g.epAdmGetProductsByCatPage}?page=${o}`).then(t=>{console.log(t.data),this.page=t.data.pagination;const a=t.data.products;this.items=a?Object.values(a):[]}).catch(t=>{I("失敗",t.response.data.message||"error","error")}).finally(()=>{this.setContainLoading(!1)})}},mounted(){this.doGetAdminProductsByPage()}},Fe={class:"table"},Ge=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"分類"),e("th",{scope:"col"},"產品名稱"),e("th",{scope:"col"},"評價"),e("th",{scope:"col",class:"text-end"},"原價"),e("th",{scope:"col",class:"text-end"},"售價"),e("th",{scope:"col",class:"text-center"},"是否啟用"),e("th",{scope:"col"},"編輯")])],-1),Oe={scope:"row"},Ne={class:"text-end"},je={class:"text-end"},Te={class:"text-center"},qe={key:0,class:"text-success"},ze={key:1},He={class:"btn-group btn-group-sm",role:"group","aria-label":"operations"},Je=["onClick"],Ke=["onClick"];function Qe(o,t,a,v,s,i){const p=f("vue-loading"),y=f("page-comp"),l=f("edit-dlg"),h=f("delete-dlg");return c(),r(w,null,[e("button",{type:"button",class:"btn btn-primary float-end",onClick:t[0]||(t[0]=(...n)=>i.showCreateModal&&i.showCreateModal(...n))}," 建立新的產品 "),e("table",Fe,[b(p,{active:o.getContainLoading,"onUpdate:active":t[1]||(t[1]=n=>o.getContainLoading=n),"can-cancel":!1,"is-full-page":!1},null,8,["active"]),Ge,e("tbody",null,[(c(!0),r(w,null,x(s.items,n=>(c(),r("tr",{key:n.id},[e("th",Oe,_(n.category),1),e("td",null,_(n.title),1),e("td",null,_(n.rate?n.rate==3?"✭✭✭":n.rate==2?"✭✭":n.rate="✭":""),1),e("td",Ne,_(n.origin_price),1),e("td",je,_(n.price),1),e("td",Te,[n.is_enabled?(c(),r("span",qe,"啟用")):(c(),r("span",ze,"未啟用"))]),e("td",null,[e("div",He,[e("button",{type:"button",class:"btn btn-outline-primary",onClick:M=>i.showUpdateModal(n)}," 編輯 ",8,Je),e("button",{type:"button",class:"btn btn-outline-danger",onClick:M=>i.showDeleteModal(n)}," 刪除 ",8,Ke)])])]))),128))])]),b(y,{page:s.page,onChange:i.handlePageChange},null,8,["page","onChange"]),b(l,{ref:"editDlgRef",item:s.selectedItem,onUpdate:i.handleEditOrCreate},null,8,["item","onUpdate"]),b(h,{ref:"deleteDlgRef",title:s.selectedItem.title,onChange:i.handleDelete},null,8,["title","onChange"])],64)}const et=P(Ee,[["render",Qe]]);export{et as default};