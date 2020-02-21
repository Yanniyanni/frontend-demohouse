import { filterPosts, sortPostsByStickyAndDate, sortPostsByDate } from '@theme/util/common'

export default {
    filters: {
        formatTag(value) {
            let name = value;
            switch (value) {
            case 'tags':
                name = '全部';
                break;
            case 'frontend':
                name = '前端';
                break;
            case 'backend':
              name = '后端';
              break;
            }
            return name;
        }
    },
    computed: {
        $articals () {
          const {
            $categories: { list: articles }
          } = this
    
          let posts = articles.reduce((allData, currnetData) => {
                // 排除articles
                if (currnetData.name === 'articles') {
                    return []
                }
                return [...allData, ...currnetData.pages]
          }, [])
          posts = filterPosts(posts)
          sortPostsByStickyAndDate(posts)
          return posts
        },
        $articalsForTimeline () {
          let pages = this.$articals
          const formatPages = {}
          const formatPagesArr = []
          pages = filterPosts(pages, true)
          this.pages = pages.length == 0 ? [] : pages
          for (let i = 0, length = pages.length; i < length; i++) {
            const page = pages[i]
            const pageDateYear = dateFormat(page.frontmatter.date, 'year')
            if (formatPages[pageDateYear]) formatPages[pageDateYear].push(page)
            else {
              formatPages[pageDateYear] = [page]
            }
          }
    
          for (const key in formatPages) {
                const data = formatPages[key]
                sortPostsByDate(data)
                formatPagesArr.unshift({
                    year: key,
                    data
                })
          }
    
          return formatPagesArr
        }
      }
};

function renderTime (date) {
    var dateee = new Date(date).toJSON()
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
}

function dateFormat (date, type) {
    date = renderTime(date)
    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const mon = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    if (type == 'year') return year
    else return `${mon}-${day}`
  }
  
