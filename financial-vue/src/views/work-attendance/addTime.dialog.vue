<script setup lang="ts">
import { ElMessage } from 'element-plus'

const emit = defineEmits<{ (e: 'confirm', time: string): void }>()

const dialogVisible = ref(false)
const time = ref()
function open() {
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

async function confirm() {
  if (!time.value) {
    ElMessage.warning('请选择日期')
    return
  }
  emit('confirm', time.value)
  close()
  time.value = ''
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增月份"
    draggable
    width="500"
    :close-on-click-modal="false"
  >
    <el-date-picker
      v-model="time"
      type="month"
      value-format="YYYY-MM"
      style="width: 100%"
    ></el-date-picker>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
