<template>
  <el-row >
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="用户数量" :value="data.data.userCount" />
        <template #footer></template>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="商品数量" :value="data.data.goodsCount" />
        <template #footer></template>
      </el-card>
    </el-col>
  </el-row>

  <el-row >
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="文章数量" :value="data.data.articleCount" />
        <template #footer></template>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="订单数量" :value="data.data.orderCount" />
        <template #footer></template>
      </el-card>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="文章评论数量" :value="data.data.commentCount" />
        <template #footer></template>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button class="button" text>更新</el-button>
          </div>
        </template>
        <el-statistic title="用户信息" :value="data.data.chatCount" />
      </el-card>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { StatisticsDto } from '../../util/clazz'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000
const d: StatisticsDto = new StatisticsDto
let data = reactive({
  data: d
})
const search = () => {
  //   pageNum = 1
  axios.get('/admin/statistics', {
    params: {
    }
  }).then(response => {
    if (response.data.code == 200) {
      data.data = response.data.data as StatisticsDto
      console.log(data.data)
    }
  })
}
search()

</script>
  
<style scoped>
.el-col {
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
  