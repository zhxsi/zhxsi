<template>
  <!-- 上下居中 -->
  <div class="flex h-64 w-full items-center justify-center">
    <el-form :model="form" label-width="auto" class="w-full">
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
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
  phone: "18113934193",
  password: "132456yL",
});
// 关闭弹窗

const onSubmit = () => {
  console.log(form.value);
  emailLogin({
    email: form.value.phone,
    md5_password: md5Encrypt(form.value.password),
  }).then((res) => {
    console.log(res.data);
    store.setUser(res.data);
    console.log("store.user", store.user);
    // 关闭弹窗
    hideDialog();
  });
};
</script>

<style lang="scss" scoped></style>
