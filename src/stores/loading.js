import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state() {
    return {
      loading: {
        containLoading: false,
        fullLoading: false,
        targetId: "",
      },
    };
  },
  getters: {
    getContainLoading() {
      return this.loading.containLoading;
    },
  },
  actions: {
    setContainLoading(state = false) {
      this.loading.containLoading = state;
    },
  },
});
