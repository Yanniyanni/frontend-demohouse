<template>
    <div class="label-list">
        <span
            v-for="(item, index) in list"
            :key="index"
            class="item"
            :class="{'active': item.name == currentTag}"
            :style="{ 'backgroundColor': getOneColor() }"
            @click="tagClick(item)"
        >{{ item.name | formatTag }}</span>
    </div>
</template>

<script>
import { getOneColor } from '@theme/util/common';

export default {
    props: {
        type: {
            type: String,
            default: 'tag'
        },
        actionType: {
            type: String,
            default: ''
        },
        currentTag: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            list: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        getOneColor,
        init() {
            if (this.type === 'tag') {
                this.list = [{ name: 'tags', path: '/tag/' }, ...this.$tags.list];
            } else {
                const len = this.$categories.list.length;
                this.list = this.$categories.list.slice(1, len);
            }
        },
        tagClick(tag) {
            if (this.actionType === 'link') {
                this.$router.push({ path: tag.path });
            } else {
                this.$emit('getCurrentTag', tag);
            }
        },
    }
};
</script>
<style lang="stylus" scoped>
@require '~@theme/styles/iconfont.css'

.label-list
    .item
        display: inline-block;
        margin 8px
        padding 5px 10px
        border-radius 4px
        font-size 14px
        line-height 1
        color: #fff;
        cursor: pointer;
        transition: all .5s
        &:hover
            transform scale(1.05)
        &.active
            transform scale(1.2)
            border 2px dashed #000

</style>
