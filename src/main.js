import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueQuillTextEditor from 'vue-quill-text-editor';
import 'vue-quill-text-editor/dist/vue-quill-text-editor.esm.css';



let routes = [
    {
        path: "/", meta: {
            title: '登录'
        }, component: () => import('./views/Login.vue')
    },
    {
        path: "/main", meta: {
            title: '首页'
        }, component: () => import('./views/Main.vue'),children: [
            {
                path: "/main/user", meta: {
                    title: '用户列表'
                }, component: () => import('./views/mainViews/User.vue')
            },{
                path: "/main/userAttention", meta: {
                    title: '用户关注'
                }, component: () => import('./views/mainViews/UserAttention.vue')
            },{
                path: "/main/userChat", meta: {
                    title: '用户消息'
                }, component: () => import('./views/mainViews/UserChat.vue')
            },{
                path: "/main/goodsCategory", meta: {
                    title: '商品分类'
                }, component: () => import('./views/mainViews/GoodsCategory.vue')
            },{
                path: "/main/articleCategory", meta: {
                    title: '文章分类'
                }, component: () => import('./views/mainViews/ArticleCategory.vue')
            },{
                path: "/main/order", meta: {
                    title: '商品订单'
                }, component: () => import('./views/mainViews/Order.vue')
            },{
                path: "/main/goods", meta: {
                    title: '商品列表'
                }, component: () => import('./views/mainViews/Goods.vue')
            },{
                path: "/main/article", meta: {
                    title: '文章列表'
                }, component: () => import('./views/mainViews/Article.vue')
            },]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 设置导航守卫，在路由切换之前设置网页标题
router.beforeEach((to, from, next) => {
    // 设置网页标题为路由的 meta.title 或默认值
    document.title = to.meta.title || 'My App';
    next(); // 继续路由导航
});

let app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(VueQuillTextEditor);
// 设置基础访问路径
axios.defaults.baseURL = 'http://127.0.0.1:8001/'
app.use(VueAxios, axios)
app.config.globalProperties.$axios = axios
app.mount('#app')





