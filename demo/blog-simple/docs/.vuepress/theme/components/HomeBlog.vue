<template>
    <main
        class="home-blog"
        aria-labelledby="main-title"
    >
        <!-- 自定义部分开始 -->
        <header class="hero">
            <img class="home-banner-img" src="/banner.png"/>
            <div class="banner-content">
              <div class="title">好记性不如烂笔头</div>
              <div class="desc">Stay hungry Stay foolish</div>
              
            </div>
        </header>

        <div class="home-blog-wrapper">
            <div class="blog-list">
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
            </div>
            <div class="info-wrapper">
                <PersonalInfo />
                <h4><i class="iconfont icon-category"></i> 分类</h4>
                <!-- <LabelList type="category" actionType="link"></LabelList> -->
                <ul class="category-wrapper">
                    <li
                        v-for="(item, index) in this.$categories.list.slice(1, this.$categories.list.length)"
                        :key="index"
                        class="category-item"
                    >
                        <router-link :to="item.path">
                            <span class="category-name">{{ item.name | formatTag }}</span>
                            <span
                                class="post-num"
                                :style="{ 'backgroundColor': getOneColor() }"
                            >{{ item.pages.length }}</span>
                        </router-link>
                    </li>
                </ul>
                <hr>
                <h4><i class="iconfont icon-tag"></i> 标签</h4>
                <LabelList
                    type="tag"
                    action-type="link"
                />
            </div>
        </div>
        <!-- 自定义部分结束 -->
        <div
            v-if="data.footer"
            class="footer"
        >
            {{ data.footer }}
        </div>
    </main>
</template>

<script>
import PersonalInfo from '@theme/components/PersonalInfo';
import articals from '@theme/mixins/articals';
import { getOneColor } from '@theme/util/common';

export default {
    components: { PersonalInfo },
    mixins: [articals],
    data() {
        return {
        };
    },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText
            };
        }
    },
    methods: {
        getOneColor
    }
};
</script>

<style lang="stylus">
.home-blog
  padding: $navbarHeight 0 0;
  margin: 0px auto;
  .hero
    text-align center
    position relative
    img
      max-width: 100%
      max-height 400px
      display block
    .banner-content
      font-size 30px
      color #ffffff
      position:absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .title
        letter-spacing: 10px
      .desc
        font-size 16px
        margin-top 10px
        letter-spacing 5px
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobileNarrow)
  .home-blog
    padding-left 1.5rem
    padding-right 1.5rem
</style>
<style lang="stylus">
.home-banner-img 
  width 100%
  height 100%
.home-blog-wrapper {
  display flex
  align-items: flex-start;
  margin 20px auto 0
  max-width 1126px
  .blog-list {
    flex auto
    width 0
    .abstract-wrapper {
      .abstract-item:last-child {
        margin-bottom: 0px;
      }
    }
  }
  .info-wrapper {
    position: -webkit-sticky;
    position: sticky;
    top: 70px;
    transition all .3s
    margin-left 15px;
    flex 0 0 300px
    height auto;
    box-shadow 0 1px 6px 0 rgba(0, 0, 0, .2)
    border-radius $borderRadius
    box-sizing border-box
    padding 0 15px 20px 15px;
    h4 {
      color #888
      font-size 15px
      font-weight normal
    }
    .category-wrapper {
      list-style none
      padding-left 0
      .category-item {
        margin-bottom .4rem
        padding: .4rem .8rem;
        transition: all .5s
        border-radius $borderRadius
        box-shadow 0 1px 6px 0 rgba(0, 0, 0, .2)
        &:hover {
          transform scale(1.04)
        }
        a {
          display flex
          justify-content: space-between
          .post-num {
            width 1.6rem;
            height 1.6rem
            text-align center
            line-height 1.6rem
            border-radius 4px
            background #eee
            font-size .6rem
            color #fff
          }
        }
      }
    }
  }
}
@media (max-width: $MQMobile) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}
</style>
