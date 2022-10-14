<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mine-container">
    <!-- 背景图 -->
    <div class="bgImg">
      <div class="layer1" @click="editBgImg">
        <Edit class="edit" />
      </div>
      <el-image :src="user.backgroundImage" fit="fill" class="layer2">
        <template #error>
          <img
            src="../../../assets/image/defaultBgImg.jpg"
            alt="bgImg"
            style="width: 100%; height: 100%"
          />
        </template>
      </el-image>
    </div>
    <div class="header">
      <!-- 头像徽标 -->
      <div class="circle bgImg">
        <div
          class="layer1"
          style="width: 100px; height: 100px; border-radius: 50%"
          @click="editAvatar"
        >
          <Edit class="edit" />
        </div>
        <el-image class="logo" :src="user.avatar" fit="cover">
          <template #error>
            <img
              style="width: 150px; height: 150px; border-radius: 50%"
              src="../../../assets/image/whiteDog.jpg"
              alt="avatar"
            />
          </template>
        </el-image>
        <div class="text">
          <p class="word">
            <span
              v-for="(item, index) in wordNew"
              :key="index"
              :style="{ transform: 'rotate(' + index * 7.4 + 'deg)' }"
            >
              {{ item }}
            </span>
          </p>
        </div>
      </div>
      <el-form
        ref="userRef"
        :model="user"
        :rules="rules"
        label-width="0px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item label="" prop="username">
          <div class="nameItem">
            <el-input
              v-model="user.username"
              placeholder="请输入用户名称"
              v-show="formShow.usernameCancel"
            />
            <div class="btn nameBtn" v-show="formShow.usernameCancel">
              <el-button type="primary" @click="saveValue('username', userRef)"
                >保存</el-button
              >
              <el-button @click="inputValue('username', 'close')"
                >取消</el-button
              >
            </div>
          </div>
          <div v-show="!formShow.usernameCancel" class="editValue">
            <div class="username">{{ user.username }}</div>
            <div
              class="flexRow editName"
              :class="{
                hoverHide: user.username !== '',
                hoverShow: user.username === '',
              }"
              @click="inputValue('username', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="110px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item label="电话" class="item" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入电话"
            v-show="formShow.phoneCancel"
          />
          <div class="btn" v-show="formShow.phoneCancel">
            <el-button type="primary" @click="saveValue('phone', ruleFormRef)"
              >保存</el-button
            >
            <el-button @click="inputValue('phone', 'close')">取消</el-button>
          </div>
          <div v-show="!formShow.phoneCancel" class="editValue">
            <span class="m-r-20" v-show="form.phone">{{ form.phone }}</span>
            <div
              class="flexRow"
              :class="{
                hoverHide: form.phone !== '',
                hoverShow: form.phone === '',
              }"
              @click="inputValue('phone', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="邮箱" class="item" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            v-show="formShow.emailCancel"
          />
          <div class="btn" v-show="formShow.emailCancel">
            <el-button type="primary" @click="saveValue('email', ruleFormRef)"
              >保存</el-button
            >
            <el-button @click="inputValue('email', 'close')">取消</el-button>
          </div>
          <div v-show="!formShow.emailCancel" class="editValue">
            <span class="m-r-20" v-show="form.email">{{ form.email }}</span>
            <div
              class="flexRow"
              :class="{
                hoverHide: form.email !== '',
                hoverShow: form.email === '',
              }"
              @click="inputValue('email', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="性别" class="item" prop="gender">
          <el-radio-group
            v-model="form.gender"
            v-show="formShow.genderCancel"
            class="m-r-20"
          >
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
          <div v-show="formShow.genderCancel">
            <el-button type="primary" @click="saveValue('gender', ruleFormRef)"
              >保存</el-button
            >
            <el-button @click="inputValue('gender', 'close')">取消</el-button>
          </div>
          <div v-show="!formShow.genderCancel" class="editValue">
            <span class="m-r-20" v-show="form.gender">{{ form.gender }}</span>
            <div
              class="flexRow gender"
              :class="{
                hoverHide: form.gender !== '',
                hoverShow: form.gender === '',
              }"
              @click="inputValue('gender', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="所在行业" class="item" prop="industry">
          <el-select
            v-model="form.industry"
            placeholder="请选择所在行业"
            v-show="formShow.industryCancel"
          >
            <el-option
              v-for="(item, index) in industry"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <div class="btn industryBtn" v-show="formShow.industryCancel">
            <el-button
              type="primary"
              @click="saveValue('industry', ruleFormRef)"
              >保存</el-button
            >
            <el-button @click="inputValue('industry', 'close')">取消</el-button>
          </div>
          <div v-show="!formShow.industryCancel" class="editValue">
            <span class="m-r-20" v-show="form.industry">{{
              form.industry
            }}</span>
            <div
              class="flexRow"
              :class="{
                hoverHide: form.industry !== '',
                hoverShow: form.industry === '',
              }"
              @click="inputValue('industry', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="个性签名" class="item" prop="signature">
          <el-input
            v-model="form.signature"
            type="textarea"
            placeholder="请填写个性签名"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 8 }"
            v-show="formShow.signatureCancel"
          />
          <div class="btn" v-show="formShow.signatureCancel">
            <el-button
              type="primary"
              @click="saveValue('signature', ruleFormRef)"
              >保存</el-button
            >
            <el-button @click="inputValue('signature', 'close')"
              >取消</el-button
            >
          </div>
          <div v-show="!formShow.signatureCancel" class="editValue">
            <span class="m-r-20" v-show="form.signature">{{
              form.signature
            }}</span>
            <div
              class="flexRow"
              :class="{
                hoverHide: form.signature !== '',
                hoverShow: form.signature === '',
              }"
              @click="inputValue('signature', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="密保问题" class="item">
          <div v-show="formShow.encryptedCancel">
            <el-select
              v-model="form.encryptedOne"
              placeholder="请选择密保问题 1"
              class="m-b-10"
            >
              <el-option
                v-for="(item, index) in encrypted.filter(
                  (i) => i != form.encryptedTwo
                )"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-input
              v-model="form.encryptedOneAnswer"
              placeholder="请输入密保问题 1 的答案"
              class="encryptedOne"
              auto-complete="off"
            />
            <el-select
              v-model="form.encryptedTwo"
              placeholder="请选择密保问题 2"
              class="m-b-10"
            >
              <el-option
                v-for="(item, index) in encrypted.filter(
                  (i) => i != form.encryptedOne
                )"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-input
              v-model="form.encryptedTwoAnswer"
              placeholder="请输入密保问题 2 的答案"
              auto-complete="off"
            />
            <div class="btn">
              <el-button type="primary" @click="saveValue('encrypted')"
                >保存</el-button
              >
              <el-button @click="inputValue('encrypted', 'close')"
                >取消</el-button
              >
            </div>
          </div>
          <div v-show="!formShow.encryptedCancel" class="editValue">
            <span class="m-r-20" v-show="form.encryptedOne != ''">已完善</span>
            <div
              class="flexRow"
              :class="{
                hoverHide: form.encryptedOneAnswer !== '',
                hoverShow: form.encryptedOneAnswer === '',
              }"
              @click="inputValue('encrypted', 'open')"
            >
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>编辑</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="登录密码" class="item">
          <el-input
            v-model="form.password"
            placeholder="请输入新的登录密码"
            v-show="formShow.passwordCancel"
            class="m-b-10"
            type="password"
            show-password
          />
          <el-input
            v-model="form.passwordAgain"
            placeholder="请确认新的登录密码"
            v-show="formShow.passwordCancel"
            type="password"
            show-password
          />
          <div class="btn" v-show="formShow.passwordCancel">
            <el-button type="primary" @click="saveValue('password')"
              >保存</el-button
            >
            <el-button @click="inputValue('password', 'close')">取消</el-button>
          </div>
          <div v-show="!formShow.passwordCancel" class="editValue">
            <div class="flexRow" @click="inputValue('password', 'open')">
              <Edit style="width: 16px; height: 16px; margin-right: 8px" />
              <span>修改</span>
            </div>
          </div>
        </el-form-item>
        <el-divider />
      </el-form>
    </div>
  </div>
  <div>
    <!-- 头像裁剪 -->
    <my-upload
      v-model="showUploadAvatar"
      field="file"
      :headers="uploadHeaders"
      :params="uploadParams"
      :url="urlUpdateAvatar"
      :noSquare="true"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    ></my-upload>
    <!-- 背景图片裁剪 -->
    <my-upload
      v-model="showUploadBgImg"
      field="file"
      :headers="uploadHeaders"
      :params="uploadParams"
      :url="urlUpdateBgImg"
      :noCircle="true"
      :noSquare="true"
      @crop-success="cropSuccessBgImg"
      :width="1200"
      :height="180"
    ></my-upload>
    <!-- 密码校验对话框 -->
    <el-dialog
      v-model="visibleDialogFormPassword"
      title="身份确认"
      draggable
      @close="dialogCancel('password', passwordRef)"
    >
      <el-form
        :model="visibleDialogForm"
        ref="passwordRef"
        :rules="passwordDialogRules"
      >
        <el-form-item label="" label-width="0px" prop="password">
          <el-input
            v-model="visibleDialogForm.password"
            autocomplete="off"
            placeholder="请输入登录密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCancel('password', passwordRef)"
            >取消</el-button
          >
          <el-button type="primary" @click="passwordDialogConfirm(passwordRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 密保问题校验对话框 -->
    <el-dialog
      v-model="visibleDialogFormEncrypted"
      title="身份确认"
      draggable
      @close="dialogCancel('encrypted', encryptedRef)"
    >
      <el-form
        :model="visibleDialogForm"
        ref="encryptedRef"
        :rules="encryptedDialogRules"
      >
        <el-form-item label="" label-width="0px" prop="encryptedOneAnswer">
          <span>{{ visibleDialogForm.encryptedOne }}</span>
          <el-input
            v-model="visibleDialogForm.encryptedOneAnswer"
            autocomplete="off"
            placeholder="请输入密保问题 1 的答案"
          />
        </el-form-item>
        <el-form-item label="" label-width="0px" prop="encryptedTwoAnswer">
          <span>{{ visibleDialogForm.encryptedTwo }}</span>
          <el-input
            v-model="visibleDialogForm.encryptedTwoAnswer"
            autocomplete="off"
            placeholder="请输入密保问题 2 的答案"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCancel('encrypted', encryptedRef)"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="encryptedDialogConfirm(encryptedRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, nextTick } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { userGetUserInfo } from "@/api/user";
