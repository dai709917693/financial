<script setup lang="ts">
import { apiProject, apiStaff } from '@/api'
import { DialogOpenType } from '@/constants'
import { ElMessage } from 'element-plus'
import SelectDialog from '@/components/dialog/select.dialog.vue'
import StaffProjectConfig from '@/components/staffProjectConfig.vue'
import type { Staff, StaffProject } from '#types'

const emit = defineEmits<{ (e: 'refresh'): void }>()

const dialogVisible = ref(false)
const openType = ref(DialogOpenType.ADD)

const moduleName = '项目'
const typeLabel = computed(() => {
  switch (openType.value) {
    case DialogOpenType.ADD:
      return '新增'
    case DialogOpenType.EDIT:
      return '编辑'
  }
})
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
const selectDialogRef = ref()

const form = ref({
  name: '',
  notes: '',
  staffs: [] as StaffProject[]
})

const rules = ref({
  name: {
    required: true,
    message: '请填写'
  }
})
function openSelectDialog() {
  selectDialogRef.value.open(form.value.staffs)
}
function open(type = DialogOpenType.ADD, data?: any) {
  if (data) {
    form.value = { ...data, staffs: [...data.staffProjects] }
  } else {
    reset()
  }
  openType.value = type
  dialogVisible.value = true
}

async function getStaffList(keyword: string) {
  const res = await apiStaff.allList()
  return (
    res.data?.filter(
      (staff) =>
        !form.value.staffs.some((item) => item.staffId === staff.id) &&
        (keyword ? staff.name.search(keyword) !== -1 : true)
    ) || []
  )
}

function reset() {
  form.value = {
    name: '',
    notes: '',
    staffs: []
  }
}

function handleSelect(staffs: Staff[]) {
  staffs.forEach((item) => {
    form.value.staffs.push({
      staff: item,
      staffId: item.id,
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
  const req = openType.value === DialogOpenType.EDIT ? apiProject.update : apiProject.create
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
    width="700"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item prop="name" label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="notes" label="备注">
        <el-input v-model="form.notes" type="textarea"></el-input>
      </el-form-item>
      <el-form-item v-if="form.staffs.length !== 0" label="员工">
        <staff-project-config v-model="form.staffs" type="staff"></staff-project-config>
      </el-form-item>
      <el-form-item label=" " style="margin: 0">
        <el-button @click="openSelectDialog">加入员工</el-button>
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
    title="选择加入的员工"
    keyword-label="员工名称"
    :get-list-fun="getStaffList"
    @confirm="handleSelect"
  ></select-dialog>
</template>
