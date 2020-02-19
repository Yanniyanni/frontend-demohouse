module.exports = {
    title: '我爱学习',
    description: 'Just playing around',
    head: [
        // add jquert and fancybox
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
    ],
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: '首页', link: '/' },
            { text: '分类', link: '/categories/frontend/' },
            { text: '标签', link: '/tag/' },
            { text: '归档', link: '/timeline/' },
        ],
        sidebar: {
        },
        repo: 'Yanniyanni',
        repoLabel: 'GitHub',
        lastUpdated: '上次更新时间',
        author: '神经衰弱羊',
        authorAvatar: '/avatar.png'
    }
};
