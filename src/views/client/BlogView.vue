<template>
  <vue-loading
    v-model:active="getContainLoading"
    :can-cancel="false"
    :is-full-page="false"
  />
  <div class="row mb-4 g-2">
    <div class="col-sm-6" v-for="item in items" :key="item.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            {{ item.description }}
          </p>
          <a
            href="#"
            class="btn btn-outline-primary"
            @click.prevent="handleArticleDetail(item.id)"
            >文章頁面</a
          >
        </div>
      </div>
    </div>
  </div>
  <page-comp :page="page" @change="handlePageChange"></page-comp>
</template>

<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
import PageComp from "@/components/PaginationComp.vue";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
export default {
  components: {
    PageComp,
  },
  data() {
    return {
      items: [],
      page: {},
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["getContainLoading"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setContainLoading"]),
    handlePageChange(pageIdx) {
      // console.log(pageIdx);
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetArticleByPage(pageIdx);
    },
    handleArticleDetail(itemId) {
      this.$router.push({
        name: "BlogDetail",
        params: {
          id: itemId,
        },
      });
    },
    doGetArticleByPage(page) {
      this.setContainLoading(true);
      axios
        .get(hex.epGetArticlesByPage(page))
        .then((res) => {
          this.page = res.data.pagination;
          const articles = res.data.articles;
          this.items = articles ? Object.values(articles) : [];
        })
        .catch((err) => {
          showDlg("失敗", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.setContainLoading(false);
        });
    },
  },

  mounted() {
    this.setContainLoading(true);
    axios
      .get(hex.epGetArticlesByPage(1))
      .then((res) => {
        this.page = res.data.pagination;
        const articles = res.data.articles;
        this.items = articles ? Object.values(articles) : [];
      })
      .catch((err) => {
        showDlg("失敗", err.response.data.message || "error", "error");
      })
      .finally(() => {
        this.setContainLoading(false);
      });
  },
};
</script>
