<template>
  <div
    class="modal fade"
    ref="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
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
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{}}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="handleAdd"
                  >
                    <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
export default {
  props: ["onAddToCart"],
  data() {
    return {
      myModal: {},
      pid: "",
      product: {},
      qty: 1,
      isLoading: false,
    };
  },
  methods: {
    show(prod) {
      this.isLoading = false;
      this.product = prod;
      this.qty = 1;
      // console.log("dlg", prod);
      this.myModal.show();
    },
    hide() {
      this.myModal.hide();
    },
    handleAdd() {
      this.isLoading = true;
      this.onAddToCart(this.product.id, this.qty);
    },
  },
  mounted() {
    this.myModal = new Modal(this.$refs.productModal, {
      keyboard: true,
    });
    // console.log(this.myModal);
  },
};
</script>
