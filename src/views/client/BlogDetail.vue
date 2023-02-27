<template>
  <vue-loading
    v-model:active="getContainLoading"
    :can-cancel="false"
    :is-full-page="false"
  />
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link class="nav-link" to="/user/blog">文章列表</router-link>
        <a href="#"></a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ item.title }}
      </li>
    </ol>
  </nav>
  <div v-if="item.title && item.title.length > 0">
    <h1>{{ item.title }}</h1>
    <small>
      {{ ToSimpleDate(item.create_at * 1000) }} - 作者：{{ item.author }}
    </small>

    <p class="mt-5">
      {{ item.description }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import { ToSimpleDate } from "@/utils/dateHelper.js";
export default {
  props: ["id"],
  computed: {
    ...mapState(useLoadingStore, ["getContainLoading"]),
  },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    ...mapActions(useLoadingStore, ["setContainLoading"]),
    ToSimpleDate: ToSimpleDate,
  },
  mounted() {
    this.setContainLoading(true);
    axios
      .get(hex.epGetArticlesById(this.id))
      .then((res) => {
        this.item = res.data.article;
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
