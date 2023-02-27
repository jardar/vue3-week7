const { VITE_API, VITE_PATH } = import.meta.env;
// const apiBase = "https://vue3-course-api.hexschool.io";

const aProduct = `${VITE_API}/api/${VITE_PATH}/product`;
const products = `${VITE_API}/api/${VITE_PATH}/products`;
const theCart = `${VITE_API}/api/${VITE_PATH}/cart`;
const carts = `${VITE_API}/api/${VITE_PATH}/carts`;
const aOrder = `${VITE_API}/api/${VITE_PATH}/order`; ///v2/api/{api_path}/admin/orders
//
const admProducts = `${VITE_API}/api/${VITE_PATH}/admin/products`;

export default {
  epLogin: `${VITE_API}/admin/signin`,
  epUserCheck: `${VITE_API}/api/user/check`,
  //
  epAdmAllProducts: `${admProducts}/all`,
  epAdmGetProductsByCatPage: admProducts,

  epAdmCreateProduct: `${VITE_API}/api/${VITE_PATH}/admin/product`,
  epAdmUpdateProduct: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/product/${id}`,
  epAdmDeleteProducts: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/product/${id}`,
  // order

  epAdmGetOrdersByPage: (page) =>
    `${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`,
  epAdmUpdateOrderById: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/order/${id}`,
  epAdmDeleteOrderById: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/order/${id}`,
  // coupon
  epAdmGetCouponsByPage: (page) =>
    `${VITE_API}/api/${VITE_PATH}/admin/coupons?page=${page}`,
  epAdmCreateCoupon: `${VITE_API}/api/${VITE_PATH}/admin/coupon`,
  epAdmUpdateCoupon: (id) => `${VITE_API}/api/${VITE_PATH}/admin/coupon/${id}`,
  epAdmDeleteCouponById: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/coupon/${id}`,
  // article
  epAdmGetArticlesByPage: (page) =>
    `${VITE_API}/api/${VITE_PATH}/admin/articles?page=${page}`,
  epAdmGetArticlesById: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/article/${id}`,
  epAdmCreateArticle: `${VITE_API}/api/${VITE_PATH}/admin/article`,
  epAdmUpdateArticle: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/article/${id}`,
  epAdmDeleteArticleById: (id) =>
    `${VITE_API}/api/${VITE_PATH}/admin/article/${id}`,
  //
  epAllProducts: `${products}/all`,
  epAProductById: (id) => `${aProduct}/${id}`,
  // cart
  epAddToCart: `${theCart}`,
  epGetCarts: `${theCart}`,
  epUpdateCart: (id) => `${theCart}/${id}`,
  epDeleteCarts: `${carts}`,
  epDeleteACart: (id) => `${theCart}/${id}`,
  // order
  epCreateOrder: `${aOrder}`,
  // user article
  epGetArticlesByPage: (page) =>
    `${VITE_API}/api/${VITE_PATH}/articles?page=${page}`,
  epGetArticlesById: (id) => `${VITE_API}/api/${VITE_PATH}/article/${id}`,
  //
  epUploadFile: `${VITE_API}/api/${VITE_PATH}/admin/upload`,
};
