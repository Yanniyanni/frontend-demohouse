<template>
    <div class="tags-wrapper">
        <Common>
            <h3>分类</h3>
            <LabelList
                type="category"
                :current-tag="currentTag"
                @getCurrentTag="getCurrentTag"
            />

            <ArticalList
                :list="posts"
                :current-page="currentPage"
            />

            <Pagination
                class="Pagination"
                :total="posts.length"
                :current-page="currentPage"
                @getCurrentPage="getCurrentPage"
            />
        </Common>
    </div>
</template>

<script>
import Common from '@theme/components/Common';
import articals from '@theme/mixins/articals';
import { filterPosts, sortPostsByStickyAndDate } from '@theme/util/common'

export default {
    components: { Common },
    mixins: [articals],
    data() {
        return {
        };
    },
    computed: {
        // 时间降序后的博客列表
        posts () {
                let posts = this.$currentCategories.pages
                posts = filterPosts(posts)
                sortPostsByStickyAndDate(posts)
            return posts
        }
    }
};
</script>
<style lang="stylus">
.tags-wrapper
  max-width: 740px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;
  .label-list
    margin-bottom 30px
    .item
      font-size 16px
      padding 10px 20px
      margin 15px
@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 5rem 0.6rem 0;

</style>
