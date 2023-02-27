<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/adm">後台</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/adm/products"
                >產品</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/adm/orders">
                訂單
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/adm/coupons">
                優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/adm/articles">
                貼文
              </router-link>
            </li>
            <li class="nav-item">
              <button type="button" class="btn nav-link" @click="handleLogout">
                登出
              </button>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/user/blog">Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/usercart">
                購物車
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="container">
    <RouterView />
  </main>
  <footer>
    <p>僅供學習使用</p>
  </footer>
</template>
<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
export default {
  methods: {
    handleLogout() {
      document.cookie = `myToken=`;
      this.$router.replace("/login");
    },
    doCheckUser() {
      this.isLoading = true;
      axios
        .post(`${hex.epUserCheck}`)
        .then(() => {})
        .catch((err) => {
          alert(err.response.data.message || "error");
          this.$router.push("/login");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  // mounted() {
  //   // # 取出 cookie 中的 token，並塞入 api 的 header
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  //   axios.defaults.headers.common["Authorization"] = token;
  //   this.doCheckUser();
  // },
};
</script>
<style lang="scss">
main {
  padding: 24px;
}
footer {
  text-align: center;
  background-color: rgb(215, 214, 214);
  padding: 8px;
  color: rgb(170, 170, 170);
}
footer p {
  margin: 0;
}
</style>
