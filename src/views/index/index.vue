<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout">
    <el-container class="index-container">
      <el-header class="header">
        <div class="left">
          <el-icon
            style="font-size: 30px; margin-right: 22px"
            @click="isCollapse = !isCollapse"
          >
            <Operation />
          </el-icon>
          <span class="title">顶级的知识</span>
        </div>
        <!-- 文本谈入谈出 -->
        <span class="textAnimate" v-if="showText">
          I am so happy to have met you
        </span>
        <div class="right">
          <!-- Bug 提示 -->
          <div v-show="bugs.length > 0">
            <el-popover
              trigger="hover"
              :width="500"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <img src="@/assets/image/bug.png" alt="bug" class="bug" />
              </template>
              <template #default>
                <ul class="infinite-list">
                  <li class="title">BUG</li>
                  <li
                    v-for="(item, index) in bugs"
                    :key="index"
                    class="infinite-list-item"
                  >
                    <span>报错接口：{{ item.url }}</span>
                    <el-divider
                      content-position="right"
                      border-style="dashed"
                      class="bugLine"
                    >
                      {{ index + 1 }}
                    </el-divider>
                    <span>错误提示：{{ item.msg }}</span>
                  </li>
                </ul>
              </template>
            </el-popover>
          </div>
          <!-- 头像动画 -->
          <div class="avatar-box">
            <div class="content">
              <el-avatar class="avatar" :src="avatar">
                <img src="@/assets/image/whiteDog.jpg" />
              </el-avatar>
              <el-button
                type="primary"
                :icon="Edit"
                circle
                @click="editAvatar"
                class="edit"
              />
            </div>
          </div>
          <span class="name">{{ username }}，{{ timeState() }}</span>
          <el-button type="primary" @click="exit">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width: auto" width="200px">
          <!-- 导航 -->
          <el-menu
            :default-active="activeRoute"
            class="menu-vertical"
            :collapse="isCollapse"
            :router="true"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="(item, index) in router.options.routes[1].children"
              :key="index"
              :index="item.meta?.fullPath"
            >
              <el-icon>
                <component :is="item.meta?.icon" />
              </el-icon>
              <template #title>{{ item.meta?.title }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div class="filing">
      <a href="https://beian.miit.gov.cn/" target="_blank" class="file">
        备案号：粤ICP备2022103596号-1
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { useSystemStore } from "@/stores/system";
import { useBugStore } from "@/stores/bug";
import router from "@/router/index";
import { ElContainer } from "element-plus";
import { Edit } from "@element-plus/icons-vue";

const bugStore = useBugStore();
const infoStore = useUserInfoStore();
const systemStore = useSystemStore();
const bugs = computed(() => bugStore.getBugs);
const avatar = computed(() => infoStore.avatar);
const username = computed(() => infoStore.username);
const pageRouter = computed(() => systemStore.pageRouter);

const showText = ref(true); // 是否显示文字

const showTextNow = () => {
  setTimeout(() => {
    showText.value = false;
  }, 8000);
};
showTextNow();

const isCollapse = ref(false); // 是否折叠菜单

const activeRoute = ref("/index/chart"); // 激活的菜单

const exit = (): void => {
  router.push({ path: "/login" });
  window.localStorage.clear();
  bugStore.cleanBug();
};

const timeState = () => {
  const now = new Date();
  const hours = now.getHours();
  let state = "";
  if (hours >= 0 && hours <= 10) {
    state = "早上好 ٩(๑^o^๑)۶";
  } else if (hours > 10 && hours <= 14) {
    state = "中午好 (⑅˃◡˂⑅)";
  } else if (hours > 14 && hours <= 18) {
    state = "下午好 ᐠ( ᐢ ᵕ ᐢ )ᐟ";
  } else if (hours > 18 && hours <= 24) {
    state = "晚上好 ٩(ˊᗜˋ*)و";
  } else {
    state = "你好";
  }
  return state;
};

const editAvatar = () => {
  router.push({ path: "/index/mine" });
  handleSelect("/index/mine"); // 菜单高亮
};

