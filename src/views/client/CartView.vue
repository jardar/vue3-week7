<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <product-dlg
        ref="productDlg"
        :on-add-to-cart="handleAddToCart"
      ></product-dlg>
      <!-- loading -->
      <vue-loading v-model:active.sync="showLoading"></vue-loading>

      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in products" :key="prod.id">
            <td style="width: 200px">
              <img
                :src="prod.imageUrl"
                alt="prod.title"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              />
            </td>
            <td>{{ prod.title }}</td>
            <td>
              <del class="h6">原價 {{ prod.origin_price }} 元</del>
              <div class="h5">現在只要 {{ prod.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="handleMore(prod.id)"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="isLoading === prod.id"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="handleAddToCart(prod.id)"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="isAddLoading === prod.id"
                  ></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="handleClearAllCart"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="handleDelCart(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="isDelLoading === item.id"
                  ></i>
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div
                  class="text-success"
                  v-if="item.product.origin_price > item.product.price"
                >
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      :value="item.qty"
                      @blur="
                        (e) =>
                          handleQtyChange(
                            item.id,
                            item.product_id,
                            e.target.value
                          )
                      "
                    />
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">{{ item.product.price }}</td>
              <td class="text-end">
                <small
                  class="text-success"
                  v-if="item.product.origin_price > item.product.price"
                  >折扣價：</small
                >
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="my-5 row justify-content-center">
      <v-form
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="onSubmit"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            v-model="order.email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="required|email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            v-model="order.name"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="tel"
            v-model="order.tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="cellphone"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            v-model="order.addr"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            v-model="order.note"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="Object.keys(errors).length > 0"
          >
            送出訂單
          </button>
        </div>
      </v-form>
    </div>
  </div>
  <product-dlg :onAddToCart="handleAddToCart"></product-dlg>
</template>

<script>
import ProductDlg from "@/components/Product-Dlg.vue";
import axios from "axios";
import hex from "@/utils/hex-api.js";
const { VITE_NAME, VITE_EMAIL } = import.meta.env;
const { VITE_TEL, VITE_ADDR, VITE_NOTE } = import.meta.env;
export default {
  components: {
    ProductDlg,
  },
  data() {
    return {
      products: [],
      isLoading: "",
      isAddLoading: "",
      isDelLoading: "",
      showLoading: false,
      cart: {
        carts: [],
      },
      order: {
        name: VITE_NAME,
        email: VITE_EMAIL,
        tel: VITE_TEL,
        addr: VITE_ADDR,
        note: VITE_NOTE,
      },
    };
  },
  methods: {
    clearOrderInfo() {
      this.order = {
        name: VITE_NAME,
        email: VITE_EMAIL,
        tel: VITE_TEL,
        addr: VITE_ADDR,
        note: VITE_NOTE,
      };
    },
    onSubmit() {
      this.isLoading = true;
      axios
        .post(hex.epCreateOrder, {
          data: {
            user: {
              name: this.order.name,
              email: this.order.email,
              tel: this.order.tel,
              address: this.order.addr,
            },
            message: this.order.note,
          },
        })
        .then((res) => {
          alert("結帳成功");
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleMore(productId) {
      // console.log("handleMore:", productId);
      this.isLoading = productId;
      axios
        .get(hex.epAProductById(productId))
        .then((res) => {
          this.$refs.productDlg.show(res.data.product);
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isLoading = "";
        });
    },
    handleAddToCart(productId, qty = 1) {
      // if already in cart
      this.isAddLoading = productId;
      const found = this.cart.carts.find(
        (item) => item.product_id === productId
      );
      if (!found) {
        axios
          .post(hex.epAddToCart, {
            data: {
              product_id: productId,
              qty: qty,
            },
          })
          .then((res) => {
            alert("加入購物車成功");
            this.doGetCart();
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message || "error"}`);
          })
          .finally(() => {
            this.$refs.productDlg.hide();
            this.isAddLoading = "";
          });
      } else {
        this.handleQtyChange(found.id, productId, found.qty + qty);
      }
    },
    handleQtyChange(cartId, productId, qty) {
      // 防止因 loading 而重新 render cart list 中的數量。
      const found = this.cart.carts.find((item) => item.id === cartId);
      found.qty = qty;

      this.showLoading = true;
      axios
        .put(hex.epUpdateCart(cartId), {
          data: {
            product_id: productId,
            qty: parseInt(qty),
          },
        })
        .then((res) => {
          alert("數量更改成功");
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.$refs.productDlg.hide();
          this.isAddLoading = "";
          this.showLoading = false;
        });
    },
    handleDelCart(cartId) {
      this.isDelLoading = cartId;
      axios
        .delete(hex.epDeleteACart(cartId))
        .then((res) => {
          alert(res.data.message);
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isDelLoading = "";
        });
    },
    handleClearAllCart() {
      this.showLoading = true;
      axios
        .delete(hex.epDeleteCarts)
        .then((res) => {
          alert(res.data.message);
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    doGetCart() {
      axios
        .get(hex.epGetCarts)
        .then((res) => {
          // console.log(res.data.data);
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {});
    },
  },
  mounted() {
    axios
      .get(`${hex.epAllProducts}`)
      .then((res) => {
        // console.log(res.data.products);
        this.products = res.data.products;
        this.doGetCart();
      })
      .catch((err) => {
        alert(`失敗:${err.response.data.message || "error"}`);
      })
      .finally(() => {});
  },
};
</script>
<style scoped>
td {
  vertical-align: middle;
}
</style>
