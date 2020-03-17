import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue';
import postmanSimple from './components/request.vue';


Vue.use(ElementUI)
Vue.use(VueRouter);

// // 路由
const routes = [
    { path: '/', component: postmanSimple }
]
const router = new VueRouter({
    routes
})

new Vue({
    el: '#app2',
    render: h => h(App),
    router
});

export default postmanSimple


