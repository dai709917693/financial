<script setup lang="ts">
import { paginationTableData } from '@/components/pagination-table'
import AddDialog from './add.dialog.vue'

const { pageSize, currentPage, total, tableData, getList } = paginationTableData(() => {
  return { data: { list: [{ name: 1, projects: [{ name: '23' }, { name: '23' }] }], total: 1 } }
})
const addDialogRef = ref()
const form = ref({})

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
    <el-table-column prop="workType" label="工种" />
    <el-table-column prop="workType" label="所属项目">
      <template #default="{ row }">
        <div class="project-tag">
          <el-tag v-for="item in row.projects" :key="item.id">{{ item.name }}</el-tag>
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
  <add-dialog ref="addDialogRef"></add-dialog>
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
