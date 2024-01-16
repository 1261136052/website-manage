<template>
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
    <el-table :data="data.data" style="width: 95%;height: 80%;">
        <el-table-column fixed prop="id" label="编号" width="200" />
        <el-table-column prop="cover" label="封面" width="120">
          <template #default="scope">
            <el-avatar shape="square" :size="100" fit="fit" :src="'http://127.0.0.1:8001' + scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="author" label="作者" width="180" />
        <el-table-column prop="publishDate" label="发布时间" width="200"/>
        <el-table-column prop="likeCount" label="喜欢数" width="120" />
        <el-table-column prop="commentCount" label="评论数" width="120" />
        <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                <el-button link type="primary" size="small"
                    @click="queryArticle(scope.$index, scope.row), dialogFormVisible = true">文章细节</el-button>

                <el-button link type="primary" size="small"
                    @click="data.articleId = scope.row.id,search2(), dialogTableVisible = true">文章评论</el-button>

                <el-button link type="primary" size="small"
                    @click="data.articleId = scope.row.id,search3(), dialogTableVisible2 = true">文章点赞</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum" :page-count="pageCount"
            @change="search()" />
    </div>


    <el-dialog v-model="dialogFormVisible" title="文章内容">
      <el-descriptions title="文章信息">
        <el-descriptions-item label="标题">{{ data.article.title }}</el-descriptions-item>
        <el-descriptions-item label="作者">{{ data.article.author }}
        </el-descriptions-item>
        <el-descriptions-item label="发布时间">{{ data.article.publishDate }}</el-descriptions-item>
        <el-descriptions-item label="文章类型">
          <el-tag size="small">{{ com }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="点赞数量">
          {{ data.article.likeCount }}
        </el-descriptions-item>

        <el-descriptions-item label="评论数量">
          {{ data.article.commentCount }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                              Province</el-descriptions-item> -->
      </el-descriptions>

      <div style="width: 560px;height: 350px;" v-html="data.article.content">

      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">退出</el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog v-model="dialogTableVisible" title="评论信息">
        <el-table :data="data.messages" table-layout="fixed">
            <el-table-column property="id" label="id" />
            <el-table-column property="articleId" label="文章id" />
            <el-table-column property="userId" label="用户id" />
            <el-table-column property="userName" label="用户名" />
            <el-table-column property="content" label="内容" />
            <el-table-column property="sendDate" label="发送日期" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click = "deleteComment(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum2" :page-count="pageCount2"
            @change="search2()" />
    </el-dialog>

        <el-dialog v-model="dialogTableVisible2" title="点赞信息">
        <el-table :data="data.likes" table-layout="fixed">
            <el-table-column property="articleId" label="文章id" />
            <el-table-column property="userId" label="用户id" />
            <el-table-column property="userName" label="用户名" />
            <el-table-column property="likeDate" label="点赞日期" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click = "deleteLike(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" v-model:current-page="pageNum3" :page-count="pageCount3"
            @change="search3()" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import axios from 'axios'
import { article, category2,likeDto } from "../../util/clazz"
import { message2 } from '../../util/WebSocket'
const dialogTableVisible = ref(false)
const dialogTableVisible2 = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
let categoryss: category2[] = []
let categorys = reactive({
    data: categoryss
})
const com = computed(() => {
  for (let i = 0; i < categorys.data.length; i++) {
    if (categorys.data[i].id == data.article.articleCategoryId) {
      return categorys.data[i].name
    }
  }
})
const categorylist = () => {
    axios.get('/article/categorys', {
  }).then(response => {
    if (response.data.code == 200) {
        categorys.data = response.data.data as category2[]
      console.log(response)
    }
  })
}
categorylist()

const queryArticle = (index,row)=>{
    axios.get('/article/load/' + row.id, {
  }).then(response => {
    if (response.data.code == 200) {
      data.article = response.data.data as article
    }
  })
}

let srcList: string[] = []
const articleAdd = new article()
const input1 = ref('')
const messages: message2[] = []
const articles: article[] = []
const likes: likeDto[] = []
const data = reactive({
    data: articles,
    article:articleAdd,
    articleId:-1,
    messages:messages,
    likes:likes
})
var pageCount = ref(0)
var pageNum = ref(1)
const search = () => {
    //   pageNum = 1
    axios.get('/article/list/' + pageNum.value + '/5', {
    params: {
      'keyword': input1.value,
    }
  }).then(response => {
    if (response.data.code == 200) {
      data.data = response.data.data.list as article[]
      pageCount.value = response.data.data.pager.pageCount
    }
  })
}
search()



var pageCount2 = ref(0)
var pageNum2 = ref(1)
const search2 = () => {
    //   pageNum = 1
    axios.get('/comment/query/'+ data.articleId +'/' + pageNum2.value + '/5', {
    params: {
    }
  }).then(response => {
    if (response.data.code == 200) {
      data.messages = response.data.data.list as message2[]
      pageCount2.value = response.data.data.pager.pageCount
    }
  })
}


var pageCount3 = ref(0)
var pageNum3 = ref(1)
const search3 = () => {
    //   pageNum = 1
    axios.get('/like/query/'+ data.articleId +'/' + pageNum3.value + '/5', {
    params: {
    }
  }).then(response => {
    if (response.data.code == 200) {
      data.likes = response.data.data.list as likeDto[]
      pageCount3.value = response.data.data.pager.pageCount
    }
  })
}
import { ElMessage, ElMessageBox } from 'element-plus'

const deleteArticle= (index, row) => {
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

            axios.get('/article/del/' + row.id, {
                params: {
                }
            }).then(response => {
                if (response.data.code == 200) {
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


const deleteComment= (index, row) => {
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

            axios.get('/comment/delete/' + row.id, {
                params: {
                }
            }).then(response => {
                if (response.data.code == 200) {
                    search2()
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


const deleteLike= (index, row) => {
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

            axios.get('/like/delete/' + row.articleId+'/'+row.userId, {
                params: {
                }
            }).then(response => {
                if (response.data.code == 200) {
                    search3()
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