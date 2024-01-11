<script setup lang="ts">
import { apiCheck, type CheckData } from '@/api'
import type { Staff } from '#types'
import { useRoute } from 'vue-router'
import AddTimeDialog from './addTime.dialog.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()

const addTimeDialogRef = ref()
const type = ref('detail')
const checkData = ref<CheckData[]>([])
const staffs = ref<Staff[]>([])

watch(() => route.query.projectId, getData, { immediate: true })

function getDefData() {
  const data: any = {}
  staffs.value.forEach((staff) => {
    data[staff.id] = {
      attendance: '',
      overtime: ''
    }
  })
  return data
}

async function getData() {
  const res = await apiCheck.findOne(route.query.projectId as string)
  if (res.state && res.data) {
    staffs.value = res.data.staffs
    checkData.value = res.data.checkData
  }
}

function handleSelectTime(time: string) {
  if (checkData.value.find((item) => item.time === time)) {
    ElMessage.warning('日期已存在')
    return
  }

  let insertIndex = 0
  checkData.value.some((item, index) => {
    if (time.replace('-', '') < item.time.replace('-', '')) {
      insertIndex = index
      return true
    } else if (index === checkData.value.length - 1) {
      insertIndex = ++index
      return false
    }
  })
  checkData.value.splice(insertIndex, 0, {
    time,
    data: getDefData()
  })
}

function addTime() {
  addTimeDialogRef.value?.open()
}

async function save() {
  const res = await apiCheck.update({
    projectId: route.query.projectId as string,
    checkData: checkData.value
  })
  if (res.state) {
    ElMessage.success('保存成功')
    type.value = 'detail'
  } else {
    ElMessage.error('保存失败')
  }
}
</script>
<template>
  <div class="menu">
    <el-button v-if="type !== 'edit'" @click="type = 'edit'">编辑</el-button>
    <template v-if="type === 'edit'">
      <el-button @click="addTime"> 新增月份 </el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </div>

  <el-table :data="staffs" border class="table">
    <el-table-column prop="name" label="姓名" fixed width="120" />
    <el-table-column v-for="item in checkData" :key="item.time" :label="item.time" align="center">
      <el-table-column prop="attendance" label="出勤（天）" width="120">
        <template #default="{ row }">
          <div v-if="type === 'detail'" style="height: 25px">
            {{ item.data[row.id].attendance }}
          </div>
          <el-input
            v-else-if="type === 'edit'"
            v-model="item.data[row.id].attendance"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="overtime" label="加班（小时）" width="120">
        <template #default="{ row }">
          <div v-if="type === 'detail'" style="height: 24px">
            {{ item.data[row.id].overtime }}
          </div>
          <el-input
            v-else-if="type === 'edit'"
            v-model="item.data[row.id].overtime"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="total" label="合计" fixed="right" width="80" />
  </el-table>

  <add-time-dialog ref="addTimeDialogRef" @confirm="handleSelectTime"></add-time-dialog>
</template>
<style scoped lang="scss">
.menu {
  margin-bottom: 20px;
}
.table {
  width: fit-content;
}
</style>
