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
            <span>{{ selectedItem?.id ? "編輯" : "新增" }}貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4 vl-parent">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  v-model="selectedItem.title"
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  v-model="selectedItem.image"
                  id="image"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  v-model="selectedItem.author"
                  id="author"
                  type="text"
                  class="form-control"
                  placeholder="請輸入作者"
                />
              </div>
              <div class="mb-3">
                <label for="create_at" class="form-label">文章建立日期</label>
                <input
                  v-model="dueDate"
                  id="create_at"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label class="form-label">標籤</label>
                <!-- every tag -->
                <div class="row">
                  <div
                    class="col-sm-3 mb-1"
                    v-for="(tg, idx) in selectedItem.tag"
                    :key="idx"
                  >
                    <div class="input-group input-group-sm">
                      <input
                        v-model="selectedItem.tag[idx]"
                        type="text"
                        class="form-control"
                        placeholder="請輸入標籤"
                      />
                      <button
                        class="btn btn-outline-danger btn-sm"
                        @click="this.selectedItem.tag.splice(idx, 1)"
                      >
                        x
                      </button>
                    </div>
                  </div>
                  <div
                    class="col-sm-3"
                    v-if="
                      !selectedItem.tag ||
                      selectedItem.tag.length === 0 ||
                      selectedItem.tag[selectedItem.tag.length - 1].length > 0
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm w-100"
                      @click="selectedItem.tag.push('')"
                    >
                      新增標籤
                    </button>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  v-model="selectedItem.description"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="文章描述"
                >
                </textarea>
              </div>
              <!-- editor here -->
              <div class="mb-3">
                <label for="content" class="form-label">文章內容</label>
                <textarea
                  v-model="selectedItem.content"
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="文章內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="selectedItem.isPublic"
                    id="isPublic"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="isPublic"
                    >是否公開</label
                  >
                </div>
              </div>
            </div>
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
            {{ selectedItem?.id ? "更新" : "新增" }}貼文
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import { ToSimpleDate } from "@/utils/dateHelper.js";

export default {
  props: ["item"],
  emits: ["update"],
  data() {
    return {
      selectedItem: {
        author: "",
        description: "",
        content: "",
        create_at: 0,
        isPublic: false,
        tag: [],
        title: "",
        num: 0,
      },
      dueDate: "1911-01-01",
      editModal: null,
    };
  },
  watch: {
    item() {
      this.selectedItem = { ...this.item };
      this.dueDate = ToSimpleDate(this.item.create_at * 1000, "-");
    },
    dueDate() {
      this.selectedItem.create_at = Math.floor(new Date(this.dueDate) / 1000);
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
  },
  mounted() {
    this.editModal = new Modal(this.$refs.productModal, {
      keyboard: false,
    });
  },
};
</script>
