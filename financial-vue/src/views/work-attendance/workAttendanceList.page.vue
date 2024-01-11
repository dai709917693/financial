<script setup lang="ts">
import { apiProject } from '@/api'
import router from '@/router'
import { ArrowRightBold } from '@element-plus/icons-vue'

const list = ref([
  {
    name: '123'
  },
  {
    name: '123'
  },
  {
    name: '123'
  },
  {
    name: '123'
  },
  {
    name: '123'
  },
  {
    name: '123'
  }
])
function getList() {}

function clickItem() {
  router.push({ name: 'workAttendanceDetail' })
}
</script>
<template>
  <div class="list-container">
    <el-card
      v-for="item in list"
      :key="item.id"
      class="list-item"
      size="default"
      shadow="hover"
      @click="clickItem"
    >
      <div style="position: relative">
        {{ item.name }}
        <el-icon class="icon-arrow">
          <ArrowRightBold></ArrowRightBold>
        </el-icon>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  .list-item {
    width: 350px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      .icon-arrow {
        display: block;
      }
    }
  }
  .icon-arrow {
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>
