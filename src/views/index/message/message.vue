<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="message-container">
    <el-card
      class="box-card"
      v-infinite-scroll="load"
      style="overflow: auto"
      :infinite-scroll-immediate="false"
    >
      <h2 class="title" id="boardTitle">留言板</h2>
      <el-input
        v-model="textarea"
        maxlength="1000"
        placeholder="Please input"
        show-word-limit
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 12 }"
      />
      <el-button type="primary" size="large" class="publish" @click="doPublish"
        >Publish</el-button
      >
      <div v-for="(item, index) in message.messages" :key="index" class="item">
        <!-- 悬停 -->
        <div class="item-container">
          <div class="cards">
            <div class="card">
              <div>
                <el-avatar
                  :src="urlConfig.baseUrl + item.avatar"
                  fit="cover"
                  class="avatar"
                >
                  <img
                    src="../../../assets/image/whiteDog.jpg"
                    class="avatarImg"
                  />
                </el-avatar>
              </div>
              <div class="container">
                <span class="info username">{{ item.username }}</span>
                <span class="content">{{ item.content }}</span>
                <span class="info"
                  >{{ item.create_time
                  }}<span
                    @click="
                      doReply(
                        item.username,
                        item.id,
                        item.target_id,
                        '1',
                        item.id
                      )
                    "
                    class="reply"
                    >回复</span
                  >
                </span>
                <!-- 回复 -->
                <div v-show="item.reply_show && item.reply_num > 0">
                  <div
                    v-for="(item2, index2) in item.reply_all"
                    :key="index2"
                    class="card"
                  >
                    <div>
                      <el-avatar
                        :src="urlConfig.baseUrl + item2.avatar"
                        fit="cover"
                        class="avatar"
                      >
                        <img
                          src="../../../assets/image/whiteDog.jpg"
                          class="avatarImg"
                        />
                      </el-avatar>
                    </div>
                    <div class="container replyContainer">
                      <span class="info username replyUsername">
                        {{ item2.username || "匿名" }}
                        <span v-if="item2.target_username">
                          ▶ {{ item2.target_username }}
                        </span>
                      </span>
                      <span class="replyContent">{{ item2.content }}</span>
                      <span class="info"
                        >{{ item2.create_time
                        }}<span
                          class="reply"
                          @click="
                            doReply(
                              item2.username || '匿名',
                              item2.message_id,
                              item2.id,
                              '2',
                              item.id
                            )
                          "
                          >回复</span
                        ></span
                      >
                    </div>
                  </div>
                </div>
                <!-- 展开 | 收起 -->
                <div class="actuating">
                  <div class="unfold">
                    <span v-show="item.reply_num > 0" class="divider"></span>
                    <!-- 1.初始的状态：收起 -->
                    <div
                      class="arrows"
                      v-show="item.reply_num > 0 && !item.reply_show"
                      @click="unfold(item.id, index)"
                    >
                      <span class="spread infoDeep">
                        展开{{ item.reply_num }}条回复
                      </span>
                      <el-icon class="infoDeep marginR" size="16">
                        <ArrowDown />
                      </el-icon>
                    </div>
                    <!-- 2.展开后的状态：直接 item.reply_all.length 会报错，因为初始时获取到的 item.reply_all 是一个 undefined。所以要赋值后再做判断 -->
                    <div
                      class="arrows"
                      v-show="
                        item.reply_num > 0 &&
                        item.reply_show &&
                        item.reply_num > item.reply_all.length
                      "
                      @click="unfold(item.id, index, 'more')"
                    >
                      <span class="spread infoDeep">展开更多回复 </span>
                      <el-icon class="infoDeep marginR" size="16">
                        <ArrowDown />
                      </el-icon>
                    </div>
                    <!-- 3.收起的操作 -->
                    <div
                      class="arrows"
                      v-show="item.reply_show"
                      @click="fold(index)"
                    >
                      <span class="spread infoDeep">收起</span>
                      <el-icon class="infoDeep" size="16">
                        <ArrowUp />
                      </el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <a href="#boardTitle">
      <el-tooltip
        effect="light"
        content="回到顶部"
        placement="left"
        :show-after="500"
      >
        <div class="backTop" v-show="showBackTop">
          <img
            src="../../../assets/image/backTop.png"
            alt="Top"
            class="topIcon"
          />
        </div>
      </el-tooltip>
    </a>
    <ReplyDrawer
      :openDrawer="openDrawer"
      :usernameDrawer="usernameDrawer"
      :bannedWords="bannedWords"
      :messageIdDrawer="messageIdDrawer"
      :targetIdDrawer="targetIdDrawer"
      :replyTypeDrawer="replyTypeDrawer"
      :fatherIdDrawer="fatherIdDrawer"
      @refresh="queryMessageGetList"
    ></ReplyDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, provide } from "vue";
