import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "@/components/NotFound.vue";
import AdmAppLayout from "@/views/admin/AppLayout.vue";
import axios from "axios";
import hex from "@/utils/hex-api.js";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/adm",
      component: AdmAppLayout,
      meta: {
        auth: true,
      },
      children: [
        {
          path: "products",
          name: "ProductList",
          component: () => import("../views/admin/ProductList.vue"),
        },
        {
          path: "orders",
          name: "OrderList",
          component: () => import("../views/admin/OrderList.vue"),
        },
        {
          path: "coupons",
          name: "CouponList",
          component: () => import("../views/admin/CouponList.vue"),
        },
        {
          path: "articles",
          name: "ArticleList",
          component: () => import("../views/admin/ArticleList.vue"),
        },
      ],
    },
    {
      path: "/user",
      component: AdmAppLayout,
      children: [
        {
          path: "usercart",
          name: "UserCart",
          component: () => import("../views/client/CartView.vue"),
        },
        {
          path: "blog",
          name: "BlogView",
          component: () => import("../views/client/BlogView.vue"),
        },
        {
          path: "blog/:id",
          name: "BlogDetail",
          props: true,
          component: () => import("../views/client/BlogDetail.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    // last route rule
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});
function doCheckUser() {
  return axios
    .post(`${hex.epUserCheck}`)
    .then(() => {
      return {
        ok: true,
      };
    })
    .catch((err) => {
      // alert(err.response.data.message || "error");
      return {
        ok: false,
        msg: err.response.data.message || "error",
      };
    });
}

router.beforeEach(async function (to) {
  // console.log(`router to=${to.path}`);
  // console.log(`router,query=${to.query.q}`);
  // console.log("meta.auth=", to.meta.auth);
  if (to.meta.auth) {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    const reply = await doCheckUser();
    if (reply.ok) {
      return true;
    } else {
      return { path: "/login", query: { redirect: to.path, ...to.query } };
    }
  }
  // const store = useAuthStore();
  // console.log(store.isLogout);
  // if (to.meta.auth && store.isLogout) {
  //   return { path: "/login", query: { redirect: to.path, ...to.query } };
  // }

  // return true;
});
export default router;
