import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    chartsData: [],
  }),
  getters: {
    getChartsData: (state) => state.chartsData,
  },
  actions: {
    setChartsData(data: []) {
      this.chartsData = data;
    },
  },
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [{ storage: localStorage, paths: ["chartsData"] }],
  },
});
