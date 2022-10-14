<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogSort === 'add' ? '新增用户' : '编辑用户'"
    width="60%"
    @open="onOpen"
    @close="onClose(formRef)"
    draggable
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="username">
        <el-input
          v-model="form.username"
          :disabled="dialogSort === 'add' ? false : true"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :disabled="dialogSort === 'add' ? false : true"
          :show-password="dialogSort === 'add' ? true : false"
          type="password"
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-checkbox-group v-model="form.role">
          <el-checkbox label="超级管理员" name="type" />
          <el-checkbox label="管理员" name="type" />
          <el-checkbox label="普通用户" name="type" />
          <el-checkbox label="游客" name="type" />
          <el-checkbox label="靓仔" name="type" />
          <el-checkbox label="人见人爱的仙女" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" type="textarea" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-switch
          v-model="form.state"
          active-text="启用"
          inactive-text="禁用"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onReset(formRef)">取消</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { userAddOne, userEditOne } from "@/api/user";
import { validatePhone, validateEmail } from "@/utils/validator";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogValue: {
    type: Object,
    default() {
      return {
        id: Number,
      };
    },
  },
});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "名称不能为空", trigger: "blur" },
    { min: 2, max: 16, message: "请输入 2~16 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 4, max: 16, message: "请输入 4~16 个字符", trigger: "blur" },
  ],
  phone: [{ validator: validatePhone, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
});

let dialogVisible: any = ref(false); // 声明变量
dialogVisible = inject("dialogVisible"); // 接收父级组件的传值

const dialogSort: any = inject("dialogSort");

const form: { [key: string]: any } = reactive({
  username: "",
  password: "",
  phone: "",
  email: "",
  role: ["普通用户"],
  note: "",
  state: true,
});

const emit = defineEmits(["refresh"]);
const doRefresh = () => {
  emit("refresh");
};

// 保存表单的编辑
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (dialogSort.value === "edit") {
        // 接口请求-编辑
        userEditOne({
          id: props.dialogValue.id,
          username: form.username,
          password: form.password,
          phone: form.phone,
          email: form.email,
          role: form.role.join(","),
          note: form.note,
          state: form.state == true ? "1" : "0",
        }).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success(res.data.message);
            doRefresh();
          } else {
            ElMessage.error(res.data.message);
          }
        });
      } else {
        // 接口请求-新增
        userAddOne({
          username: form.username,
          password: form.password,
          phone: form.phone,
          email: form.email,
          role: form.role.join(","),
          note: form.note,
          state: form.state == true ? "1" : "0",
        })
          .then((res) => {
            if (res.data.code == 200) {
              ElMessage.success(res.data.message);
            } else {
              ElMessage.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      dialogVisible.value = false;
      doRefresh();
    }
  });
};

// 取消表单的编辑
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
};

// 对话框开启的回调
const onOpen = () => {
  if (dialogSort.value === "edit") {
    // 编辑时，数据回显
    const dialogValue: any = props.dialogValue;

    for (const key in dialogValue) {
      if (Object.prototype.hasOwnProperty.call(dialogValue, key)) {
        // 多选框要数组格式进行渲染。格式转化：逗号分隔的字符串 → 数组
        if (key == "role") {
          form[key] = dialogValue[key].split(",");
        } else if (key == "state") {
          form[key] = dialogValue[key] == "1" ? true : false;
        } else {
          form[key] = dialogValue[key];
        }
      }
    }
  }
};

// 对话框关闭的回调：重置该表单项，并移除校验结果
const onClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
