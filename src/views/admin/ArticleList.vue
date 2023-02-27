<template>
  <button
    type="button"
    class="btn btn-primary float-end"
    @click="showCreateModal"
  >
    建立新的頁面
  </button>
  <table class="table">
    <vue-loading
      v-model:active="getContainLoading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <thead>
      <tr>
        <th scope="col">標題</th>
        <th scope="col">作者</th>
        <th scope="col">描述</th>
        <th scope="col">到期日</th>
        <th scope="col" class="text-center">是否公開</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row">{{ item.title }}</th>
        <td>{{ item.author }}</td>
        <td>{{ item.description }}</td>
        <td>
          {{ ToSimpleDate(item.create_at * 1000) }}
        </td>
        <td class="text-center">
          <span v-if="item.isPublic" class="text-success">公開</span>
          <span v-else>未公開</span>
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

  <edit-article
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
import EditArticle from "@/components/EditArticle.vue";
import { ToSimpleDate } from "@/utils/dateHelper.js";
import DeleteDlg from "@/components/DeleteDlg.vue";

export default {
  components: {
    PageComp,
    EditArticle,
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
        author: "",
        description: "",
        content: "",
        create_at: 0,
        isPublic: false,
        tag: [],
        title: "",
        num: 0,
      };
    },
    showCreateModal() {
      this.resetSelected();
      this.$refs.editDlgRef.show();
    },
    showUpdateModal(item) {
      this.setContainLoading(true);
      axios
        .get(hex.epAdmGetArticlesById(item.id))
        .then((res) => {
          console.log(res.data);
          this.selectedItem = { ...res.data.article };
          this.$refs.editDlgRef.show();
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
    showDeleteModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      this.$refs.deleteDlgRef.show();
    },
    handleEditOrCreate({ isNew, data }) {
      console.log("article=", data);
      // data = {
      //   title: "新增第一篇文章",
      //   description: "文章內容",
      //   image: "test.testtest",
      //   tag: ["tag1"],
      //   create_at: 1555459220,
      //   author: "alice",
      //   isPublic: false,
      //   content: "這是內容",
      // };
      this.setContainLoading(true);
      if (isNew) {
        axios
          .post(`${hex.epAdmCreateArticle}`, {
            data: data,
          })
          .then((res) => {
            showToast(`${res.data.message}`);
            this.doGetAdminArticlesByPage();
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
          .put(hex.epAdmUpdateArticle(data.id), {
            data: data,
          })
          .then((res) => {
            showToast(`${res.data.message}`);
            this.doGetAdminArticlesByPage();
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
          .delete(hex.epAdmDeleteArticleById(this.selectedItem.id))
          .then((res) => {
            showToast(`${res.data.message}`);
            // this.doGetAdminProductsByPage();
            return axios.get(hex.epAdmGetArticlesByPage(1));
          })
          .then((res) => {
            console.log(res.data);
            this.page = res.data.pagination;
            const articles = res.data.articles;
            this.items = articles ? Object.values(articles) : [];
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
    doGetAdminArticlesByPage(pageNum = 1) {
      this.setContainLoading(true);
      axios
        .get(hex.epAdmGetArticlesByPage(pageNum))
        .then((res) => {
          console.log(res.data);
          this.page = res.data.pagination;
          const articles = res.data.articles;
          this.items = articles ? Object.values(articles) : [];
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
    doGetAdminArticleById(id) {
      this.setContainLoading(true);
      axios
        .get(hex.epAdmGetArticlesById(id))
        .then((res) => {
          console.log(res.data);
          this.selectedItem = res.data.article;
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
    this.doGetAdminArticlesByPage();
  },
};
</script>
