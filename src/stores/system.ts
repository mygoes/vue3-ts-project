import { defineStore } from "pinia";

export const useSystemStore = defineStore({
  id: "system",
  state: () => ({
    pageRouter: "/index/chart",
  }),
  getters: {
    getPageRouter: (state) => state.pageRouter,
  },
  actions: {
    setPageRouter(data: string) {
      this.pageRouter = data;
    },
  },
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [{ storage: localStorage, paths: ["pageRouter"] }],
  },
});
