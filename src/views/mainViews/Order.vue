<template>
    <div style="width: 1000px;height: 50px;background-color: white;line-height: 50px;display: flex;">
        <div style="margin-right: 20px;">
            <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
        </div>
        <div>
            <!-- <el-select v-model="value" class="m-2" placeholder="Select">
                <el-option v-for="item in categorys.data" :key="item.categoryName" :label="item.categoryName"
                    :value="item.id" />
            </el-select> -->
        </div>
        <div>
            <el-button type="primary" @click="search()">
                搜索
            </el-button>
        </div>
    </div>
    <el-table :data="data.data" style="width: 95%;height: 80%;">
        <el-table-column fixed prop="id" label="编号" width="150" />
        <el-table-column prop="goodsId" label="商品id" width="120" />
        <el-table-column prop="title" label="商品名" width="120" />
        <el-table-column prop="buyerId" label="买家id" width="120" />
        <el-table-column prop="buyerPhone" label="买家电话" width="120" />
        <el-table-column prop="buyer" label="买家" width="120" />
        <el-table-column prop="vendor" label="卖家id" width="120" />
        <el-table-column prop="vendorId" label="卖家" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteOrder(scope.$index, scope.row)">删除</el-button>
                <el-button link type="primary" size="small"
                    @click="queryGoods(scope.$index, scope.row), dialogFormVisible = true">商品细节</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum" :page-count="pageCount"
            @change="search()" />
    </div>


    <el-dialog v-model="dialogFormVisible" title="商品详细页" style="height: 650px;" width="600px">
        <!-- <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150" />
                <el-table-column property="name" label="Name" width="200" />
                <el-table-column property="address" label="Address" />
            </el-table> -->

        <div style="height: 480px;width: 560px;">
            <!-- <div style="width: 560px;height: 380px;">
                    <div style="width: 560px;height: 25px;">
                        <span>(售卖者：</span><span>{{ goods.data.userName }} ) </span>
                        <span>(价钱：￥</span><span>{{ goods.data.price }})</span>
                        <span>(商品类型：</span><span>{{ com }})</span>
                    </div>
                    <div style="width: 560px;height: 300px;">
                    </div>
                    <div style="width: 560px;height: 55px;">
                        <div>
                            交易地点：{{ goods.data.transactionAddress }}
                        </div>
                        <div>
                            交易时间：{{ goods.data.transactionDate }}

                        </div>
                    </div>
                </div> -->
            <el-descriptions title="Goods Info">
                <el-descriptions-item label="售卖者：">{{ goods.data.userName }}</el-descriptions-item>
                <el-descriptions-item label="价钱：￥">{{ goods.data.price }}</el-descriptions-item>
                <el-descriptions-item label="商品类型：">
                    <el-tag size="small">{{ com }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="交易地点：">{{ goods.data.transactionAddress }}</el-descriptions-item>
                <el-descriptions-item label="交易时间：">{{ goods.data.transactionDate }}</el-descriptions-item>
            </el-descriptions>
            <div style="width: 560px;height: 250px;">
                <div style="width: 560px;height: 250px;">
                    <p>商品描述：{{ goods.data.content }}</p>
                </div>
            </div>
            <div style="width: 560px;height: 100px;display: flex;flex-wrap: wrap;">
                <div class="demo-image__preview" style="width: 100px; height: 100px; margin: 5px;"
                    v-for="(g, index) in goods.data.files" :key="index">
                    <el-image style="width: 100px; height: 100px" :src="'http://127.0.0.1:8001' + g.path" :zoom-rate="1.2"
                        :preview-src-list="goods.srcList" :initial-index="4" fit="cover" />
                </div>
            </div>
        </div>
        <template #footer>
            <!-- <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">退出</el-button>
                    <el-button type="warning" @click="dialogFormVisible = false, buyGoods()">
                        购买
                    </el-button>
                    <el-button type="primary" @click="dialogFormVisible = false, open()">
                        聊一句吧
                    </el-button>
                </span> -->
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import axios from 'axios'
import { GoodsOrderDto, Goods, category } from "../../util/clazz"


const dialogFormVisible2 = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const value = ref('')
const form = reactive({
    id: -1,
    userName: '',
    account: '',
    pwd: '',
})
let categoryss: category[] = []
let categorys = reactive({
    data: categoryss
})
const com = computed(() => {
    for (let i = 0; i < categorys.data.length; i++) {
        if (categorys.data[i].id == goods.data.categoryId) {
            return categorys.data[i].categoryName
        }
    }
})
const categorylist = () => {
    axios.get('/goods/listGoodsCategory', {
    }).then(response => {
        if (response.data.code == 200) {
            categorys.data = response.data.data
            console.log(categorys)

        }
    })
}
const queryGoods = (scope, row) => {
    axios.get('/goods/queryGoodsById/' + row.goodsId, {
    }).then(response => {
        if (response.data.code == 200) {
            goods.data = response.data.data
            goods.srcList = []
            for (let i = 0; i < goods.data.files.length; i++) {
                let s = 'http://127.0.0.1:8001' + goods.data.files[i].path
                goods.srcList.push(s)
            }
            console.log(goods.category)
            console.log(goods.srcList)
            console.log(goods.data.files)
        }
    })
}



categorylist()


let srcList: string[] = []
let good: Goods = new Goods
let goods = reactive({
    data: good,
    srcList: srcList,
    category: ''
})


const input1 = ref('')

const users: GoodsOrderDto[] = []
const data = reactive({
    data: users
})
var pageCount = ref(0)
var pageNum = ref(1)
const search = () => {
    //   pageNum = 1
    axios.get('/order/listOrder/' + pageNum.value + '/14', {
        params: {
            'keyword': input1.value,
            // 'categoryId':value.value
        }
    }).then(response => {
        if (response.data.code == 200) {
            data.data = response.data.data.list as GoodsOrderDto[]
            pageCount.value = response.data.data.pager.pageCount
        }
    })
}
search()

import { ElMessage, ElMessageBox } from 'element-plus'

const deleteOrder = (index, row) => {
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

            axios.get('/order/deleteOrder/' + row.id, {
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