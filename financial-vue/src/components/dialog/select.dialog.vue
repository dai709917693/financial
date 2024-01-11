<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
interface ListItem {
  id: string
  name: string
}
const props = defineProps<{
  title: string
  keywordLabel: string
  getListFun: (keywords: string) => Promise<ListItem[]>
}>()
const emit = defineEmits<{ (e: 'confirm', selected: ListItem[]): void }>()
const dialogVisible = ref(false)
const tableRef = ref()
const keywords = ref('')
const loading = ref(true)
const list = ref<ListItem[]>([])
const selected = ref<ListItem[]>([])
function close() {
  dialogVisible.value = false
}

function open() {
  dialogVisible.value = true
  keywords.value = ''
  selected.value = []
  getList()
}

async function getList() {
  loading.value = true
  list.value = await props.getListFun(keywords.value)
  nextTick(() => {
    selected.value.forEach((selectedItem) => {
      const row = list.value.find((item) => item.id === selectedItem.id)
      row && tableRef.value?.toggleRowSelection(row)
    })
  })
  loading.value = false
}

function rowClick(row: any) {
  tableRef.value?.toggleRowSelection(row)
  select(null, row)
}

function select(selection: any, row: ListItem) {
  const index = selected.value.findIndex((item) => item.id === row.id)
  if (index !== -1) {
    selected.value.splice(index, 1)
  } else {
    selected.value.push(row)
  }
}

function selectAll(selection: ListItem[]) {
  const obj: Record<string, ListItem> = {}
  selection.forEach((sel) => {
    obj[sel.id] = sel
    const index = selected.value.findIndex((item) => item.id === sel.id)
    if (index === -1) {
      selected.value.push(sel)
    }
  })

  list.value.forEach((listItem) => {
    if (!obj[listItem.id]) {
      const index = selected.value.findIndex((item) => item.id === listItem.id)
      if (index !== -1) {
        selected.value.splice(index, 1)
      }
    }
  })
}

function confirm() {
  emit('confirm', selected.value)
  close()
  list.value = []
  keywords.value = ''
  selected.value = []
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
    width="500"
    :close-on-click-modal="false"
  >
    <el-form>
      <el-form-item>
        <el-input
          v-model="keywords"
          :placeholder="'请输入' + keywordLabel"
          :prefix-icon="Search"
          @input="getList"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-table
      ref="tableRef"
      style="height: 300px"
      border
      :select-on-indeterminate="false"
      :data="list"
      v-loading="loading"
      @row-click="rowClick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" :label="keywordLabel"></el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close" size="default">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