import { useUserInfoStore } from "@/stores/userInfo";
import { ElNotification, ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import {
  validateEmailNotEmpty,
  validatePhoneNotEmpty,
} from "@/utils/validator";
import {
  userEditOne,
  userValidatePsw,
  userValidateEncrypted,
} from "@/api/user";
import router from "@/router/index";

import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
import { urlConfig } from "@/config/index";

const ruleFormRef = ref<FormInstance>();
const userRef = ref<FormInstance>();

const userInfoStore = useUserInfoStore();
const user_id = computed(() => userInfoStore.getUserId);

const user = reactive({
  avatar: "", // 头像
  username: "请填写", // 用户名称
  backgroundImage: "", // 背景图
});

const form = reactive({
  phone: "", // 电话
  email: "", // 邮箱
  gender: "", // 性别
  signature: "", // 签名
  industry: "", // 所在行业
  encryptedOne: "", // 密保问题 1
  encryptedOneAnswer: "", // 密保问题 1 的答案
  encryptedTwo: "", // 密保问题 2
  encryptedTwoAnswer: "", // 密保问题 2 的答案
  password: "", // 登录密码
  passwordAgain: "", // 确认密码
});

const formShow = reactive({
  usernameCancel: false, // 用户名称
  phoneCancel: false, // 电话
  emailCancel: false, // 邮箱
  genderCancel: false, // 性别
  signatureCancel: false, // 签名
  industryCancel: false, // 所在行业
  encryptedCancel: false, // 密保问题
  passwordCancel: false, // 登录密码
});

const industry: string[] = [
  "高新科技",
  "互联网",
  "电子商务",
  "电子游戏",
  "计算机软件",
  "计算机硬件",
  "信息传媒",
  "出版业",
  "电影录音",
  "广播电视",
  "通信",
  "金融",
  "银行",
  "资本投资",
  "证券投资",
  "保险",
  "信贷",
  "财务",
  "审计",
  "服务业",
  "法律",
  "餐饮",
  "酒店",
  "旅游",
  "广告",
  "公关",
  "景观",
  "咨询分析",
  "市场推广",
  "人力资源",
  "社工服务",
  "养老服务",
  "教育",
  "高等教育",
  "基础教育",
  "职业教育",
  "幼儿教育",
  "特殊教育",
  "培训",
  "医疗服务",
  "临床医疗",
  "制药",
  "保健",
  "美容",
  "医疗器材",
  "生物工程",
  "疗养服务",
  "护理服务",
  "艺术娱乐",
  "创意艺术",
  "体育健身",
  "娱乐休闲",
  "图书馆",
  "博物馆",
  "策展",
  "制造加工",
  "食品饮料业",
  "防止皮革业",
  "服装业",
  "烟草业",
  "造纸业",
  "印刷业",
  "化工业",
  "汽车",
  "家具",
  "电子电器",
  "机械设备",
  "塑料工业",
  "金属加工",
  "军火",
  "地产建筑",
  "房地产",
  "装饰装潢",
  "物业服务",
  "特殊设备",
  "贸易零售",
  "零售",
  "大宗交易",
  "进出口贸易",
  "公共服务",
  "国防军事",
  "航天",
  "科研",
  "给排水",
  "水利能源",
  "电力电网",
  "公共管理",
  "环境保护",
  "非营利组织",
  "开采冶金",
  "煤炭工业",
  "石油工业",
  "黑色金属",
  "有色金属",
  "土砂石开采",
  "地热开采",
  "交通仓储",
  "邮政",
  "物流递送",
  "地面运输",
  "铁路运输",
  "管线运输",
  "航运业",
  "民用航空业",
  "农林牧渔",
  "种植业",
  "畜牧养殖业",
  "林业",
  "渔业",
];

const encrypted: string[] = [
  "你的梦想是？",
  "你的出生地是？",
  "你父亲的名字是？",
  "你父亲的生日是？",
  "你母亲的名字是？",
  "你母亲的生日是？",
  "你配偶的名字是？",
  "你配偶的生日是？",
  "你偶像的名字是？",
  "你小学的校名是？",
  "你最大的爱好是？",
  "你最熟悉的童年好友的名字是？",
  "对你影响最大的人的名字是？",
];

// 校验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "Username cannot be empty", trigger: "blur" },
  ],
  phone: [
    {
      trigger: "blur",
      validator: validatePhoneNotEmpty,
    },
  ],
  email: [
    {
      trigger: "blur",
      validator: validateEmailNotEmpty,
    },
  ],
  gender: [
    { required: true, message: "Please select a gender", trigger: "change" },
  ],
  signature: [
    { required: true, message: "Signature cannot be empty", trigger: "blur" },
  ],
  industry: [
    { required: true, message: "Please select your industry", trigger: "blur" },
  ],
});

