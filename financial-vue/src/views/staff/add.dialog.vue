<script setup lang="ts">
import { DialogOpenType } from '@/constants'
import type { Project } from '#types'
const dialogVisible = ref(false)
const openType = ref(DialogOpenType.ADD)
const moduleName = '员工'
const title = computed(() => {
  switch (openType.value) {
    case DialogOpenType.ADD:
      return `新增${moduleName}`
    case DialogOpenType.EDIT:
      return `编辑${moduleName}`
    case DialogOpenType.DETAIL:
      return `${moduleName}详情`
  }
})

const formRef = ref()

const selectedProject = ref()
const projectList = ref<Project[]>([
  {
    id: '12',
    name: '项目项目1项目1项目1项目1项目1项目1项目1项目1项目11'
  },
  {
    id: '22',
    name: '项目2'
  }
])

interface UnitSalary {
  overtimeUnitPrice: number
  attendanceUnitPrice: number
}

const form = ref({
  name: '',
  job: '',
  projects: {} as Record<string, UnitSalary>
})

const rules = ref({
  name: {
    required: true,
    message: '请填写'
  }
})

function handleSelectionChange(value: Project[]) {
  const res: string[] = []
  value.forEach((item) => {
    res.push(item.id)
    if (!form.value.projects[item.id]) {
      form.value.projects[item.id] = {
        overtimeUnitPrice: 0,
        attendanceUnitPrice: 0
      }
    }
  })
  selectedProject.value = res
}

function open(type = DialogOpenType.ADD, data?: any) {
  if (data) {
    form.value = data
  } else {
    reset()
  }
  openType.value = type
  dialogVisible.value = true
}

function reset() {
  form.value = {
    name: '',
    job: '',
    projects: {}
  }
  selectedProject.value = []
}

function close() {
  dialogVisible.value = false
}

async function confirm() {
  const res = await formRef.value.validate()
  if (res) {
    close()
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    draggable
    width="1000"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item prop="name" label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="job" label="工种">
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-table border :data="projectList" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column label="出勤单价（元/天）">
            <template #default="{ row }">
              <el-input-number
                v-if="form.projects[row.id] && selectedProject.includes(row.id)"
                v-model="form.projects[row.id].attendanceUnitPrice"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="加班单价（元/小时）">
            <template #default="{ row }">
              <el-input-number
                v-if="form.projects[row.id] && selectedProject.includes(row.id)"
                v-model="form.projects[row.id].overtimeUnitPrice"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.project-transfer {
  .el-transfer-panel {
    width: 350px;
  }
}
</style>