import { ElNotification } from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo";
import {
  messageAddOne,
  messageGetList,
  messageGetBannedWords,
  messageGetReply,
} from "@/api/message";
import ReplyDrawer from "./components/replyDrawer.vue";
import FastScanner from "fastscan";
import { urlConfig } from "@/config/index";

const store = useUserInfoStore();
const user_id = computed(() => store.user_id);
const user_name = computed(() => store.username);

const textarea = ref("");

const showBackTop = ref(false); // 是否显示回到顶部图标

const messageNum = ref(0); // 留言总条数

interface IReplyAll {
  // 传的 target_id
  avatar: string;
  content: string;
  create_time: string;
  father_id: number;
  id: number;
  message_id: number;
  reply_id: number;
  reply_type: string;
  target_id: number;
  target_username: string | null;
  user_id: number;
  username: string;
}

interface IMessages {
  id: number;
  username: string;
  user_id: number;
  avatar: string;
  content: string;
  create_time: string;
  target_id: number;
  reply_num: number; // 回复数
  reply_show: boolean; // 是否展开。false-收起，true-展开
  reply_all: IReplyAll[];
}

interface IMessage {
  messages: IMessages[];
}

const message = reactive<IMessage>({
  messages: [
    {
      id: 1,
      username: "",
      user_id: 59,
      avatar: "", // 头像
      content: "", // 内容
      create_time: "", // 留言时间
      target_id: 0,
      // like:"", // 点赞数
      reply_num: 0, // 回复数
      reply_show: false, // 是否展开。false-收起，true-展开
      reply_all: [
        {
          avatar: "",
          content: "",
          create_time: "",
          father_id: 0,
          id: 0,
          message_id: 0,
          reply_id: 0,
          reply_type: "",
          target_id: 0,
          target_username: "",
          user_id: 0,
          username: "",
        },
      ], // 回复的数据
    },
  ],
});

const queryMessageAddOne = () => {
  messageAddOne({
    user_id: user_id.value,
    content: textarea.value,
  }).then((res) => {
    if (res.data.code == 200) {
      ElNotification({
        title: "恭喜",
        message: res.data.message,
        type: "success",
        position: "top-right",
      });
      textarea.value = "";
      queryMessageGetList();
    } else {
      ElNotification({
        title: "提示",
        message: res.data.message,
        type: "warning",
        position: "top-right",
      });
    }
  });
};

