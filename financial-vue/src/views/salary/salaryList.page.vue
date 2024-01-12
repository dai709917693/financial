<script setup lang="ts">
import { apiSalary, apiProject, apiStaff, type SalaryData } from '@/api'
import type { Staff, Project } from '#types'
import type { TableColumnCtx } from 'element-plus'

const salaryData = ref<SalaryData[]>([])
const rows = ref<(Staff | Project)[]>([])
const form = ref({
  time: '',
  projectId: '',
  staffId: ''
})

const projectList = ref<Project[]>([])
const staffList = ref<Staff[]>([])
const staffLoading = ref(false)
const emptyTips = computed(() => {
  if (!form.value.projectId && !form.value.staffId) {
    return '请选择项目或员工'
  } else {
    return '无数据'
  }
})

async function getList() {
  if (!form.value.projectId && !form.value.staffId) {
    salaryData.value = []
    rows.value = []
    return
  }
  const res = await apiSalary.findOne({
    ...form.value
  })
  if (res.state && res.data) {
    salaryData.value = res.data.salaryData
    rows.value = res.data.rows
  } else {
    salaryData.value = []
    rows.value = []
  }
}
async function getProjectList() {
  const res = await apiProject.allList(true)
  if (res.state && res.data) {
    projectList.value = res.data
  }
}

const remoteMethod = async (query: string) => {
  if (query) {
    staffLoading.value = true
    const res = await apiStaff.list({
      name: query,
      projectId: form.value.projectId,
      pageNum: 1,
      pageSize: 10
    })
    if (res.state && res.data) {
      staffList.value = res.data.list
    }
    staffLoading.value = false
  } else {
    staffList.value = []
  }
}

getList()
getProjectList()
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
    } else if (
      column.property === 'job' ||
      column.property === 'attendanceUnitPrice' ||
      column.property === 'overtimeUnitPrice' ||
      !column.property
    ) {
      return
    }
    const [dataIndex, prop] = column.property.split('_')
    const values = data.map(
      (item) => (salaryData.value[Number(dataIndex)].data?.[item.id] as any)?.[prop] ?? 0
    )
    sums[index] = values
      .reduce((prev, curr) => {
        return prev + curr
      }, 0)
      .toString()
  })
  return sums
}

function cellClassName({ column }: any) {
  if (!column.property) {
    return 'cell-single'
  }
  const [dataIndex, prop] = column.property.split('_')
  if (prop) {
    return dataIndex % 2 === 0 ? 'cell-double' : 'cell-single'
  }
}

function headerClassName({ column }: any) {
  if (!column.property) {
    return 'cell-single'
  }
  const [dataIndex, prop] = column.property.split('_')
  if (prop) {
    return dataIndex % 2 === 0 ? 'cell-double' : 'cell-single'
  } else {
    return 'cell-single'
  }
}
</script>

<template>
  <el-form inline :model="form">
    <el-form-item label="项目">
      <el-select
        v-model="form.projectId"
        placeholder="请选择项目"
        filterable
        clearable
        @change="getList"
      >
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="员工">
      <el-select
        v-model="form.staffId"
        placeholder="请输入姓名"
        filterable
        remote
        :remote-method="remoteMethod"
        clearable
        :loading="staffLoading"
        @change="getList"
      >
        <el-option
          v-for="item in staffList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker
        v-model="form.time"
        type="month"
        value-format="YYYY-MM"
        clearable
        @change="getList"
      ></el-date-picker>
    </el-form-item>
  </el-form>

  <el-table
    v-if="salaryData.length"
    class="salary-table"
    :data="rows"
    border
    show-summary
    :summary-method="getSummaries"
    scrollbar-always-on
    :cell-class-name="cellClassName"
    :header-cell-class-name="headerClassName"
  >
    <el-table-column prop="name" :label="form.projectId ? '姓名' : '项目名称'" width="80" fixed />
    <el-table-column v-if="form.projectId" prop="job" label="工种" width="80" fixed />
    <el-table-column prop="attendanceUnitPrice" fixed width="100">
      <template #header>
        出勤单价
        <br />
        (元/天)
      </template>
    </el-table-column>
    <el-table-column prop="overtimeUnitPrice" fixed width="100">
      <template #header>
        加班单价
        <br />
        (元/小时)
      </template>
    </el-table-column>

    <el-table-column
      v-for="(item, index) in salaryData"
      :key="item.time"
      :label="item.time"
      :prop="index + '_header'"
      align="center"
    >
      <el-table-column label="出勤" align="center" :prop="index + '_header'">
        <el-table-column :prop="index + '_attendance'" label="出勤（天）" width="120">
          <template #default="{ row }">
            {{ item.data[row.id]?.attendance }}
          </template>
        </el-table-column>
        <el-table-column :prop="index + '_attendanceSalary'" label="总额（元）" width="120">
          <template #default="{ row }">
            {{ item.data[row.id]?.attendanceSalary }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="加班" align="center" :prop="index + '_header'">
        <el-table-column :prop="index + '_overtime'" label="加班（小时）" width="120">
          <template #default="{ row }">
            {{ item.data[row.id]?.overtime }}
          </template>
        </el-table-column>
        <el-table-column :prop="index + '_overtimeSalary'" label="总额（元）" width="120">
          <template #default="{ row }">
            {{ item.data[row.id]?.overtimeSalary }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column :prop="index + '_totalSalary'" label="应发工资" width="90" />
      <el-table-column :prop="index + '_paidSalary'" label="已发工资" width="90" />
      <el-table-column :prop="index + '_reserveSalary'" label="预留工资" width="90" />
    </el-table-column>

    <el-table-column label="合计" prop="amountTo" align="center" width="100">
      <el-table-column label="出勤（天）" width="120"> </el-table-column>
      <el-table-column label="加班（小时）" width="120"> </el-table-column>
      <el-table-column label="出勤工资" width="100"> </el-table-column>
      <el-table-column label="加班工资" width="100"> </el-table-column>
      <el-table-column label="补助" width="100" />
      <el-table-column label="应发工资" width="100"> </el-table-column>
      <el-table-column label="已发工资" width="100"> </el-table-column>
      <el-table-column label="结余工资" width="100"> </el-table-column>
    </el-table-column>
    <!-- <el-table-column label="扣款" width="100"> </el-table-column> -->
  </el-table>
  <el-empty v-else :description="emptyTips" />
</template>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
<style lang="scss">
.salary-table {
  .cell-single {
    background-color: #fff !important;
  }
  .cell-double {
    background-color: #f5f7fa;
  }
  .el-table__footer-wrapper tbody td.el-table__cell {
    background-color: #fafafa;
  }
}
</style>
