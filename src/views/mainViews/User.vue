<template>
    <div style="width: 1000px;height: 50px;background-color: white;line-height: 50px;display: flex;">
        <!-- <div style="height: 25px;width: 200px;">
            <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in form.category" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <div style="margin-right: 20px;">
            <el-date-picker v-model="value3" type="datetimerange" :shortcuts="shortcuts" range-separator="To"
                start-placeholder="Start date" end-placeholder="End date" />
        </div> -->
        <div style="margin-right: 20px;">
            <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
        </div>
        <div>
            <el-button type="primary" @click="search()">
                搜索
            </el-button>
        </div>
    </div>
    <el-table :data="data.data" style="width: 95%;height: 80%;">
        <el-table-column fixed prop="id" label="编号" width="200" />
        <el-table-column prop="account" label="账号" width="120" />
        <el-table-column prop="pwd" label="密码" width="120" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="phoneNumber" label="电话号码" width="120" />
        <el-table-column prop="schoolName" label="学校名称" width="120" />
        <el-table-column prop="studentNumber" label="学生号" width="200" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="birthday" label="生日" width="200" />
        <el-table-column prop="loginDate" label="登录日期" width="200" />
        <!-- <el-table-column prop="loginTime" label="loginTime" width="120" /> -->
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                <el-button link type="primary" size="small"
                    @click="dialogFormVisible = true, initUser(scope.$index, scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum" :page-count="pageCount"
            @change="search()" />
    </div>

    <el-dialog v-model="dialogFormVisible" title="用户信息修改">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.pwd" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">退出</el-button>
                <el-popconfirm title="确认修改?" @confirm="dialogFormVisible = false,adminUpdate()">
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
import { User } from "../../util/clazz"


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    id: -1,
    userName: '',
    account: '',
    pwd: '',
})
const initUser = (index, row) => {
    form.id = row.id
    form.userName = row.userName
    form.account = row.account
    form.pwd = row.pwd
}


const input1 = ref('')
const adminUpdate = () => {
    axios.post('/user/update' , form).then(response => {
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
const users: User[] = []
const data = reactive({
    data: users
})
var pageCount = ref(0)
var pageNum = ref(1)
const search = () => {
    //   pageNum = 1
    axios.get('/user/list/' + pageNum.value + '/14', {
        params: {
            'keyword': input1.value,
        }
    }).then(response => {
        if (response.data.code == 200) {
            data.data = response.data.data.list as User[]
            pageCount.value = response.data.data.pager.pageCount
        }
    })
}
search()

import { ElMessage, ElMessageBox } from 'element-plus'

const deleteUser = (index, row) => {
    ElMessageBox.confirm(
        '是否删除用户！',
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

            axios.get('/user/delete/' + row.id, {
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