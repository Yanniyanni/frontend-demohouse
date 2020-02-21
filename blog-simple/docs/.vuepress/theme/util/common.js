export function formatDate(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
    time = time.replace(/-/g, '/');
    const date = new Date(time);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length);
    }

    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    for (const key in o) {
        if (RegExp(`(${key})`).test(fmt)) {
            const str = o[key] + '';
            fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : '0' + str);
        }
    }
    return fmt;
}

export function getOneColor() {
    const tagColorArr = [
        '#e15b64',
        '#f47e60',
        '#f8b26a',
        '#abbd81',
        '#849b87',
        '#e15b64',
        '#f47e60',
        '#f8b26a',
        '#f26d6d',
        '#67cc86',
        '#fb9b5f',
        '#3498db'
    ];
    const index = Math.floor(Math.random() * tagColorArr.length);
    return tagColorArr[index];
}

// 过滤博客数据
export function filterPosts (posts, isTimeline) {
    posts = posts.filter(item => {
      const { title, frontmatter: { home, date, publish }} = item
      return isTimeline === true
        ? !(home == true || title == undefined || date === undefined || publish === false)
        : !(home == true || title == undefined || publish === false)
    })
    return posts
}
  
// 排序博客数据
export function sortPostsByStickyAndDate (posts) {
    posts.sort((prev, next) => {
      const prevSticky = prev.frontmatter.sticky
      const nextSticky = next.frontmatter.sticky
      if (prevSticky && nextSticky) {
        return prevSticky == nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky)
      } else if (prevSticky && !nextSticky) {
        return -1
      } else if (!prevSticky && nextSticky) {
        return 1
      }
      return compareDate(prev, next)
    })
}
  
export function sortPostsByDate (posts) {
    posts.sort((prev, next) => {
      return compareDate(prev, next)
    })
}

// 获取时间的数字类型
export function getTimeNum (date) {
    return new Date(date.frontmatter.date).getTime()
  }
  
// 比对时间
export function compareDate (a, b) {
    return getTimeNum(b) - getTimeNum(a)
}

export function renderTime (date) {
    var dateee = new Date(date).toJSON()
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
  }

export function dateFormat (date, type) {
    date = renderTime(date)
    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const mon = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    if (type == 'year') return year
    else return `${mon}-${day}`
}