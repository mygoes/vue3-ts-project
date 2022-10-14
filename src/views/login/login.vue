<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-container">
    <!-- 登录 | 注册 -->
    <section class="section">
      <div class="container">
        <!-- 1. 登录界面 -->
        <div class="user signInBx">
          <div class="imgBx">
            <img src="../../assets/image/whiteDog.jpg" alt="图片" class="img" />
          </div>
          <div class="formBx">
            <form>
              <h2 class="title">Sign In</h2>
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item prop="username" label-width="0px">
                  <el-input
                    v-model="ruleForm.username"
                    placeholder="Username"
                    size="large"
                    class="input"
                  />
                </el-form-item>
                <el-form-item prop="password" label-width="0px">
                  <el-input
                    v-model="ruleForm.password"
                    show-password
                    placeholder="Password"
                    class="input"
                    size="large"
                  />
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="submitRuleForm(ruleFormRef)"
                >Login</el-button
              >
              <p class="signUp">
                Don't have an account ?
                <el-button
                  type="primary"
                  link
                  @click="toggleForm"
                  class="changeCard"
                >
                  Sign Up.
                </el-button>
              </p>
            </form>
          </div>
        </div>
        <!-- 2. 注册界面 -->
        <div class="user signUpBx">
          <div class="formBx">
            <el-form
              ref="signUpFormRef"
              :model="signUpForm"
              :rules="rules"
              label-width="120px"
              :size="formSize"
              status-icon
            >
              <el-form-item label-width="0px">
                <h2 class="title">Create an account</h2>
              </el-form-item>
              <el-form-item prop="username" label-width="0px">
                <el-input
                  v-model="signUpForm.username"
                  placeholder="Username"
                  class="input"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="phone" label-width="0px">
                <el-input
                  v-model="signUpForm.phone"
                  placeholder="Phone Number"
                  class="input"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="email" label-width="0px">
                <el-input
                  v-model="signUpForm.email"
                  placeholder="Email Address"
                  class="input"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="password" label-width="0px">
                <el-input
                  v-model="signUpForm.password"
                  placeholder="Create Password"
                  class="input"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="passwordConfirm" label-width="0px">
                <el-input
                  v-model="signUpForm.passwordConfirm"
                  placeholder="Confirm Password"
                  class="input"
                  size="large"
                />
              </el-form-item>
              <el-form-item label-width="0px">
                <el-button
                  type="primary"
                  @click="submitSignUpForm(signUpFormRef)"
                >
                  Register
                </el-button>
                <p class="signUp">
                  Already have an account ?
                  <el-button
                    type="primary"
                    link
                    @click="toggleForm"
                    class="changeCard"
                  >
                    Sign In.
                  </el-button>
                </p>
              </el-form-item>
            </el-form>
          </div>
          <div class="imgBx">
            <img src="../../assets/image/white.jpg" alt="图片" class="img" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { validateEmail, validatePhone } from "@/utils/validator";
import { loginSignUp, loginSignIn } from "@/api/login";
import { ElNotification } from "element-plus";
import { urlConfig } from "@/config/index";

const router = useRouter();
const userInfoStore = useUserInfoStore();

// 登录 | 注册 界面切换
const toggleForm = () => {
  const container = document.querySelector(".container");
  container?.classList.toggle("active");
};

const validatePasswordConfirm = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Confirm Password can not be empty"));
  } else if (value.length < 4 || value.length > 16) {
    callback(new Error("Length should be 4 to 16"));
  } else {
    if (value != signUpForm.password) {
      callback(new Error("The password entered twice is not the same!"));
    }
  }
};

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
});

const signUpFormRef = ref<FormInstance>();
const signUpForm = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

// 校验
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "Username can not be empty",
      trigger: "blur",
    },
    { min: 2, max: 16, message: "Length should be 2 to 16", trigger: "blur" },
  ],
  email: [
    {
      trigger: "blur",
      validator: validateEmail,
    },
  ],
  phone: [
    {
      trigger: "blur",
      validator: validatePhone,
    },
  ],
  password: [
    {
      required: true,
      message: "Password can not be empty",
      trigger: "blur",
    },
    { min: 4, max: 16, message: "Length should be 4 to 16", trigger: "blur" },
  ],
  passwordConfirm: [
    {
      required: true,
      trigger: "blur",
      validator: validatePasswordConfirm,
    },
  ],
});

const submitRuleForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      queryLoginSignIn();
    } else {
      return;
    }
  });
};

const submitSignUpForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  queryLoginSignUp();
};

// 用户注册
const queryLoginSignUp = () => {
  const { username, phone, email, password } = signUpForm;
  loginSignUp({ username, phone, email, password }).then((res) => {
    if (res.data.code == 200) {
      ElNotification({
        title: "恭喜",
        message: res.data.message,
        type: "success",
        position: "top-right",
      });
      toggleForm();
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

// 用户登录
const queryLoginSignIn = () => {
  const { username, password } = ruleForm;
  loginSignIn({ username, password }).then((res) => {
    if (res.data.code == 200) {
      ElNotification({
        title: "恭喜",
        message: res.data.message,
        type: "success",
        position: "top-right",
        duration: 2000,
      });

      userInfoStore.setUserId(res.data.data.id);
      userInfoStore.setUsername(username);
      userInfoStore.setAvatar(urlConfig.baseUrlUpload + res.data.data.avatar);
      localStorage.setItem(
        "avatar",
        JSON.stringify({
          avatar: urlConfig.baseUrlUpload + res.data.data.avatar,
        })
      ); // 本地存储：Pinia 持久化有时会失效

      // Pinia 持久化失效，存储的不是最新数据，LJ~
      localStorage.setItem("Authorization", res.data.data.token);
      localStorage.setItem(
        "user_id",
        JSON.stringify({ user_id: res.data.data.id })
      );
      localStorage.setItem("username", JSON.stringify({ username: username }));

      router.push({ path: "/index/chart" });
    } else {
      ElNotification({
        title: "警告",
        message: res.data.message,
        type: "error",
        position: "top-right",
        showClose: false,
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(30deg, #b08974, #ad8975);
}

// 登录 | 注册
.section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    position: relative;
    width: 800px;
    height: 500px;
    background: #fff;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .user {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;

      .imgBx {
        position: relative;
        width: 50%;
        height: 100%;
        background: #fff;
        transition: 0.5s;

        .img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .signUpBx {
      pointer-events: none;

      .formBx {
        left: 100%;
      }

      .imgBx {
        left: -100%;
      }
    }

    .signInBx {
      .formBx {
        left: 0;
      }

      .imgBx {
        left: 0;
      }
    }
  }
}

.formBx {
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: 0.5s;

  .title {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    color: #555;
  }

  .signUp {
    position: relative;
    margin-top: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #555;
    text-transform: uppercase;
    font-weight: 300;

    .changeCard {
      font-weight: 700;
      text-decoration: none;
      color: #677eff;
    }
  }
}

.container.active .signUpBx {
  pointer-events: initial;
}

.container.active .signUpBx .formBx {
  left: 0;
}

.container.active .signUpBx .imgBx {
  left: 0;
}

.container.active .signInBx .formBx {
  left: 100%;
}

.container.active .signInBx .imgBx {
  left: -100%;
}

@media (max-width: 991px) {
  .container {
    max-width: 400px;
  }

  .imgBx {
    display: none;
  }

  .formBx {
    width: 100%;
  }
}
</style>
