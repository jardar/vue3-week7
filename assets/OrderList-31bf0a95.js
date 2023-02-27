import{M as x}from"./bootstrap.esm-3171751b.js";import{_ as k,o as i,c as r,d as e,t as o,F as m,g as y,w as O,j as B,f as P,m as S,a as $,b as g,h as f,r as u,e as _}from"./index-9d6383b5.js";import{D as A}from"./DeleteDlg-adc64527.js";import{P as E}from"./PaginationComp-95dcfef3.js";import{s as w,a as b,u as C}from"./loading-b0bbf49d.js";import{T as I}from"./dateHelper-2825c04a.js";const R={emits:["update"],data(){return{orderModal:null,item:null}},methods:{handleEdit(){this.$emit("update",this.item)},show(t){this.item=t,this.orderModal.show()},hide(){this.orderModal.hide()}},mounted(){this.orderModal=new x(this.$refs.orderModal,{keyboard:!1})}},V={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},T={class:"modal-dialog modal-xl"},U={class:"modal-content border-0"},j=e("div",{class:"modal-header bg-dark text-white"},[e("h5",{id:"productModalLabel",class:"modal-title"},[e("span",null,"訂單細節")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),N={key:0,class:"modal-body"},q={class:"row"},F={class:"col-sm-4"},G=e("h3",null,"用戶資料",-1),z={class:"table"},H=e("th",{scope:"row"},"姓名",-1),J=e("th",{scope:"row"},"Email",-1),K=e("th",{scope:"row"},"電話",-1),Q=e("th",{scope:"row"},"地址",-1),W={class:"col-sm-8"},X=e("h3",null,"訂單細節",-1),Y={class:"table"},Z=e("th",{scope:"row"},"訂單編號",-1),ee=e("th",{scope:"row"},"下單時間",-1),te=e("tr",null,[e("th",{scope:"row"},"付款時間"),e("td",null,"jardar")],-1),se=e("th",{scope:"row"},"付款狀態",-1),oe=e("th",{scope:"row"},"總金額",-1),le=e("h3",null,"選購商品",-1),de={class:"table"},ae={scope:"row"},ne={class:"text-end"},ie={class:"form-check float-end"},re={class:"form-check-label",for:"flexCheckDefault"},ce={class:"modal-footer"},he=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function ue(t,s,h,v,l,n){return i(),r("div",V,[e("div",T,[e("div",U,[j,l.item?(i(),r("div",N,[e("div",q,[e("div",F,[G,e("table",z,[e("tbody",null,[e("tr",null,[H,e("td",null,o(l.item.user.name),1)]),e("tr",null,[J,e("td",null,o(l.item.user.email),1)]),e("tr",null,[K,e("td",null,o(l.item.user.tel),1)]),e("tr",null,[Q,e("td",null,o(l.item.user.address),1)])])])]),e("div",W,[X,e("table",Y,[e("tbody",null,[e("tr",null,[Z,e("td",null,o(l.item.id),1)]),e("tr",null,[ee,e("td",null,o(l.item.create_at),1)]),te,e("tr",null,[se,e("td",null,o(l.item.is_paid?"已付款":"未付款"),1)]),e("tr",null,[oe,e("td",null,o(l.item.total),1)])])]),le,e("table",de,[e("tbody",null,[(i(!0),r(m,null,y(l.item.products,(a,p)=>(i(),r("tr",{key:p},[e("th",ae,o(a.product.title),1),e("td",null,o(a.qty)+" / "+o(a.product.unit),1),e("td",ne,o(a.total),1)]))),128))])]),e("div",ie,[O(e("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":s[0]||(s[0]=a=>l.item.is_paid=a),id:"flexCheckDefault"},null,512),[[B,l.item.is_paid]]),e("label",re,o(l.item.is_paid?"已付款":"未付款"),1)])])])])):P("",!0),e("div",ce,[he,e("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=(...a)=>n.handleEdit&&n.handleEdit(...a))}," 修改付款狀態 ")])])])],512)}const _e=k(R,[["render",ue]]),me={components:{OrderModal:_e,DeleteDlg:A,PageComp:E},data(){return{items:[],selectedItem:{},page:{}}},computed:{...S(C,["getContainLoading"])},methods:{...$(C,["setContainLoading"]),resetSelected(){this.selectedItem={products:{},user:{}}},showViewModal(t){this.selectedItem={...t},this.$refs.orderModalRef.show(this.selectedItem)},showDeleteModal(t){this.selectedItem={...t},this.$refs.deleteDlgRef.show()},handleDelete(){this.setContainLoading(!0),g.delete(f.epAdmDeleteOrderById(this.selectedItem.id)).then(t=>{w(`${t.data.message}`),this.doAdmOrderListByPage()}).then(t=>{this.page=t.data.pagination;const s=t.data.orders;this.items=s?Object.values(s):[]}).catch(t=>{b("失敗",t.response.data.message||"error","error")}).finally(()=>{this.resetSelected(),this.$refs.deleteDlgRef.hide(),this.setContainLoading(!1)})},handleEditOrder(t){this.setContainLoading(!0),g.put(f.epAdmUpdateOrderById(t.id),{data:t}).then(s=>{w(`${s.data.message}`),this.doAdmOrderListByPage(this.page.current_page)}).catch(s=>{b("失敗",s.response.data.message||"error","error")}).finally(()=>{this.resetSelected(),this.$refs.orderModalRef.hide(),this.setContainLoading(!1)})},handlePageChange(t){this.page.current_page!==t&&this.doGetAdminProductsByPage(t)},doAdmOrderListByPage(t=1){this.setContainLoading(!0),g.get(f.epAdmGetOrdersByPage(t)).then(s=>{console.log(s.data),this.page=s.data.pagination;const h=s.data.orders;this.items=h?Object.values(h):[]}).catch(s=>{b("失敗",s.response.data.message||"error","error")}).finally(()=>{this.setContainLoading(!1)})},ToSimpleDate:I},mounted(){this.doAdmOrderListByPage()}},pe=e("h1",{class:"mb-4"},"訂單列表",-1),ge={class:"table"},fe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"購買時間"),e("th",{scope:"col"},"Email"),e("th",{scope:"col"},"購買款項"),e("th",{scope:"col",class:"text-end"},"應付金額"),e("th",{scope:"col"},"是否付款"),e("th",{scope:"col"},"編輯")])],-1),be={class:"text-end"},ye={class:"form-check form-switch"},we=["checked"],Ce={class:"form-check-label",for:"flexSwitchCheckDefault"},ke={class:"btn-group btn-group-sm",role:"group","aria-label":"operations"},ve=["onClick"],De=["onClick"];function Me(t,s,h,v,l,n){const a=u("vue-loading"),p=u("page-comp"),D=u("order-modal"),M=u("delete-dlg");return i(),r(m,null,[pe,e("table",ge,[_(a,{active:t.getContainLoading,"onUpdate:active":s[0]||(s[0]=d=>t.getContainLoading=d),"can-cancel":!1,"is-full-page":!1},null,8,["active"]),fe,e("tbody",null,[(i(!0),r(m,null,y(l.items,d=>(i(),r("tr",{key:d.id},[e("td",null,o(n.ToSimpleDate(d.create_at*1e3)),1),e("td",null,o(d.user.email),1),e("td",null,[e("ul",null,[(i(!0),r(m,null,y(d.products,(c,L)=>(i(),r("li",{key:L},o(`${c.product.title} ${c.qty} ${c.product.unit}`),1))),128))])]),e("td",be,o(d.total),1),e("td",null,[e("div",ye,[e("input",{class:"form-check-input",type:"checkbox",id:"flexSwitchCheckDefault",checked:d.is_paid,disabled:""},null,8,we),e("label",Ce,o(d.is_paid?"已付款":"未付款"),1)])]),e("td",null,[e("div",ke,[e("button",{type:"button",class:"btn btn-outline-primary",onClick:c=>n.showViewModal(d)}," 檢視 ",8,ve),e("button",{type:"button",class:"btn btn-outline-danger",onClick:c=>n.showDeleteModal(d)}," 刪除 ",8,De)])])]))),128))])]),_(p,{page:l.page,onChange:n.handlePageChange},null,8,["page","onChange"]),_(D,{ref:"orderModalRef",onUpdate:n.handleEditOrder},null,8,["onUpdate"]),_(M,{ref:"deleteDlgRef",title:`${l.selectedItem.id} 訂單`,onChange:n.handleDelete},null,8,["title","onChange"])],64)}const $e=k(me,[["render",Me]]);export{$e as default};