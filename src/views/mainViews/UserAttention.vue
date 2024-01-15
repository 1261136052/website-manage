<template>
    <!-- <el-table :data="data.data" table-layout="fixed">
    <el-table-column prop="attentionId" label="用户id"  />
        <el-table-column prop="userName" label="用户名"  />
        <el-table-column prop="likeCount" label="关注数" />
  </el-table> -->
  <div style="width: 1000px;height: 50px;background-color: white;line-height: 50px;display: flex;">

        <div style="margin-right: 20px;">
            <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
        </div>
        <div>
            <el-button type="primary" @click="search()">
                搜索
            </el-button>
        </div>
    </div>
    <el-table :data="data.data" style="width: 100%" table-layout="fixed">
        <el-table-column prop="attentionId" label="用户id" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="likeCount" label="被关注数" />
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button link type="primary" size="small"
                    @click="dialogTableVisible = true, attentionId = scope.row.attentionId, getDetail()">Detail</el-button>
                <!-- <el-button link type="primary" size="small">Edit</el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum" :page-count="pageCount"
            @change="search()" />
    </div>

    <el-dialog v-model="dialogTableVisible" title="关注者信息">
        <el-table :data="data.data2" table-layout="fixed">
            <el-table-column property="userId" label="关注者id" />
            <el-table-column property="userName" label="关注者用户名" />
            <el-table-column property="likeDate" label="工作日期" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click = "deleteData(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum2" :page-count="pageCount2"
            @change="getDetail()" />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { AttentionDto, User } from "../../util/clazz"
import { ro } from 'element-plus/es/locale';
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const input1 = ref('')
const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)
const dtos: AttentionDto[] = []
const data = reactive({
    data: dtos,
    data2: dtos
})
var pageCount = ref(0)
var pageNum = ref(1)
const search = () => {
    //   pageNum = 1
    axios.get('/attention/list/' + pageNum.value + '/14', {
        params: {
            keyword:input1.value
        }
    }).then(response => {
        if (response.data.code == 200) {
            data.data = response.data.data.list as AttentionDto[]
            pageCount.value = response.data.data.pager.pageCount
        }
    })
}
search()

const attentionId = ref(-1)
var pageCount2 = ref(0)
var pageNum2 = ref(1)
const getDetail = () => {
    //   pageNum = 1
    axios.get('/attention/detail/' + pageNum2.value + '/14/' + attentionId.value, {
        params: {
        }
    }).then(response => {
        if (response.data.code == 200) {
            data.data2 = response.data.data.list as AttentionDto[]
            pageCount2.value = response.data.data.pager.pageCount
        }
    })
}

const deleteData = (index, row) => {
    ElMessageBox.confirm(
        '是否删除！',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })

            axios.get('/attention/deleteAttention/' + attentionId.value + '/' + row.userId, {
                params: {
                }
            }).then(response => {
                if (response.data.code == 200 && response.data.data != 0) {
                    getDetail()
                    ElMessage({
                        type: 'success',
                        message: '成功',
                    })
                } else {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                }
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}
</script>

<style lang="scss" scoped></style>