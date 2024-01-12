<script setup lang="ts">
interface CustomData {
  id: string
  type: any
}

interface CustomOpt {
  id: string
  name: string
  type: any
}
const props = defineProps<{ modelValue: CustomData }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: CustomData): void }>()

const doneValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const options = ref<CustomOpt[]>([{}])
</script>
<template>
  <el-select v-model="doneValue" placeholder="请输入">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
      <span style="float: left">{{ 1 }}</span>
      <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{
        2
      }}</span>
    </el-option>
  </el-select>
</template>
