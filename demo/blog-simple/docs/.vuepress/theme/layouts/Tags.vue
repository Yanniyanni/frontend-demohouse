<template>
    <div class="tags-wrapper">
        <Common>
            <h3>标签</h3>
            <LabelList
                type="tag"
                :current-tag="currentTag"
                @getCurrentTag="getCurrentTag"
            />

            <ArticalList
                :list="$articals"
                :current-page="currentPage"
            />

            <Pagination
                class="Pagination"
                :total="$articals.length"
                :current-page="currentPage"
                @getCurrentPage="getCurrentPage"
            />
        </Common>
    </div>
</template>

<script>
import Common from '@theme/components/Common';
import articals from '@theme/mixins/articals';

export default {
    components: { Common },
    mixins: [articals]
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
