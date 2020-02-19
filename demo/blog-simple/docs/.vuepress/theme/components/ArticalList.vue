<template>
    <div class="artical-list">
        <div
            v-for="(item, index) in currentPageData"
            :key="index"
            class="artical"
        >
            <router-link :to="item.path">
                <div class="title">
                    {{ item.title }}
                </div>
                <hr class="hr">
            </router-link>
            <div
                class="abstract"
                v-html="item.excerpt"
            ></div>
            <PageInfo
                :page-info="item"
                :current-tag="currentTag"
                :show-access-number="false"
            />
        </div>
    </div>
</template>
<script>
import PageInfo from '@theme/components/PageInfo';
export default {
    components: { PageInfo },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        currentPage: {
            type: Number,
            default: 1
        },
        currentTag: {
            type: String,
            default: ''
        }
    },
    computed: {
        currentPageData() {
            // const start = this.currentPage * 10 - 10
            // const end = this.currentPage * 10
            const start = this.currentPage * 5 - 5;
            const end = this.currentPage * 5;
            return this.list.slice(start, end);
        }
    }
};
</script>
<style lang="stylus" scoped>
.artical-list
    .artical
        margin: 0 auto 20px;
        padding: 16px 20px;
        border-radius: .25rem;
        box-sizing: border-box;
        box-shadow 0 1px 6px 0 rgba(0, 0, 0, .2)
</style>
