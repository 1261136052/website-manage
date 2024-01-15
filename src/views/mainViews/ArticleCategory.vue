<template>
    <div style="width: 1000px;height: 50px;background-color: white;line-height: 50px;display: flex;">
        <div style="margin-right: 20px;">
            <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
        </div>
        <div>
            <el-button type="primary" @click="search()">
                搜索
            </el-button>

            <el-button type="primary" @click="dialogTableVisible = true">
                添加
            </el-button>
        </div>
    </div>
    <el-table :data="data.data" style="width: 95%;height: 80%;" table-layout="fixed">
        <el-table-column fixed prop="id" label="编号"  />
        <el-table-column prop="name" label="分类" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteCategory(scope.$index, scope.row)">删除</el-button>
                <el-button link type="primary" size="small"
                    @click="dialogFormVisible = true, initCategory(scope.$index, scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum" :page-count="pageCount"
            @change="search()" />
    </div>

    <el-dialog v-model="dialogFormVisible" title="分类信息修改">
        <el-form :model="form">
            <el-form-item label="分类名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">退出</el-button>
                <el-popconfirm title="确认修改?" @confirm="dialogFormVisible = false,updateCategory()">
                    <template #reference>
                        <el-button type="primary">
                            提交
                        </el-button>
                    </template>
                </el-popconfirm>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogTableVisible" title="分类信息添加">
        <el-form :model="form">
            <el-form-item label="分类名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogTableVisible = false">退出</el-button>
                <el-popconfirm title="确认添加?" @confirm="dialogTableVisible = false,addCategory()">
                    <template #reference>
                        <el-button type="primary">
                            提交
                        </el-button>
                    </template>
                </el-popconfirm>
            </span>
        </template>
    </el-dialog>


</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, initCustomFormatter } from 'vue'
import axios from 'axios'
import { category2 } from "../../util/clazz"


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    id: -1,
    name: '',
})
const initCategory= (index, row) => {
    form.id = row.id
}


const input1 = ref('')
const updateCategory = () => {
    axios.post('/article/updateArticleCategory' , form).then(response => {
                if (response.data.code == 200 && response.data.data == 1) {
                    search()
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
}

const addCategory = () => {
    axios.post('/article/addArticleCategory' , form).then(response => {
                if (response.data.code == 200 ) {
                    search()
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
}
const categorys: category2[] = []
const data = reactive({
    data: categorys
})
var pageCount = ref(0)
var pageNum = ref(1)
const search = () => {
    //   pageNum = 1
    axios.get('/article/listArticleCategory/' + pageNum.value + '/14', {
        params: {
            'keyword': input1.value,
        }
    }).then(response => {
        if (response.data.code == 200) {
            data.data = response.data.data.list as category2[]
            pageCount.value = response.data.data.pager.pageCount
        }
    })
}
search()

import { ElMessage, ElMessageBox } from 'element-plus'

const deleteCategory = (index, row) => {
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

            axios.get('/article/deleteArticleCategory/' + row.id, {
                params: {
                }
            }).then(response => {
                if (response.data.code == 200 && response.data.data != -1) {
                    search()
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
<style scoped>
.example-pagination-block+.example-pagination-block {
    margin-top: 10px;
}

.example-pagination-block .example-demonstration {
    margin-bottom: 16px;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>