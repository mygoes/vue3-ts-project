import { defineStore } from "pinia";

export const useBugStore = defineStore("bug", {
  state: () => ({
    // 记录待修复的接口 Bug
    bugs: [{ url: "", msg: "" }],
  }),
  getters: {
    getBugs: (state) => {
      if (state.bugs.length > 0) {
        // 过滤掉空数据
        const nonEmptyArr = state.bugs.filter(
          (item) => typeof item.msg == "string" && item.msg.length > 0
        );
        return nonEmptyArr;
      } else {
        return state.bugs;
      }
    },
  },
  actions: {
    addBug(data: { url: string; msg: string }) {
      // 根据 url 值判断是否有重复元素
      const index = this.bugs.findIndex((item) => item.url === data.url);
      if (index == -1) {
        // 无重复，则添加
        this.bugs.push(data);
      } else {
        // 有重复，则替换
        this.bugs.splice(index, 1, data);
      }
    },
    cleanBug() {
      this.bugs = [{ url: "", msg: "" }];
    },
  },
});
