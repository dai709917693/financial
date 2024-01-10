<script setup lang="ts">
import { apiAuth } from '@/api'
import router from '@/router'
const form = ref<{
  username?: string
  password?: string
}>({})
async function login() {
  const { username, password } = form.value
  if (username && password) {
    await apiAuth.login(username, password)
    router.push({ name: 'home' })
  }
}
</script>
<template>
  <div class="container">
    <el-form class="form" @submit.prevent="login">
      <el-form-item class="username">
        <el-input v-model="form.username" name="username"></el-input>
      </el-form-item>
      <el-form-item class="password">
        <el-input v-model="form.password" name="password" type="password"></el-input>
      </el-form-item>
      <el-button class="button" type="info" plain native-type="submit"> 登录 </el-button>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
$width: 200px;
$ratio: 0.7;
.container {
  height: 100%;
  position: relative;
}
.form {
  width: $width;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.username {
  width: $width * $ratio;
}
.button {
  width: $width * (1 - $ratio);
}
</style>
