<template>
    <div class="comments-wrap">
        <div id="vcomments"></div>
    </div>
</template>

<script>
export default {
    name: 'comments',
    watch: {
        '$route'(to, from) {
            if (to.path !== from.path) {
                // 切换页面时刷新评论
                setTimeout(() => {
                    this.initValine();
                }, 300);
            }
        }
    },
    mounted: function () {
        this.initValine();
    },
    methods: {
        initValine() {
            const Valine = require('valine');
            const AV = require('leancloud-storage');
            const valineOptions = {
                el: '#vcomments',
                appId: '', // your appId
                appKey: '', // your appKey
                placeholder: 'just go go',
                notify: false,
                verify: false,
                avatar: 'monsterid',
                visitor: true, // 文章阅读量统计
                recordIP: false,
                path: window.location.pathname
            };

            if (typeof window !== 'undefined') {
                this.window = window;
                window.AV = AV;
            }

            new Valine(valineOptions);
        }
    }
};
</script>
<style lang="stylus" scoped>
.comments-wrap
    padding: 2rem 2rem 2rem 22rem;
    max-width: 740px;
    margin: 0 auto;

</style>
