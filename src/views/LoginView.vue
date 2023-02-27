<template>
  <div class="container vl-parent">
    <vue-loading
      v-model:active="getContainLoading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>

          <div class="form-floating">
            <input
              v-model="pass"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            @click="handleLogin"
            class="btn btn-lg btn-primary w-100 mt-3"
            type="button"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>
<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
import { showToast, showDlg } from "@/utils/dlg.js";
import { mapState, mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";

const { VITE_API_EMAIL, VITE_API_PASS } = import.meta.env;
export default {
  data() {
    return {
      email: VITE_API_EMAIL,
      pass: VITE_API_PASS,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["getContainLoading"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setContainLoading"]),
    handleLogin() {
      if (this.email == "" || this.pass == "") {
        alert("請輸入帳密");
        return;
      }
      this.setContainLoading(true);
      axios
        .post(`${hex.epLogin}`, {
          username: this.email,
          password: this.pass,
        })
        .then((res) => {
          // console.log(res.data);
          document.cookie = `myToken=${res.data.token}; expires=${new Date(
            res.data.expires
          )};`;
          axios.defaults.headers.common["Authorization"] = res.data.token;

          showToast("登入成功");
          const nextUrl = this.$route.query.redirect || "/adm";
          console.log(nextUrl);
          const passQuery = { ...this.$route.query };
          delete passQuery.redirect;

          this.$router.replace({ path: nextUrl, query: passQuery });
        })
        .catch((err) => {
          // alert(err.response.data.message || "error");
          showDlg("錯誤", err.response.data.message || "error", "error");
        })
        .finally(() => {
          this.setContainLoading(false);
        });
    },
  },
};
</script>
