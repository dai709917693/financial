<script setup lang="ts">
import { DialogOpenType } from '@/constants'
const dialogVisible = ref(false)
const openType = ref(DialogOpenType.ADD)
const moduleName = '项目'
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

const form = ref({
  name: '',
  notes: ''
})

const rules = ref({
  name: {
    required: true,
    message: '请填写'
  }
})

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
    notes: ''
  }
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
