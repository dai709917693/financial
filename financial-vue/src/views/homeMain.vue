<script setup lang="ts">
import SiderLeft from './siderLeft.vue';
</script>

<template>
  <el-container class="container">
    <el-header class="header"></el-header>
    <el-container>
      <sider-left></sider-left>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
@import '@/styles/var/zIndex.scss';
@import '@/styles/var/boxShadow.scss';

.container {
  height: 100%;
}
.header {
  background-color: #e6e8eb;
  box-shadow: $main_box_shadow;
  z-index: $z_index_header;
}

.main {
  background-color: #fff;
}
</style>