// 重置该表单项，并移除校验结果
const clearValidate = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.clearValidate();
};

// 修改请求
const editSelf = (obj: any, info?: string) => {
  const user_id = window.localStorage.getItem("user_id");
  let localId = 0;
  if (user_id) {
    localId = JSON.parse(user_id).user_id;
  } else {
    return false;
  }
  userEditOne({ id: localId, ...obj }).then((res) => {
    if (res.data.code == 200) {
      ElNotification({
        title: "恭喜",
        message: res.data.message,
        type: "success",
        position: "top-right",
      });
      queryUserGetUserInfo(info);
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

// 保存
const saveValue = async (item: string, formEl?: FormInstance | undefined) => {
  // 对单一字段进行校验
  if (item === "username") {
    if (!formEl) return;
    const usernamePass = await formEl.validateField("username", () => null);
    if (usernamePass) {
      editSelf({ username: user.username }, "username");
      inputValue("username", "close");
    }
  } else if (item === "phone") {
    if (!formEl) return;
    const phonePass = await formEl.validateField("phone", () => null);
    if (phonePass) {
      editSelf({ phone: form.phone }); // 请求
      inputValue("phone", "close");
    }
  } else if (item === "email") {
    if (!formEl) return;
    const emailPass = await formEl.validateField("email", () => null);
    if (emailPass) {
      editSelf({ email: form.email });
      inputValue("email", "close");
    }
  } else if (item === "gender") {
    if (!formEl) return;
    const genderPass = await formEl.validateField("gender", () => null);
    if (genderPass) {
      editSelf({ gender: form.gender });
      inputValue("gender", "close");
    }
  } else if (item === "signature") {
    if (!formEl) return;
    const signaturePass = await formEl.validateField("signature", () => null);
    if (signaturePass) {
      editSelf({ signature: form.signature });
      inputValue("signature", "close");
    }
  } else if (item === "industry") {
    if (!formEl) return;
    const industryPass = await formEl.validateField("industry", () => null);
    if (industryPass) {
      editSelf({ industry: form.industry });
      inputValue("industry", "close");
    }
  } else if (item === "encrypted") {
    if (form.encryptedOne === "") {
      ElNotification({
        title: "警告",
        message: "请选择密保问题 1",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else if (form.encryptedOneAnswer === "") {
      ElNotification({
        title: "警告",
        message: "请输入密保问题 1 的答案",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else if (form.encryptedTwo === "") {
      ElNotification({
        title: "警告",
        message: "请选择密保问题 2",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else if (form.encryptedTwoAnswer === "") {
      ElNotification({
        title: "警告",
        message: "请输入密保问题 2 的答案",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else {
      editSelf({
        encryptedOne: form.encryptedOne,
        encryptedOneAnswer: form.encryptedOneAnswer,
        encryptedTwo: form.encryptedTwo,
        encryptedTwoAnswer: form.encryptedTwoAnswer,
      });
      inputValue("encrypted", "close");
    }
  } else if (item === "password") {
    if (form.password === "") {
      ElNotification({
        title: "警告",
        message: "请输入新的登录密码",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else if (form.passwordAgain === "") {
      ElNotification({
        title: "警告",
        message: "请确认新的登录密码",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else if (form.password !== form.passwordAgain) {
      ElNotification({
        title: "警告",
        message: "两次密码不一致",
        type: "error",
        position: "top-right",
        showClose: false,
      });
    } else {
      editSelf({ password: form.password });
      inputValue("password", "close");
      nextTick(() => {
        router.push({ path: "/login" });
        window.localStorage.clear();
      });
    }
  }
};

// 取消
const inputValue = (item: string, bool: string) => {
  if (item === "username") {
    formShow.usernameCancel = bool === "open" ? true : false;
    user.username = "";
    clearValidate(userRef.value);
  } else {
    if (item === "phone") {
      formShow.phoneCancel = bool === "open" ? true : false;
      form.phone = "";
    } else if (item === "email") {
      formShow.emailCancel = bool === "open" ? true : false;
      form.email = "";
    } else if (item === "gender") {
      formShow.genderCancel = bool === "open" ? true : false;
      form.gender = "";
    } else if (item === "signature") {
      formShow.signatureCancel = bool === "open" ? true : false;
      form.signature = "";
    } else if (item === "industry") {
      formShow.industryCancel = bool === "open" ? true : false;
      form.industry = "";
    } else if (item === "encrypted") {
      if (bool === "open") {
        visibleDialogFormPassword.value = true;
      } else {
        formShow.encryptedCancel = bool === "open" ? true : false;
        form.encryptedOne = "";
        form.encryptedOneAnswer = "";
        form.encryptedTwo = "";
        form.encryptedTwoAnswer = "";
      }
    } else if (item === "password") {
      if (bool === "open") {
        if (form.encryptedOne != "" && form.encryptedTwo != "") {
          visibleDialogFormEncrypted.value = true;
        } else {
          ElMessage.warning("请先设置密保问题");
        }
      } else {
        formShow.passwordCancel = bool === "open" ? true : false;
        form.password = "";
        form.passwordAgain = "";
      }
    }
    clearValidate(ruleFormRef.value);
  }
  queryUserGetUserInfo();
};

const word = ref("Define Yourself As A Good And Individual Person.");

const wordNew = computed(() => {
  return word.value
    .split("")
    .map((char) => char)
    .join("");
});

const queryUserGetUserInfo = (info?: string) => {
  userGetUserInfo({ user_id: user_id.value })
    .then((res) => {
      if (res.data.code == 200) {
        const {
          username,
          phone,
          email,
          gender,
          signature,
          industry,
          avatar,
          background_image,
          encrypted_one,
          encrypted_two,
        } = res.data.data;

        if (phone != "" && phone != null) {
          form.phone = phone;
        }
        if (email != "" && email != null) {
          form.email = email;
        }
        if (gender != "" && gender != null) {
          form.gender = gender;
        }
        if (signature != "" && signature != null) {
          form.signature = signature;
        }
        if (industry != "" && industry != null) {
          form.industry = industry;
        }
        if (encrypted_one != "" && encrypted_one != null) {
          form.encryptedOne = encrypted_one;
          visibleDialogForm.encryptedOne = encrypted_one;
        }
        if (encrypted_two != "" && encrypted_two != null) {
          form.encryptedTwo = encrypted_two;
          visibleDialogForm.encryptedTwo = encrypted_two;
        }
        if (avatar != "" && avatar != null) {
          user.avatar = urlConfig.baseUrlUpload + avatar;

          userInfoStore.setAvatar(user.avatar); // Pinia 存储
          localStorage.setItem(
            "username",
            JSON.stringify({ avatar: user.avatar })
          ); // 本地存储：Pinia 持久化有时会失效
        }
        if (username != "" && username != null) {
          user.username = username;
        }
        if (background_image != "" && background_image != null) {
          user.backgroundImage = urlConfig.baseUrlUpload + background_image;
        }
        if (info === "username") {
          userInfoStore.setUsername(user.username); // Pinia 存储
          localStorage.setItem(
            "username",
            JSON.stringify({ username: user.username })
          ); // 本地存储：Pinia 持久化有时会失效
        }
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

/* 头像裁剪 */
const showUploadAvatar = ref(false); // 是否展示裁剪框
const urlUpdateAvatar = urlConfig.baseUrl + urlConfig.uploadUrlAvatar; // 上传接口地址，如果为空，图片不会上传

const editAvatar = () => {
  showUploadAvatar.value = !showUploadAvatar.value;
};
// 图片截取完成事件（上传前), 参数( imageDataUrl, field )
const cropSuccess = (imgDataUrl: any, field: any) => {
  user.avatar = imgDataUrl;
};
//上传成功回调，参数( jsonData, field )
const cropUploadSuccess = (jsonData: any, field: any) => {
  // console.log(jsonData);
  // console.log("-------- upload success --------field: " + field);
};
//上传失败回调，参数( status, field )
const cropUploadFail = (status: any, field: any) => {
  // console.log("上传失败状态" + status);
  // console.log("-------- upload fail --------field: " + field);
};

const uploadHeaders = { Authorization: localStorage.getItem("Authorization") };
const uploadParams = { user_id: user_id.value };

/* 背景图片裁剪 */
const showUploadBgImg = ref(false); // 是否展示裁剪框
const urlUpdateBgImg = urlConfig.baseUrl + urlConfig.uploadUrlBgImg; // 上传接口地址，如果为空，图片不会上传
const editBgImg = () => {
  showUploadBgImg.value = !showUploadBgImg.value;
};
// 图片截取完成事件（上传前), 参数( imageDataUrl, field )
const cropSuccessBgImg = (imgDataUrl: any, field: any) => {
  user.backgroundImage = imgDataUrl;
};

const visibleDialogFormEncrypted = ref(false); // 密保问题校验对话框
const visibleDialogFormPassword = ref(false); // 密码校验对话框
const passwordRef = ref<FormInstance>();
const encryptedRef = ref<FormInstance>();
const visibleDialogForm = reactive({
  password: "", // 密码
  encryptedOne: "", // 密保问题 1
  encryptedOneAnswer: "", // 密保问题 1 的答案
  encryptedTwo: "", // 密保问题 2
  encryptedTwoAnswer: "", // 密保问题 2 的答案
});

const passwordDialogRules = reactive<FormRules>({
  password: [
    { required: true, message: "Password cannot be empty", trigger: "blur" },
    { min: 4, max: 16, message: "Length should be 4 to 16", trigger: "blur" },
  ],
});
const encryptedDialogRules = reactive<FormRules>({
  encryptedOneAnswer: [
    {
      required: true,
      message: "The answer to confidential question 1 cannot be empty",
      trigger: "blur",
    },
  ],
  encryptedTwoAnswer: [
    {
      required: true,
      message: "The answer to confidential question 2 cannot be empty",
      trigger: "blur",
    },
  ],
});

// 密码校验-对话框确认
const passwordDialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 对单一字段进行校验
  const passwordPass = await formEl.validateField("password", () => null);
  if (passwordPass) {
    const user_id = window.localStorage.getItem("user_id");
    let localId = 0;
    if (user_id) {
      localId = JSON.parse(user_id).user_id;
    } else {
      return false;
    }
    // 接口请求
    userValidatePsw({
      id: localId,
      password: visibleDialogForm.password,
    }).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success(res.data.message);
        visibleDialogForm.password = "";
        visibleDialogFormPassword.value = false; // 关闭对话框
        formShow.encryptedCancel = true; // 开启编辑表单
      } else {
        ElMessage.warning(res.data.message);
      }
    });
  }
};
// 密保问题校验-对话框确认
const encryptedDialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const encryptedPass = await formEl.validate(() => {
    null;
  });

  if (encryptedPass) {
    const user_id = window.localStorage.getItem("user_id");
    let localId = 0;
    if (user_id) {
      localId = JSON.parse(user_id).user_id;
    } else {
      return false;
    }
    // 接口请求
    userValidateEncrypted({
      id: localId,
      encryptedOneAnswer: visibleDialogForm.encryptedOneAnswer,
      encryptedTwoAnswer: visibleDialogForm.encryptedTwoAnswer,
    }).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success(res.data.message);
        visibleDialogForm.encryptedOneAnswer = "";
        visibleDialogForm.encryptedTwoAnswer = "";
        visibleDialogFormEncrypted.value = false; // 关闭对话框
        formShow.passwordCancel = true; // 开启编辑表单
      } else {
        ElMessage.warning(res.data.message);
      }
    });
  }
};

// 对话框取消
const dialogCancel = (item: string, formEl: FormInstance | undefined) => {
  if (item === "password") {
    visibleDialogForm.password = "";
    visibleDialogFormPassword.value = false; // 关闭对话框
  } else if (item === "encrypted") {
    visibleDialogForm.encryptedOne = "";
    visibleDialogForm.encryptedOneAnswer = "";
    visibleDialogForm.encryptedTwo = "";
    visibleDialogForm.encryptedTwoAnswer = "";
    visibleDialogFormEncrypted.value = false; // 关闭对话框
  }
  if (!formEl) return;
  formEl.resetFields();
};

queryUserGetUserInfo();
</script>

<style lang="scss">
.mine-container {
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .bgImg {
    position: relative;

    .layer2 {
      height: 240px;
      width: 100%;
      transition: 1s;
    }

    .layer1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 25%;
      height: 120px;
      z-index: 10;
      transition: 1s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
      }

      &:hover ~ .layer2 {
        filter: blur(5px);
      }

      &:hover .edit {
        opacity: 1;
      }

      .edit {
        color: #333;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: 1s;
      }
    }
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;

    .el-icon {
      font-size: 30px;
    }
  }

  .header {
    display: flex;
    margin: -100px 0 0 20px;
    z-index: 10;
    align-items: center;

    &:hover .hoverHide {
      opacity: 1;
    }
  }

  // 头像徽标
  .circle {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    /* background: #ccc; */
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    .text {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: rotateText 10s linear infinite;

      span {
        position: absolute;
        left: 50%;
        font-size: 1.2em;
        transform-origin: 0 100px;
      }
    }

    @keyframes rotateText {
      0% {
        transform: rotate(360deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }

  .username {
    margin-top: 50px;
    font-size: 24px;
    font-weight: 600;
  }

  .editName {
    margin: 50px 0 0 20px;
  }

  .flexRow {
    display: flex;
    align-items: center;
    color: #409eff;
    cursor: pointer;
  }

  .hoverHide {
    opacity: 0;
    transition: 1s;
  }

  .hoverShow {
    opacity: 1;
  }

  .editValue {
    display: flex;
    align-items: center;
  }

  .nameItem {
    margin: 100px 0 0 20px;
  }

  .nameBtn {
    margin-top: 10px;
  }

  .body {
    background: #fff;
    padding: 120px 20px 20px 240px;
    margin-top: -100px;

    .info {
      display: flex;
      align-items: center;
    }

    .item {
      display: flex;

      .el-form-item__label {
        font-weight: 600;
      }

      .btn {
        display: flex;
        margin-top: 10px;
      }

      .m-r-20 {
        margin-right: 20px;
      }

      .m-l-20 {
        margin-left: 20px;
      }

      .industryBtn {
        margin: 0 0 0 10px;
      }

      .gender {
        display: flex;
        align-items: center;
      }

      .m-b-10 {
        margin-bottom: 10px;
      }

      .encryptedOne {
        margin-bottom: 20px;
      }

      &:hover .hoverHide {
        opacity: 1;
      }
    }
  }
}
</style>
