<template>
  <button
    type="button"
    class="btn btn-primary float-end"
    @click="showCreateModal"
  >
    建立新的產品
  </button>
  <table class="table">
    <vue-loading
      v-model:active="getContainLoading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">評價</th>
        <th scope="col" class="text-end">原價</th>
        <th scope="col" class="text-end">售價</th>
        <th scope="col" class="text-center">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row">{{ item.category }}</th>
        <td>{{ item.title }}</td>
        <td>
          {{
            item.rate
              ? item.rate == 3
                ? "✭✭✭"
                : item.rate == 2
                ? "✭✭"
                : (item.rate = 1 ? "✭" : "")
              : ""
          }}
        </td>
        <td class="text-end">{{ item.origin_price }}</td>
        <td class="text-end">{{ item.price }}</td>
        <td class="text-center">
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else>未啟用</span>
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
              @click="showUpdateModal(item)"
            >
              編輯
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

  <!-- create, update Modal -->
  <edit-dlg ref="editDlgRef" :item="selectedItem" @update="handleEditOrCreate">
  </edit-dlg>
  <!-- delete modal -->
  <delete-dlg
    ref="deleteDlgRef"
    :title="selectedItem.title"
    @change="handleDelete"
  ></delete-dlg>
</template>

<script>
import PageComp from "@/components/PaginationComp.vue";
import EditDlg from "@/components/EditDlg.vue";
import DeleteDlg from "@/components/DeleteDlg.vue";
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";

export default {
  components: {
    PageComp,
    EditDlg,
    DeleteDlg,
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
        imagesUrl: [],
        rate: "",
      };
    },
    showCreateModal() {
      // // console.log(item);
      // console.log(editModal);
      this.resetSelected();
      // editModal.show();
      this.$refs.editDlgRef.show();
    },
    showDeleteModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      this.$refs.deleteDlgRef.show();
    },
    showUpdateModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      // editModal.show();
      this.$refs.editDlgRef.show();
    },
    handleEditOrCreate({ isNew, data }) {
      // console.log(isNew, data);
      this.setContainLoading(true);
      if (!isNew) {
        axios
          .put(hex.epAdmUpdateProduct(this.selectedItem.id), {
            data: data,
          })
          .then((res) => {
            // alert(`${res.data.message}`);
            showToast(`${res.data.message}`);
            // this.doGetAdminAllProducts();
            this.doGetAdminProductsByPage(this.page.current_page);
          })
          .catch((err) => {
            // alert(`失敗:${err.response.data.message || "error"}`);
            showDlg("失敗", err.response.data.message || "error", "error");
          })
          .finally(() => {
            this.resetSelected();
            // editModal.hide();
            this.$refs.editDlgRef.hide();
            this.setContainLoading(false);
          });
      } else {
        axios
          .post(`${hex.epAdmCreateProduct}`, {
            data: data,
          })
          .then((res) => {
            // alert(`${res.data.message}`);
            showToast(`${res.data.message}`);
            // this.doGetAdminAllProducts();
            this.doGetAdminProductsByPage(this.page.current_page);
          })
          .catch((err) => {
            // alert(`失敗:${err.response.data.message || "error"}`);
            showDlg("失敗", err.response.data.message || "error", "error");
          })
          .finally(() => {
            this.resetSelected();
            // editModal.hide();
            this.$refs.editDlgRef.hide();
            this.setContainLoading(false);
          });
      }
    },
    handleDelete(doOrNot = false) {
      // // console.log(this.selectedItem);
      if (doOrNot) {
        this.setContainLoading(true);
        axios
          .delete(hex.epAdmDeleteProducts(this.selectedItem.id))
          .then((res) => {
            showToast(`${res.data.message}`);
            // this.doGetAdminProductsByPage();
            return axios.get(`${hex.epAdmGetProductsByCatPage}?page=1`);
          })
          .then((res) => {
            this.page = res.data.pagination;
            const products = res.data.products;
            this.items = products ? Object.values(products) : [];
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
      }
    },
    handlePageChange(pageIdx) {
      // console.log(pageIdx);
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetAdminProductsByPage(pageIdx);
    },
    doGetAdminProductsByPage(pageNum = 1) {
      this.setContainLoading(true);
      axios
        .get(`${hex.epAdmGetProductsByCatPage}?page=${pageNum}`)
        .then((res) => {
          console.log(res.data);
          this.page = res.data.pagination;
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          // // console.log(err);
          // alert(err.response.data.message || "error");
          showDlg("失敗", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.setContainLoading(false);
        });
    },
  },
  mounted() {
    this.doGetAdminProductsByPage();
  },
};
</script>
