import { defineStore } from "pinia";

export const useUserInfoStore = defineStore({
  id: "userInfo",
  state: () => ({
    user_id: 0,
    username: "主人",
    avatar: "",
    role: "",
  }),
  getters: {
    getUserId: (state) => state.user_id,
    userInfoAvatar: (state) => state.avatar,
    userInfoUsername: (state) => state.username,
    getUserInfo: (state) => state,
  },
  actions: {
    setUserId(data: number) {
      this.user_id = data;
    },
    setAvatar(data: string) {
      this.avatar = data;
    },
    setUsername(data: string) {
      this.username = data;
    },
  },
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        key: "user_id",
        storage: localStorage,
        paths: ["user_id"],
      },
      {
        key: "username",
        storage: localStorage,
        paths: ["username"],
      },
      {
        key: "avatar",
        storage: localStorage,
        paths: ["avatar"],
      },
    ],
  },
});
