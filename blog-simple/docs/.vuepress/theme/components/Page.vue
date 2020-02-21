<template>
    <div>
        <main class="page">
            <slot name="top" />

            <div class="page-title">
                <h1>{{ $page.title }}</h1>
                <hr>
                <PageInfo :page-info="$page" />
            </div>

            <Content class="theme-default-content" />
            <PageEdit />

            <PageNav v-bind="{ sidebarItems }" />

            <slot name="bottom" />
        </main>
        <Comments v-show="isShowComments" />
    </div>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';
import Comments from '@theme/components/Comments';
import PageInfo from '@theme/components/PageInfo';

export default {
    components: { PageEdit, PageNav, Comments, PageInfo },
    props: ['sidebarItems'],
    data() {
        return {
            isShowComments: true
        };
    },
    watch: {
        '$route'(to, from) {
            if (to.path !== from.path) {
                this.initData();
            }
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            if (this.$frontmatter.isShowComments === false) {
                this.isShowComments = false;
            } else {
                this.isShowComments = true;
            }
        }
    }
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-top 5rem
  padding-bottom 2rem
  display block
  .page-title
    max-width: 740px;
    margin: 0 auto;
    padding: 1rem 2.5rem;
    color var(--text-color)
@media (max-width: $MQMobile)
  .page-title
    padding: 0 1rem;

</style>
