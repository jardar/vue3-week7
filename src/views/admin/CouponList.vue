<template>
  <button
    type="button"
    class="btn btn-primary float-end"
    @click="showCreateModal"
  >
    建立新的優惠券
  </button>
  <table class="table">
    <vue-loading
      v-model:active="getContainLoading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <thead>
      <tr>
        <th scope="col">名稱</th>
        <th scope="col">折扣百分比</th>
        <th scope="col">到期日</th>
        <th scope="col" class="text-center">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row">{{ item.title }}</th>
        <td>{{ item.percent }}%</td>
        <td>
          {{ ToSimpleDate(item.due_date * 1000) }}
        </td>
        <td class="text-center">
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
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

  <edit-coupon
    ref="editDlgRef"
    :item="selectedItem"
    @update="handleEditOrCreate"
  />
  <!-- delete modal -->
  <delete-dlg
    ref="deleteDlgRef"
    :title="selectedItem.title"
    @change="handleDelete"
  ></delete-dlg>
</template>

<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import PageComp from "@/components/PaginationComp.vue";
import EditCoupon from "@/components/EditCoupon.vue";
import { ToSimpleDate } from "@/utils/dateHelper.js";
import DeleteDlg from "@/components/DeleteDlg.vue";

export default {
  components: {
    PageComp,
    EditCoupon,
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
        title: "",
        code: "",
        percent: 0,
        due_date: 0,
        is_enabled: 0,
      };
    },
    showCreateModal() {
      this.resetSelected();
      this.$refs.editDlgRef.show();
    },
    showUpdateModal(item) {
      this.selectedItem = { ...item };
      this.$refs.editDlgRef.show();
    },
    showDeleteModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      this.$refs.deleteDlgRef.show();
    },
    handleEditOrCreate({ isNew, data }) {
      this.setContainLoading(true);
      if (isNew) {
        axios
          .post(`${hex.epAdmCreateCoupon}`, {
            data: data,
          })
          .then((res) => {
            showToast(`${res.data.message}`);
            this.doGetAdminCouponsByPage();
          })
          .catch((err) => {
            showDlg("失敗", err.response.data.message || "error", "error");
          })
          .finally(() => {
            this.resetSelected();
            this.$refs.editDlgRef.hide();
            this.setContainLoading(false);
          });
      } else {
        axios
          .put(hex.epAdmUpdateCoupon(data.id), {
            data: data,
          })
          .then((res) => {
            showToast(`${res.data.message}`);
            this.doGetAdminCouponsByPage();
          })
          .catch((err) => {
            // alert(`失敗:${err.response.data.message || "error"}`);
            showDlg("失敗", err.response.data.message || "error", "error");
          })
          .finally(() => {
            this.resetSelected();
            this.$refs.editDlgRef.hide();
            this.setContainLoading(false);
          });
      }
    },
    handleDelete(doOrNot = false) {
      if (doOrNot) {
        this.setContainLoading(true);
        axios
          .delete(hex.epAdmDeleteCouponById(this.selectedItem.id))
          .then((res) => {
            showToast(`${res.data.message}`);

            return axios.get(hex.epAdmGetCouponsByPage(1));
          })
          .then((res) => {
            this.page = res.data.pagination;
            const coupons = res.data.coupons;
            this.items = coupons ? Object.values(coupons) : [];
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
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetAdminCouponsByPage(pageIdx);
    },
    doGetAdminCouponsByPage(pageNum = 1) {
      this.setContainLoading(true);
      axios
        .get(hex.epAdmGetCouponsByPage(pageNum))
        .then((res) => {
          this.page = res.data.pagination;
          const coupons = res.data.coupons;
          this.items = coupons ? Object.values(coupons) : [];
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
    ToSimpleDate: ToSimpleDate,
  },
  mounted() {
    this.doGetAdminCouponsByPage();
  },
};
</script>
