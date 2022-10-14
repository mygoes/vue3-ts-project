<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user-container">
    <el-scrollbar class="scrollbar">
      <el-card>
        <el-form :inline="true" :model="ruleForm" ref="ruleFormRef">
          <el-form-item label="名称" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入"
              class="short-input"
              @keyup.enter="onSearch"
            />
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              placeholder="请输入"
              @keyup.enter="onSearch"
            />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择">
              <el-option label="超级管理员" value="超级管理员" />
              <el-option label="管理员" value="管理员" />
              <el-option label="普通用户" value="普通用户" />
              <el-option label="游客" value="游客" />
              <el-option label="靓仔" value="靓仔" />
              <el-option label="人见人爱的仙女" value="人见人爱的仙女" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择">
              <el-option label="禁用" value="0" />
              <el-option label="启用" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset(ruleFormRef)">重置</el-button>
            <el-button type="primary" @click="onAdd">新增用户</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="card-main">
        <el-table :data="tableData" empty-text="没有数据">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            align="center"
          ></el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template v-slot="scope">
              <div v-if="scope.row.state == 1">
                <el-popconfirm
                  title="Are you sure to change this?"
                  :hide-icon="true"
                  @confirm="editState(scope.row.id)"
                  width="180"
                >
                  <template #reference>
                    <el-button type="success" text>启用</el-button>
                  </template>
                </el-popconfirm>
              </div>
              <div v-else>
                <el-popconfirm
                  title="Are you sure to change this?"
                  :hide-icon="true"
                  @confirm="editState(scope.row.id)"
                  width="180"
                >
                  <template #reference>
                    <el-button type="danger" text>禁用</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template v-slot="scope">
              <el-button type="primary" link @click="onEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="primary" link @click="editState(scope.row.id)">{{
                scope.row.state == 0 ? "启用" : "禁用"
              }}</el-button>
              <el-button type="danger" link>
                <el-popconfirm
                  title="Are you sure to delete this?"
                  :hide-icon="true"
                  @confirm="onDel(scope.row.id)"
                  width="180"
                >
                  <template #reference>
                    <el-button link type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-model:currentPage="pages.currentPage"
          v-model:page-size="pages.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :background="true"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </el-scrollbar>
  </div>
  <UserDialog
    :dialogValue="dialogValue"
    @refresh="queryUserGetList"
  ></UserDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { userGetList, userGetOne, userEditState, userDelOne } from "@/api/user";
import UserDialog from "./components/userDialog.vue";
import { ElMessage } from "element-plus";

const dialogValue = reactive<ITable>({
  username: "",
  phone: "",
  role: "",
  state: "",
  email: "",
  note: "",
  id: 0,
});

const dialogVisible = ref<boolean>(false);
provide("dialogVisible", dialogVisible);

const dialogSort = ref<string>("");
provide("dialogSort", dialogSort);

interface IQueryData {
  [key: string]: string | number | undefined;
}

// IForm 接口继承 IQueryData 接口。即 IForm 接口包含 IQueryData 所有内容
interface IForm extends IQueryData {
  username: string;
  phone: string;
  role: string;
  state: string | undefined;
}

interface ITable extends IForm {
  email: string;
  note: string;
  id: number;
}

const tableData = ref<ITable[]>([]);

const isSearch = ref(false); // false-筛选操作；true-查询操作。由于两个操作调用的是两个不同的接口，因此定义此字段用于区别不同操作下的分页

// 分页
interface IPages {
  currentPage: number;
  pageSize: number;
}
const pages = reactive<IPages>({
  currentPage: 1, // 当前页
  pageSize: 10, // 页容量
});

const total = ref(10); // 数据总条数

// 列表查询
const queryUserGetList = () => {
  userGetList({
    currentPage: pages.currentPage,
    pageSize: pages.pageSize,
  }).then((res) => {
    total.value = res.data.total;
    tableData.value = res.data.data;
  });
};

// 分页
const handleSizeChange = (val: number) => {
  pages.pageSize = val;
  if (isSearch.value) {
    onSearch();
  } else {
    queryUserGetList();
  }
};
const handleCurrentChange = (val: number) => {
  pages.currentPage = val;
  if (isSearch.value) {
    onSearch();
  } else {
    queryUserGetList();
  }
};

// 表单
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<IForm>({
  username: "",
  phone: "",
  role: "",
  state: undefined,
});

// 表单重置
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  isSearch.value = false;
  formEl.resetFields();
  pages.currentPage = 1;
  queryUserGetList();
};

// 表单查询
const onSearch = () => {
  isSearch.value = true;
  // pages.currentPage = 1;

  // 非空判断，获得非空对象用于请求的参数传递
  const queryData: IQueryData = {};
  for (const key in ruleForm) {
    if (Object.prototype.hasOwnProperty.call(ruleForm, key)) {
      if (ruleForm[key] != "" && ruleForm[key] != null) {
        queryData[key] = ruleForm[key];
      }
    }
  }

  // 接口请求
  userGetOne({ ...queryData, ...pages }).then((res) => {
    total.value = res.data.total;
    tableData.value = res.data.data;
  });
};

// 表单新增
const onAdd = () => {
  dialogSort.value = "add";
  dialogVisible.value = true;
};

// 删除
const onDel = (id: number) => {
  userDelOne({ id }).then((res) => {
    ElMessage.success(res.data.message);
  });
  queryUserGetList();
};

// 表格编辑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onEdit = (row: any) => {
  dialogSort.value = "edit";

  for (const key in row) {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      dialogValue[key] = row[key];
    }
  }

  dialogVisible.value = true;
};

// 修改状态
const editState = (id: number) => {
  userEditState({ id }).then((res) => {
    ElMessage.success(res.data.message);
  });
  queryUserGetList();
};

const indexMethod = (index: number) => {
  return index + 1 + (pages.currentPage - 1) * pages.pageSize;
};

onMounted(() => {
  queryUserGetList();
});
</script>

<style lang="scss" scoped>
.user-container {
  .scrollbar {
    height: calc(100vh - 100px);
  }
  // 短的输入框
  .short-input {
    width: 100px;
  }

  // 文本
  .el-form-item__label {
    font-weight: 700;
  }

  .card-main {
    margin-top: 19px;
  }
}
</style>
