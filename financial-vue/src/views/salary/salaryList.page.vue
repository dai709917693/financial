<script setup lang="ts">
// import { appApi } from '@/api';
import moment from 'moment'
import type { TableColumnCtx } from 'element-plus'
import { paginationTableData } from '@/components/pagination-table'

const { pageSize, currentPage, total, tableData, getList } = paginationTableData(() => {
  return { data: { list: [{ name: '啊啊啊' }], total: 1 } }
})

const form = ref({
  time: new Date()
})
const tableTitle = computed(() => moment(form.value.time).format('YYYY年MM月') + '工资表')

interface SummaryMethodProps<T = any> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = values
        .reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        .toString()
    } else {
      sums[index] = 'N/A'
    }
  })
  return sums
}
</script>

<template>
  <el-form inline :model="form">
    <el-form-item label="时间：">
      <el-date-picker v-model="form.time" type="month"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">新增人员</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border show-summary :summary-method="getSummaries">
    <el-table-column :label="tableTitle" align="center">
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="job" label="工种" width="80" />
      <el-table-column label="出勤" align="center">
        <el-table-column prop="attendance" label="出勤（天）" />
        <el-table-column prop="attendanceUnitPrice" label="单价（元/天）" />
        <el-table-column prop="attendanceTotalPrice" label="总额（元）" />
      </el-table-column>
      <el-table-column label="加班" align="center">
        <el-table-column prop="overtime" label="加班（小时）" />
        <el-table-column prop="overtimeUnitPrice" label="单价（元/小时）" />
        <el-table-column prop="overtimeTotalPrice" label="总额（元）" />
      </el-table-column>

      <el-table-column prop="totalSalary" label="应发工资" />
      <el-table-column prop="paidSalary" label="已发工资" />
      <el-table-column prop="reserveSalary" label="预留工资" />
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
</template>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
