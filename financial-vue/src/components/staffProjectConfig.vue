<script setup lang="ts">
import type { StaffProject } from '#types'

const props = withDefaults(
  defineProps<{
    modelValue: StaffProject[]
    type: 'staff' | 'project'
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)
const emit = defineEmits<{ (e: 'update:modelValue', val: StaffProject[]): void }>()

const doneValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
function removeProject(index: number) {
  doneValue.value.splice(index, 1)
}
</script>
<template>
  <el-table border :data="doneValue">
    <el-table-column v-if="type === 'project'" label="项目名称">
      <template #default="{ row }">
        {{ row.project?.name }}
      </template>
    </el-table-column>
    <el-table-column v-if="type === 'staff'" label="员工名称">
      <template #default="{ row }">
        {{ row.staff?.name }}
      </template>
    </el-table-column>
    <el-table-column label="出勤单价（元/天）" width="190">
      <template #default="{ row }">
        <div v-if="disabled">
          {{ row.attendanceUnitPrice }}
        </div>
        <el-input-number v-else v-model="row.attendanceUnitPrice" size="default"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="加班单价（元/小时）" width="190">
      <template #default="{ row }">
        <div v-if="disabled">
          {{ row.overtimeUnitPrice }}
        </div>
        <el-input-number v-else v-model="row.overtimeUnitPrice" size="default"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column v-if="!disabled" label="操作" width="100">
      <template #default="{ $index }">
        <el-button type="danger" size="default" @click="removeProject($index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
