<template>
  <!-- 上下居中 -->
  <div class="flex h-64 w-full items-center justify-center">
    <el-form :model="form" label-width="auto" class="w-full">
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { md5Encrypt } from "@/utils/md5";
import { emailLogin } from "@/api/login";
const store = useStore();
const emit = defineEmits(["hideDialog"]);
const hideDialog = () => {
  emit("hideDialog");
};
const form = ref({
  email: "18113934193@163.com",
  password: "132456yL",
});
const onSubmit = () => {
  console.log(form.value);
  emailLogin({
    email: form.value.email,
    md5_password: md5Encrypt(form.value.password),
  }).then((res) => {
    store.setUser(res.data);
    hideDialog();
  });
};
</script>

<style lang="scss" scoped></style>
