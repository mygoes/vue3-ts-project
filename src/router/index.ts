import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "../views/login/login.vue";
import { useSystemStore } from "@/stores/system";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login",
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/index/index.vue"),
      meta: {
        roles: [
          "超级管理员",
          "管理员",
          "普通用户",
          "游客",
          "靓仔",
          "人见人爱的仙女",
        ],
      },
      children: [
        {
          path: "chart",
          name: "chart",
          component: () => import("../views/index/chart/chart.vue"),
          meta: {
            roles: ["超级管理员", "管理员", "游客", "靓仔", "人见人爱的仙女"],
            title: "数据概览",
            fullPath: "/index/chart",
            icon: "PieChart",
          },
        },
        {
          path: "user",
          name: "user",
          component: () => import("../views/index/user/user.vue"),
          meta: {
            roles: ["超级管理员", "管理员", "普通用户", "游客"],
            title: "用户列表",
            fullPath: "/index/user",
            icon: "View",
          },
        },
        {
          path: "message",
          name: "message",
          component: () => import("../views/index/message/message.vue"),
          meta: {
            roles: ["超级管理员", "管理员", "普通用户", "游客"],
            title: "留言帖子",
            fullPath: "/index/message",
            icon: "Suitcase",
          },
        },
        {
          path: "means",
          name: "means",
          component: () => import("../views/index/means/means.vue"),
          meta: {
            roles: ["超级管理员", "管理员", "普通用户"],
            title: "便捷工具",
            fullPath: "/index/means",
            icon: "User",
          },
        },
        {
          path: "mine",
          name: "mine",
          component: () => import("../views/index/mine/mine.vue"),
          meta: {
            roles: ["超级管理员", "管理员", "普通用户"],
            title: "个人中心",
            fullPath: "/index/mine",
            icon: "User",
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        roles: ["超级管理员", "管理员", "普通用户", "游客"],
        title: "登录 | 注册",
      },
    },
    {
      path: "/401",
      name: "401",
      component: () => import("../views/401.vue"),
      meta: {
        title: "401",
      },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/404.vue"),
      meta: {
        title: "404",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/404",
    },
  ],
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const systemStore = useSystemStore();
  systemStore.setPageRouter(to.fullPath); // 存储当前路由到 Pinia

  if (to.meta.title) {
    document.title = `开发助手--${to.meta.title}`;
  }

  next();
});

export default router;
