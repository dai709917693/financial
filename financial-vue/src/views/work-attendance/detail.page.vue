<script setup lang="ts">
import type { Staff } from '#types'
import AddTimeDialog from './addTime.dialog.vue'
const addTimeDialogRef = ref()
const type = ref('detail')
const timeList = ref<any>([
  {
    time: '2023-9',
    data: {
      123: {
        attendance: 1,
        overtime: 1
      },
      333: {
        attendance: 1,
        overtime: 3
      }
    }
  },
  {
    time: '2023-10',
    data: {
      123: {
        attendance: 1,
        overtime: 1
      },
      333: {
        attendance: '',
        overtime: 3
      }
    }
  },
  {
    time: '2023-11',
    data: {
      123: {
        attendance: '',
        overtime: 1
      },
      333: {
        attendance: 1,
        overtime: 3
      }
    }
  },
  {
    time: '2023-12',
    data: {
      123: {
        attendance: 1,
        overtime: 1
      },
      333: {
        attendance: 1,
        overtime: 3
      }
    }
  }
])
const staffs = ref<Staff[]>([
  {
    id: '123',
    name: 'a'
  },
  {
    id: '333',
    name: 'b'
  }
])

function addTime() {
  addTimeDialogRef.value?.open()
}

function save() {}
</script>
<template>
  <el-button v-if="type !== 'edit'" @click="type = 'edit'">编辑</el-button>
  <template v-if="type === 'edit'">
    <el-button @click="addTime"> 新增月份 </el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </template>
  <el-table :data="staffs" border>
    <el-table-column prop="name" label="姓名" fixed width="120" />
    <el-table-column v-for="item in timeList" :key="item.time" :label="item.time">
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
    <el-table-column prop="total" label="合计" fixed="right" />
  </el-table>
  <add-time-dialog ref="addTimeDialogRef"></add-time-dialog>
</template>