const doPublish = () => {
  if (textarea.value.trim() != "") {
    /**
     * 违禁词过滤的使用教程：https://github.com/pyloque/fastscan
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

// 分页
interface IPages {
  currentPage: number;
  pageSize: number;
  currentPageReply: number;
  pageSizeReply: number;
}
// 留言分页
const pages = reactive<IPages>({
  currentPage: 1, // 当前页_留言
  pageSize: 10, // 页容量_留言
  currentPageReply: 1, // 当前页_留言的回复
  pageSizeReply: 10, // 页容量_留言的回复
});

const queryMessageGetList = () => {
  messageGetList({
    currentPage: pages.currentPage,
    pageSize: pages.pageSize,
  }).then((res) => {
    if (res.data.code == 200) {
      message.messages = res.data.data;
      messageNum.value = res.data.total;
    }
  });
};

// 展开
const unfold = (id: number, index: number, msg?: string) => {
  if (msg === "more") {
    pages.currentPageReply += 1;
  }
  // 接口-获取回复
  messageGetReply({
    currentPage: pages.currentPageReply,
    pageSize: pages.pageSizeReply,
    message_id: id,
  }).then((res) => {
    console.log("回复列表-res", res);
    message.messages[index].reply_num = res.data.total;
    if (msg === "more") {
      // 分页请求，插入到数组中展示
      message.messages[index].reply_all = [
        ...message.messages[index].reply_all,
        ...res.data.data,
      ];
    } else {
      // 首次请求，直接展示
      message.messages[index].reply_all = res.data.data;
    }
    message.messages[index].reply_show = true;
  });
};

// 收起
const fold = (index: number) => {
  pages.currentPageReply = 1;
  message.messages[index].reply_show = false;
};

const openDrawer = ref<boolean>(false);
provide("openDrawer", openDrawer); // 传给子组件

const usernameDrawer = ref<string>("");
provide("usernameDrawer", usernameDrawer);

const messageIdDrawer = ref<number>(0);
provide("messageIdDrawer", messageIdDrawer);

const targetIdDrawer = ref<number>(0);
provide("targetIdDrawer", targetIdDrawer);

const replyTypeDrawer = ref<string>("1");
provide("replyTypeDrawer", replyTypeDrawer);

const fatherIdDrawer = ref<number | undefined>(0);
provide("fatherIdDrawer", fatherIdDrawer);

const doReply = (
  username: string,
  message_id: number,
  reply_id: number,
  reply_type: string,
  father_id: number
) => {
  openDrawer.value = true;
  usernameDrawer.value = username;
  messageIdDrawer.value = message_id;
  targetIdDrawer.value = reply_type === "1" ? message_id : reply_id;
  replyTypeDrawer.value = reply_type;
  fatherIdDrawer.value = father_id;
};

const bannedWords = ref<string[]>([]); // 违禁词

provide("bannedWords", bannedWords);

// 违禁词查询
const queryMessageGetBannedWords = () => {
  messageGetBannedWords().then((res) => {
    if (res.data.code == 200) {
      bannedWords.value = res.data.data;
    }
  });
};

// 无线滚动触底事件
const load = () => {
  showBackTop.value = true;

  if (pages.currentPage * pages.pageSize < messageNum.value) {
    pages.currentPage += 1;
    queryMessageGetList();
  }
};

onMounted(() => {
  queryMessageGetList();
  queryMessageGetBannedWords();
});
</script>

<style lang="scss" scoped>
.message-container {
  display: flex;
  justify-content: center;
  height: calc(100vh - 100px);

  .box-card {
    width: 1000px;
    height: 100%;

    &::-webkit-scrollbar {
      width: 5px;
      height: 100%;
    }

    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 60px;
      background-color: #ccc;
      border-radius: 3px;
    }

    .title {
      text-align: center;
      margin-bottom: 20px;
    }

    .publish {
      width: 100%;
      display: flex;
      margin: 20px auto 30px;
    }

    .item {
      padding: 16px 0;
      font-size: 14px;

      // 悬停
      .item-container {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .cards {
          position: relative;
          width: 100%;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;

          &:before {
            content: "";
            position: absolute;
            left: 0;
            bottom: calc(-100% + 4px);
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 1;
            transition: 0.5s ease-in-out;
          }

          &:hover:before {
            bottom: 0;
          }

          &:hover .info {
            color: #fff;
          }

          &:hover .reply {
            color: #fff;
          }

          &:hover .infoDeep {
            color: #fff;
          }

          &:hover .divider {
            border-top: 1px solid #fff;
          }

          &:nth-child(1):before {
            background-image: linear-gradient(#a3cdf7, #65b0fa);
          }

          .info {
            color: #999;
            font-size: 16px;
            line-height: 2;
          }

          .infoDeep {
            color: #666;
          }

          .divider {
            display: inline-block;
            width: 40px;
            height: 1px;
            border-top: 1px solid #999;
            margin-right: 10px;
          }

          .arrows {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .marginR {
            margin-right: 50px;
            display: inline-block;
          }

          .unfold {
            margin-top: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;

            .spread {
              font-size: 16px;
            }
          }

          .reply {
            color: #666;
            cursor: pointer;
            display: inline-block;
            margin: 0 0 20px 20px;
          }

          .card {
            position: relative;
            z-index: 2;
            display: flex;

            .avatar {
              width: 50px;
              height: 50px;
              object-fit: cover;
              margin-right: 10px;
            }

            .container {
              min-width: 80px;
              max-width: 800px;
              display: flex;
              flex-direction: column;

              .content {
                color: #333;
                font-size: 20px;
                line-height: 1.4;
              }

              .username {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }

          .word {
            margin-bottom: 10px;
            font-size: 30px;
            transition: 0.5s;
            color: #777;
          }
        }

        .replyContainer {
          padding-top: 10px;

          .replyUsername {
            margin-bottom: 10px;
          }

          .replyContent {
            font-size: 18px;
            color: #333;
            line-height: 1.4;
          }
        }
      }
    }
  }

  .backTop {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 2px 2px 8px rgba(148, 145, 145, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: 50px;
    bottom: 30px;
    z-index: 10;

    &:hover {
      background: #f2f6fc;
    }

    .topIcon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
