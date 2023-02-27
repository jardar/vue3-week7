<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ selectedItem?.id ? "編輯" : "新增" }}優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input
              id="title"
              type="text"
              class="form-control"
              v-model="selectedItem.title"
            />
          </div>
          <div class="mb-3">
            <label for="code" class="form-label">優惠碼</label>
            <input
              id="code"
              type="text"
              class="form-control"
              v-model="selectedItem.code"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input
              id="due_date"
              type="date"
              class="form-control"
              v-model="dueDate"
            />
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label">折扣百分比</label>
            <input
              id="percent"
              type="number"
              class="form-control"
              min="0"
              max="100"
              v-model.number="selectedItem.percent"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              id="is_enabled"
              type="checkbox"
              class="form-check-input"
              :true-value="1"
              :false-value="0"
              v-model="selectedItem.is_enabled"
            />
            <label class="form-check-label" for="is_enabled">是否啟用</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click="handleEditOrCreate"
            type="button"
            class="btn btn-primary"
          >
            {{ selectedItem?.id ? "更新" : "新增" }}優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import { ToSimpleDate } from "@/utils/dateHelper.js";

export default {
  props: ["item"],
  emits: ["update"],
  data() {
    return {
      selectedItem: {
        title: "",
        code: "",
        percent: 0,
        due_date: 0,
        is_enabled: 0,
      },
      dueDate: "1911-01-01",
      editModal: null,
      isImgLoading: false,
    };
  },
  watch: {
    item() {
      this.selectedItem = { ...this.item };
      this.dueDate = ToSimpleDate(this.item.due_date * 1000, "-");
    },
    dueDate() {
      this.selectedItem.due_date = Math.floor(new Date(this.dueDate) / 1000);
    },
  },
  computed: {
    ...mapState(useLoadingStore, ["getContainLoading"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setContainLoading"]),
    show() {
      this.editModal.show();
    },
    hide() {
      this.editModal.hide();
    },
    handleEditOrCreate() {
      this.$emit("update", {
        isNew: !this.selectedItem.id,
        data: this.selectedItem,
      });
    },

    handleFileUpload(e, isMainImage = false, idx = 0) {
      // console.log(e.target.files, isMainImage);
      if (e.target?.files && e.target.files.length > 0) {
        // console.log(e.target.files[0]);
        // this.setContainLoading(true);
        this.isImgLoading = true;
        const file = e.target.files[0];
        const formData = new FormData();
        // 加入相應的欄位.
        // <input type="file" name="file-to-upload">
        formData.append("file-to-upload", file);
        // call api
        axios
          .post(`${hex.epUploadFile}`, formData)
          .then((res) => {
            // console.log(res.data);
            if (isMainImage) {
              this.selectedItem.imageUrl = res.data.imageUrl;
            } else {
              this.selectedItem.imagesUrl[idx] = res.data.imageUrl;
            }
          })
          .catch((err) => {
            // // console.log(err);
            // alert(err.response.data.message || "error");
            showToast(err.response.data.message || "error", "error");
          })
          .finally(() => {
            e.target.value = "";
            // this.setContainLoading(false);
            this.isImgLoading = false;
          });
      }
    },
  },
  mounted() {
    this.isImgLoading = false;
    this.editModal = new Modal(this.$refs.productModal, {
      keyboard: false,
    });
    // console.log(deleteModal);
  },
};
</script>
