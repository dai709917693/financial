<script setup lang="ts">
import { apiProject } from '@/api'
import { Search } from '@element-plus/icons-vue'
import { DialogOpenType } from '@/constants'
import { paginationTableData } from '@/components/pagination-table'
import AddDialog from './add.dialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const form = ref({
  name: ''
})

const { pageSize, currentPage, total, tableData, getList } = paginationTableData(
  (pagination: any) => apiProject.list({ name: form.value.name, ...pagination })
)
const addDialogRef = ref()

function openAdd() {
  addDialogRef.value.open()
}

function openDetail(row: any) {
  addDialogRef.value.open(DialogOpenType.DETAIL, row)
}

function remove(row: any) {
  ElMessageBox.confirm('确认删除?', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    buttonSize: 'default',
    type: 'warning'
  })
    .then(async () => {
      const res = await apiProject.remove(row.id)
      if (res.state) {
        ElMessage.success('删除成功')
        getList()
      } else {
        ElMessage.error(res.message ?? '删除失败')
      }
    })
    .catch(() => {})
}
</script>

<template>
  <el-form inline :model="form">
    <el-form-item label="项目名称">
      <el-input placeholder="请输入项目名称" v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="getList" :icon="Search">搜索</el-button>
    </el-form-item>
    <el-button class="fr" type="primary" @click="openAdd">新增项目</el-button>
  </el-form>
  <el-table :data="tableData" border>
    <el-table-column prop="name" label="项目名称" width="300" />
    <el-table-column prop="notes" label="备注" />
    <el-table-column label="员工数量" width="90">
      <template #default="{ row }">
        {{ row.staffProjects.length }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="openDetail(row)">详情</el-button>
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
  <add-dialog ref="addDialogRef" @refresh="getList"></add-dialog>
</template>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
