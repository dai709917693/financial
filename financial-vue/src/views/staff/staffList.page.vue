<script setup lang="ts">
import { apiStaff } from '@/api'

import { paginationTableData } from '@/components/pagination-table'
import AddDialog from './add.dialog.vue'

const form = ref({
  name: ''
})
const { pageSize, currentPage, total, tableData, getList } = paginationTableData(
  (pagination: any) => apiStaff.list({ name: form.value.name, ...pagination })
)
const addDialogRef = ref()

function openAdd() {
  addDialogRef.value.open()
}
</script>

<template>
  <el-form inline :model="form">
    <el-form-item>
      <el-button type="primary" @click="openAdd">新增员工</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="job" label="工种" />
    <el-table-column prop="workType" label="所属项目">
      <template #default="{ row }">
        <div class="project-tag">
          <el-tag v-for="item in row.staffProjects" :key="item.projectId">{{ item.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    class="pagination"
    layout="prev, pager, next, sizes"
    background
    :total="total"
    @current-change="getList"
    @size-change="getList"
  />
  <add-dialog ref="addDialogRef" @refresh="getList"></add-dialog>
</template>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
.project-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
