<template>
  <div>
    <el-drawer v-model="openDrawer" :with-header="false">
      <div class="drawer-container">
        <div class="header">
          <h2>回复</h2>
          <span class="username">@{{ usernameDrawer }} ：</span>
        </div>
        <el-input
          v-model="textarea"
          maxlength="1000"
          placeholder="Please input"
          show-word-limit
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
        />
        <el-button
          type="primary"
          size="large"
          class="publish"
          @click="doPublish"
          >Publish</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from "vue";
import { ElNotification } from "element-plus";
import FastScanner from "fastscan";
import { messageAddReply } from "@/api/message";
import { useUserInfoStore } from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();

const user_id = computed(() => userInfoStore.getUserId);

const textarea = ref("");

let openDrawer: any = ref(false); // 声明变量
openDrawer = inject("openDrawer"); // 接收父级组件的传值

let usernameDrawer: any = ref(""); // 声明变量
usernameDrawer = inject("usernameDrawer"); // 接收父级组件的传值

let bannedWords: any = ref([]); // 声明变量
bannedWords = inject("bannedWords"); // 接收父级组件的传值

let messageIdDrawer: any = ref(0); // 声明变量
messageIdDrawer = inject("messageIdDrawer"); // 接收父级组件的传值

let target_id: any = ref(0); // 声明变量
target_id = inject("targetIdDrawer"); // 接收父级组件的传值

let reply_type: any = ref(""); // 声明变量
reply_type = inject("replyTypeDrawer"); // 接收父级组件的传值

let father_id: any = ref(0); // 声明变量
father_id = inject("fatherIdDrawer"); // 接收父级组件的传值

const queryMessageAddOne = () => {
  // father_id：父元素的 id（若 reply_type 为 message，father_id 为 message_id；若 reply_type 为 reply，father_id 为这条回复的父回复的 id）
  const father_id_value =
    reply_type.value === "1" ? messageIdDrawer.value : father_id.value;

  messageAddReply({
    message_id: messageIdDrawer.value,
    content: textarea.value,
    user_id: user_id.value,
    target_id: target_id.value,
    reply_type: reply_type.value,
    father_id: father_id_value,
  }).then((res) => {
    if (res.data.code == 200) {
      ElNotification({
        title: "恭喜",
        message: res.data.message,
        type: "success",
        position: "top-right",
      });
      textarea.value = "";
      openDrawer.value = false;

      doRefresh();
    }
  });
};

// 调用父组件的 refresh 方法
const emit = defineEmits(["refresh"]);
const doRefresh = () => {
  emit("refresh");
};

const doPublish = () => {
  if (textarea.value.trim() != "") {
    /**
     * 违禁词过滤的使用教程：https://github.com/pyloque/fastscan
     * 违禁词的词库：https://github.com/fwwdn/sensitive-stop-words
     */
    const scanner = new FastScanner(bannedWords.value);
    const hits = scanner.hits(textarea.value);
    const wordsArr = Object.keys(hits);
    if (wordsArr.length == 0) {
      queryMessageAddOne();
    } else {
      ElNotification({
        title: "请文明留言",
        message: `含有违禁词：${wordsArr}`,
        type: "warning",
        position: "top-right",
      });
    }
  } else {
    ElNotification({
      title: "warning",
      message: "Content cannot be empty",
      type: "warning",
      position: "top-right",
    });
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;

    .username {
      color: #333;
      font-size: 16px;
      margin-left: 2px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .publish {
    width: 100%;
    display: flex;
    margin: 20px auto 30px;
  }
}
</style>
