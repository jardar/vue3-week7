<template>
  <div
    id="orderModal"
    ref="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="item">
          <div class="row">
            <div class="col-sm-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">姓名</th>
                    <td>{{ item.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{{ item.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>{{ item.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row">地址</th>
                    <td>{{ item.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-sm-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">訂單編號</th>
                    <td>{{ item.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">下單時間</th>
                    <td>{{ item.create_at }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款時間</th>
                    <td>jardar</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>{{ item.is_paid ? "已付款" : "未付款" }}</td>
                  </tr>
                  <tr>
                    <th scope="row">總金額</th>
                    <td>{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="(p, k) in item.products" :key="k">
                    <th scope="row">{{ p.product.title }}</th>
                    <td>{{ p.qty }} / {{ p.product.unit }}</td>
                    <td class="text-end">{{ p.total }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check float-end">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="item.is_paid"
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {{ item.is_paid ? "已付款" : "未付款" }}
                </label>
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
          <button type="button" class="btn btn-primary" @click="handleEdit">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
export default {
  emits: ["update"],
  data() {
    return {
      orderModal: null,
      item: null,
    };
  },
  methods: {
    handleEdit() {
      this.$emit("update", this.item);
    },
    show(item) {
      this.item = item;
      this.orderModal.show();
    },
    hide() {
      this.orderModal.hide();
    },
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal, {
      keyboard: false,
    });
  },
};
</script>
