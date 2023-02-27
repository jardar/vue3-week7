<template>
  <h1 class="mb-4">訂單列表</h1>
  <table class="table">
    <vue-loading
      v-model:active="getContainLoading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <thead>
      <tr>
        <th scope="col">購買時間</th>
        <th scope="col">Email</th>
        <th scope="col">購買款項</th>
        <th scope="col" class="text-end">應付金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ ToSimpleDate(item.create_at * 1000) }}</td>
        <td>{{ item.user.email }}</td>
        <td>
          <ul>
            <li v-for="(p, k) in item.products" :key="k">
              {{ `${p.product.title} ${p.qty} ${p.product.unit}` }}
            </li>
          </ul>
        </td>
        <td class="text-end">{{ item.total }}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              :checked="item.is_paid"
              disabled
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              {{ item.is_paid ? "已付款" : "未付款" }}
            </label>
          </div>
        </td>

        <td>
          <div
            class="btn-group btn-group-sm"
            role="group"
            aria-label="operations"
          >
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="showViewModal(item)"
            >
              檢視
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="showDeleteModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <page-comp :page="page" @change="handlePageChange"></page-comp>
  <order-modal ref="orderModalRef" @update="handleEditOrder"></order-modal>
  <!-- delete modal -->
  <delete-dlg
    ref="deleteDlgRef"
    :title="`${selectedItem.id} 訂單`"
    @change="handleDelete"
  ></delete-dlg>
</template>
<script>
import OrderModal from "@/components/OrderModal.vue";
import DeleteDlg from "@/components/DeleteDlg.vue";
import PageComp from "@/components/PaginationComp.vue";
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import { ToSimpleDate } from "@/utils/dateHelper.js";

export default {
  components: {
    OrderModal,
    DeleteDlg,
    PageComp,
  },
  data() {
    return {
      items: [],
      selectedItem: {},
      page: {},
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["getContainLoading"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setContainLoading"]),
    resetSelected() {
      this.selectedItem = {
        products: {},
        user: {},
      };
    },
    showViewModal(item) {
      this.selectedItem = { ...item };
      this.$refs.orderModalRef.show(this.selectedItem);
    },
    showDeleteModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      this.$refs.deleteDlgRef.show();
    },
    handleDelete() {
      this.setContainLoading(true);
      axios
        .delete(hex.epAdmDeleteOrderById(this.selectedItem.id))
        .then((res) => {
          showToast(`${res.data.message}`);
          this.doAdmOrderListByPage();
        })
        .then((res) => {
          this.page = res.data.pagination;
          const orders = res.data.orders;
          this.items = orders ? Object.values(orders) : [];
        })
        .catch((err) => {
          // alert(`失敗:${err.response.data.message || "error"}`);
          showDlg("失敗", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.resetSelected();
          this.$refs.deleteDlgRef.hide();
          this.setContainLoading(false);
        });
    },
    handleEditOrder(item) {
      this.setContainLoading(true);
      axios
        .put(hex.epAdmUpdateOrderById(item.id), {
          data: item,
        })
        .then((res) => {
          showToast(`${res.data.message}`);
          // this.doGetAdminAllProducts();
          this.doAdmOrderListByPage(this.page.current_page);
        })
        .catch((err) => {
          // alert(`失敗:${err.response.data.message || "error"}`);
          showDlg("失敗", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.resetSelected();
          this.$refs.orderModalRef.hide();
          this.setContainLoading(false);
        });
    },
    handlePageChange(pageIdx) {
      // console.log(pageIdx);
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetAdminProductsByPage(pageIdx);
    },
    doAdmOrderListByPage(pageNum = 1) {
      this.setContainLoading(true);
      axios
        .get(hex.epAdmGetOrdersByPage(pageNum))
        .then((res) => {
          console.log(res.data);
          this.page = res.data.pagination;
          const orders = res.data.orders;
          this.items = orders ? Object.values(orders) : [];
        })
        .catch((err) => {
          showDlg("失敗", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.setContainLoading(false);
        });
    },
    ToSimpleDate: ToSimpleDate,
  },
  mounted() {
    this.doAdmOrderListByPage();
  },
};
</script>
