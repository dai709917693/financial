<script setup lang="ts">
import type { Project } from '#types'
import { apiProject } from '@/api'
import router from '@/router'
import { ArrowRightBold } from '@element-plus/icons-vue'

const list = ref<Project[]>([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const first = ref(true)

async function getList() {
  if (!first.value && list.value.length >= total.value) {
    return
  }
  first.value = false
  const res = await apiProject.list({ pageNum: pageNum.value, pageSize: pageSize.value })
  if (res.state && res.data?.list.length !== 0) {
    total.value = res.data?.total ?? 0
    pageNum.value++
    list.value = list.value.concat(res.data?.list ?? [])
  }
}

function clickItem(item: Project) {
  router.push({ name: 'workAttendanceDetail', query: { projectId: item.id } })
}
</script>
<template>
  <div v-infinite-scroll="getList" class="container">
    <div class="list">
      <el-card
        v-for="item in list"
        :key="item.id"
        class="list-item"
        size="default"
        shadow="hover"
        @click="clickItem(item)"
      >
        <div>
          {{ item.name }}
          <el-icon class="icon-arrow">
            <ArrowRightBold></ArrowRightBold>
          </el-icon>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    &-item {
      width: 350px;
      height: 200px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      &:hover {
        .icon-arrow {
          display: block;
        }
      }
    }
  }

  .icon-arrow {
    display: none;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
