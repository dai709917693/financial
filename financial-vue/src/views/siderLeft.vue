<script setup lang="ts">
const menus = [
  {
    label: '工资表',
    route: { name: 'salaryList' },
  },
  {
    label: '员工管理',
    route: { name: 'staffList' },
  },
  {
    label: '项目管理',
    route: { name: 'projectList' },
  }
];
</script>

<template>
  <el-aside width="200px" class="sider-left">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <el-menu-item
        v-for="(item, index) in menus"
        :key="index"
        :index="index + ''"
        class="menu-item"
        :route="item.route"
      >
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<style lang="scss" scoped>
@import '@/styles/var/zIndex.scss';
@import '@/styles/var/boxShadow.scss';

.sider-left {
  background-color: #f0f2f5;
  box-shadow: $main_box_shadow;
  z-index: $z_index_sider_left;
}
</style>