const handleSelect = (index: string) => {
  activeRoute.value = index;

  try {
    console.log(
      "          _____                _____                    _____                   _______                   _____                    _____          \n         /\\    \\              |\\    \\                  /\\    \\                 /::\\    \\                 /\\    \\                  /\\    \\         \n        /::\\____\\             |:\\____\\                /::\\    \\               /::::\\    \\               /::\\    \\                /::\\    \\        \n       /::::|   |             |::|   |               /::::\\    \\             /::::::\\    \\             /::::\\    \\              /::::\\    \\       \n      /:::::|   |             |::|   |              /::::::\\    \\           /::::::::\\    \\           /::::::\\    \\            /::::::\\    \\      \n     /::::::|   |             |::|   |             /:::/\\:::\\    \\         /:::/~~\\:::\\    \\         /:::/\\:::\\    \\          /:::/\\:::\\    \\     \n    /:::/|::|   |             |::|   |            /:::/  \\:::\\    \\       /:::/    \\:::\\    \\       /:::/__\\:::\\    \\        /:::/__\\:::\\    \\    \n   /:::/ |::|   |             |::|   |           /:::/    \\:::\\    \\     /:::/    / \\:::\\    \\     /::::\\   \\:::\\    \\       \\:::\\   \\:::\\    \\   \n  /:::/  |::|___|______       |::|___|______    /:::/    / \\:::\\    \\   /:::/____/   \\:::\\____\\   /::::::\\   \\:::\\    \\    ___\\:::\\   \\:::\\    \\  \n /:::/   |::::::::\\    \\      /::::::::\\    \\  /:::/    /   \\:::\\ ___\\ |:::|    |     |:::|    | /:::/\\:::\\   \\:::\\    \\  /\\   \\:::\\   \\:::\\    \\ \n/:::/    |:::::::::\\____\\    /::::::::::\\____\\/:::/____/  ___\\:::|    ||:::|____|     |:::|    |/:::/__\\:::\\   \\:::\\____\\/::\\   \\:::\\   \\:::\\____\\\n\\::/    / ~~~~~/:::/    /   /:::/~~~~/~~      \\:::\\    \\ /\\  /:::|____| \\:::\\    \\   /:::/    / \\:::\\   \\:::\\   \\::/    /\\:::\\   \\:::\\   \\::/    /\n \\/____/      /:::/    /   /:::/    /          \\:::\\    /::\\ \\::/    /   \\:::\\    \\ /:::/    /   \\:::\\   \\:::\\   \\/____/  \\:::\\   \\:::\\   \\/____/ \n             /:::/    /   /:::/    /            \\:::\\   \\:::\\ \\/____/     \\:::\\    /:::/    /     \\:::\\   \\:::\\    \\       \\:::\\   \\:::\\    \\     \n            /:::/    /   /:::/    /              \\:::\\   \\:::\\____\\        \\:::\\__/:::/    /       \\:::\\   \\:::\\____\\       \\:::\\   \\:::\\____\\    \n           /:::/    /    \\::/    /                \\:::\\  /:::/    /         \\::::::::/    /         \\:::\\   \\::/    /        \\:::\\  /:::/    /    \n          /:::/    /      \\/____/                  \\:::\\/:::/    /           \\::::::/    /           \\:::\\   \\/____/          \\:::\\/:::/    /     \n         /:::/    /                                 \\::::::/    /             \\::::/    /             \\:::\\    \\               \\::::::/    /      \n        /:::/    /                                   \\::::/    /               \\::/____/               \\:::\\____\\               \\::::/    /       \n        \\::/    /                                     \\::/____/                 ~~                      \\::/    /                \\::/    /        \n         \\/____/                                                                                         \\/____/                  \\/____/         \n\n 查宇，联系牛 B 的前端开发工程师 mynameiszhayu@163.com \n "
    );
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  handleSelect(pageRouter.value); // 浏览器刷新后当前菜单高亮
});
</script>

<style lang="scss" scoped>
.index-container {
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f9f9f9;

    .left {
      display: flex;
      align-items: center;

      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }

    .right {
      display: flex;
      align-items: center;

      // 头像动画
      .avatar-box {
        position: relative;
        width: 43px;
        height: 43px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;

        &::before {
          content: "";
          position: absolute;
          inset: -10px 10px;
          background: linear-gradient(315deg, #00ccff, #d400d4);
          transform: 0.5s;
          animation: avatarAnimate 4s linear infinite;
        }
        @keyframes avatarAnimate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        &:hover::before {
          inset: -10px 0px;
        }
        &:hover .avatar {
          opacity: 0;
        }

        .content {
          position: absolute;
          inset: 1px;
          z-index: 3;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .avatar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.5s;
            pointer-events: none;
            z-index: 3;
          }

          .edit {
            position: relative;
            background: #fff;
            color: #070a1c;
            transition: 0.05;

            &:hover {
              letter-spacing: 0.02em;
            }
          }
        }
      }

      .bug {
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }

      .name {
        margin-right: 38px;
      }

      .iconBell {
        margin-right: 10px;
      }
    }

    // 文本谈入谈出
    .textAnimate {
      position: relative;
      display: flex;
      max-width: 460px;
      font-size: 30px;
      color: #409eff;
      overflow: hidden;
      z-index: -10;

      &::before {
        content: "";
        position: absolute;
        left: 120%;
        width: 120%;
        height: 50px;
        background: linear-gradient(99deg, transparent 0%, #fff 5%, #fff 100%);
        animation: animate 8s linear forwards;
      }

      @keyframes animate {
        0% {
          left: -10%;
        }

        50% {
          left: 110%;
        }

        100% {
          left: -10%;
        }
      }
    }
  }

  // 侧边导航
  .menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
  }

  .main {
    background-color: #e8e9ec;
  }
}

.filing {
  width: 100%;
  .file {
    width: 100%;
    color: #73777a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    &:hover {
      color: #409eff;
    }
  }
}

// 无限滚动
.infinite-list {
  max-height: 500px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;

  .title {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .infinite-list-item {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    background: var(--el-color-primary-light-9);
    margin-bottom: 10px;
    color: var(--el-color-error);
    padding: 10px;

    .bugLine {
      margin: 10px 0;
    }
  }
}
</style>
