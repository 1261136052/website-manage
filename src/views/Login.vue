<template>
 <div style="width: 1200px;height: 700px; background-color: #f6f6f6;;overflow: hidden;">
        <div style="width: 600px;height: 500px; background-color: #fff;margin: auto;margin-top: 100px;">
            <div style="width: 600px;height:200px; font-size: 25px;box-sizing: border-box;padding-top: 60px;">
                <!-- <el-icon>
                    <Search />
                </el-icon> -->
                <div style="width:600px;height: 60px;display: flex; justify-content:center;">
                    <div><el-image style="width: 50px; height: 50px" src="/logo.png" fit="fit" /></div>
                    <div>校园易物后台管理</div>
                </div>
            </div>
            <div style="width: 600px;height: 300px;">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="Account" prop="account">
                        <el-input style="width: 400px;" v-model="ruleForm.account" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Password" prop="pass">
                        <el-input style="width: 400px;" v-model="ruleForm.pass" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { FormInstance, FormRules, ElNotification, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

import { defineStore, storeToRefs } from "pinia";
import { testStore } from "../stores/TestStore"
import * as MyModule from '../util/check';

const store = testStore()
let { UserData } = storeToRefs(store)
const drawer = ref(false)
const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the data'))
    } else {
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}



const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
    account: ''
})



const rules = reactive<FormRules>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    account: [{ validator: MyModule.validateAccount, trigger: 'blur' }]
})




const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            axios.post('/admin/login', {
                account: ruleForm.account,
                pwd: ruleForm.pass
            }).then(response => {
                if (response.status == 500) {
                    console.log("a")
                    ElNotification({
                        title: 'error',
                        message: response.status + '未知错误',
                        type: 'error',
                    })
                }
                if (response.data.code == -1) {
                    ElNotification({
                        title: 'error',
                        message: '账号或密码错误',
                        type: 'error',
                    })
                } else if (response.data.code == 200) {
                    ElNotification({
                        title: 'Success',
                        message: '登录成功',
                        type: 'success',
                    })
                    store.testA(response.data.data)
                    router.push({
                        path: '/main/main',
                    })
                }
                console.log(response.status)

            })

            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}



</script>

<style lang="scss" scoped>

</style>