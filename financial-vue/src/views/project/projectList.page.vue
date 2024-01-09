<script setup lang="ts">
import { DialogOpenType } from '@/constants'
import { paginationTableData } from '@/components/pagination-table'
import AddDialog from './add.dialog.vue'

const { pageSize, currentPage, total, tableData, getList } = paginationTableData(() => {
  return { data: { list: [{ name: 1 }], total: 1 } }
})
const addDialogRef = ref()
const form = ref({})

function openAdd() {
  addDialogRef.value.open()
}

function openEdit(row: any) {
  addDialogRef.value.open(DialogOpenType.EDIT, row)
}

function remove(row: any) {}
</script>

<template>
  <el-form inline :model="form">
    <el-form-item>
      <el-button type="primary" @click="openAdd">新增项目</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border>
    <el-table-column prop="name" label="项目名称" width="300" />
    <el-table-column prop="notes" label="备注" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="openEdit(row)">编辑</el-button>
        <el-button type="danger" @click="remove(row)">删除</el-button>
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
</style>
