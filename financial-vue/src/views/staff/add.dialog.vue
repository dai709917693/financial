<script setup lang="ts">
import { apiStaff, apiProject } from '@/api'
import { DialogOpenType } from '@/constants'
import type { Project, StaffProject } from '#types'
import { ElMessage } from 'element-plus'
import SelectDialog from '@/components/dialog/select.dialog.vue'
import StaffProjectConfig from '@/components/staffProjectConfig.vue'

const emit = defineEmits<{ (e: 'refresh'): void }>()

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
const typeLabel = computed(() => {
  switch (openType.value) {
    case DialogOpenType.ADD:
      return '新增'
    case DialogOpenType.EDIT:
      return '编辑'
  }
})

const formRef = ref()
const selectDialogRef = ref()

const form = ref({
  id: '',
  name: '',
  job: '',
  projects: [] as StaffProject[]
})

const rules = ref({
  name: {
    required: true,
    message: '请填写'
  }
})

async function getProjectList(keyword: string) {
  const res = await apiProject.allList()
  return (
    res.data?.filter(
      (project) =>
        !form.value.projects.some((item) => item.projectId === project.id) &&
        (keyword ? project.name.search(keyword) !== -1 : true)
    ) || []
  )
}

function openSelectDialog() {
  selectDialogRef.value.open(form.value.projects)
}

async function open(type = DialogOpenType.ADD, data?: any) {
  if (data) {
    form.value = { ...data, projects: [...data.staffProjects] }
  } else {
    reset()
  }
  openType.value = type
  dialogVisible.value = true
}

function reset() {
  form.value = {
    id: '',
    name: '',
    job: '',
    projects: []
  }
}

function handleSelectProject(projects: Project[]) {
  projects.forEach((item) => {
    form.value.projects.push({
      project: item,
      projectId: item.id,
      attendanceUnitPrice: 0,
      overtimeUnitPrice: 0
    })
  })
}

function close() {
  dialogVisible.value = false
}

async function confirm() {
  const res = await formRef.value.validate()
  const req = openType.value === DialogOpenType.EDIT ? apiStaff.update : apiStaff.create
  if (res) {
    const res = await req(form.value)
    if (res.state) {
      ElMessage.success(typeLabel.value + '成功')
      emit('refresh')
      close()
    } else {
      ElMessage.error(res.message)
    }
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
    top="100px"
    width="800"
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
      <el-form-item v-if="form.projects.length !== 0" label="项目">
        <staff-project-config v-model="form.projects" type="project"></staff-project-config>
      </el-form-item>
      <el-form-item label=" " style="margin: 0">
        <el-button @click="openSelectDialog">加入项目</el-button>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <select-dialog
    ref="selectDialogRef"
    title="选择加入的项目"
    keyword-label="项目名称"
    :get-list-fun="getProjectList"
    @confirm="handleSelectProject"
  ></select-dialog>
</template>
<style lang="scss">
.project-transfer {
  .el-transfer-panel {
    width: 350px;
  }
}
</style>
