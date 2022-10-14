<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="means-container">
    <!-- 翻牌 -->
    <div class="section">
      <div
        class="card"
        v-for="(item, index) in img"
        :key="index"
        @click="use(index)"
      >
        <div class="box">
          <div class="imgBx">
            <img :src="images(item.url)" alt="图片" class="img" />
          </div>
          <div class="contentBx">
            <div class="word">
              <h2 class="title">{{ item.title }}</h2>
              <p class="content">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" title="短链生成" draggable>
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="需要转换的 url" label-width="140px" prop="url">
          <el-input
            v-model="form.url"
            autocomplete="off"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="convert"
            @click="submitForm(ruleFormRef)"
            size="large"
          >
            {{ form.btnValue }}
          </el-button>
        </el-form-item>
        <el-form-item
          label="转换后的短链"
          label-width="140px"
          v-show="form.urlNew !== ''"
        >
          <el-button @click="copy">{{ form.urlNew }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import axios from "axios";
import useClipboard from "vue-clipboard3";

const { toClipboard } = useClipboard();
const ruleFormRef = ref<FormInstance>();

const images = (name: string) => {
  const imgNew = new URL(`/src/assets/image/${name}`, import.meta.url);
  return `${imgNew}`;
};

interface IImg {
  url: string;
  title: string;
  content: string;
}
const img = ref<IImg[]>([
  {
    url: "means1.png",
    title: "代码复制",
    content: "可以在浏览器的 url 中查看你分享的代码；或者将代码导出为图片",
  },
  {
    url: "means2.png",
    title: "短链生成",
    content: "可以将很长的 url 转成很短的 url",
  },
]);

const use = (index: number) => {
  if (index === 0) {
    window.open("https://carbon.now.sh/", "_blank");
  } else if (index === 1) {
    dialogFormVisible.value = true;
  }
};

const dialogFormVisible = ref(false);
interface IForm {
  url: string;
  urlNew: string;
  btnValue: string;
}
const form = reactive<IForm>({
  url: "",
  urlNew: "",
  btnValue: "转换",
});

const rules = reactive<FormRules>({
  url: [{ required: true, message: "url 不能为空", trigger: "change" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      form.btnValue = "转换中...";

      axios
        .get(`https://api.uomg.com/api/long2dwz?dwzapi=urlcn&url=${form.url}`)
        .then((response) => {
          form.urlNew = response.data.ae_url;
        })
        .catch((error) => {
          console.log(error);
          ElMessage.warning(error);
        })
        .finally(() => {
          form.btnValue = "转换";
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const copy = async () => {
  try {
    await toClipboard(form.urlNew);
    ElMessage.success("复制成功");
  } catch (error) {
    ElMessage.warning("复制失败");
  }
};
</script>

<style lang="scss" scoped>
.means-container {
  height: calc(100vh - 100px);

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    transform-style: preserve-3d;
    width: 100%;

    .card {
      position: relative;
      width: 320px;
      height: 320px;
      margin: 20px;
      transform-style: preserve-3d;
      perspective: 1000px;

      &:hover .box {
        transform: rotateY(180deg);
      }

      .box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: 1s ease;

        .imgBx {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          .img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
        }

        .contentBx {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #333;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          transform: rotateY(180deg);
          border-radius: 4px;

          .word {
            transform-style: preserve-3d;
            padding: 20px;
            background: linear-gradient(45deg, #fe0061, #ffeb3b);
            transform: translateZ(100px);
            border-radius: 2px;
            cursor: pointer;

            .title {
              color: #fff;
              font-size: 20px;
              letter-spacing: 1px;
              line-height: 1.6;
              margin-bottom: 6px;
            }
            .content {
              color: #fff;
              font-size: 16px;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .convert {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
