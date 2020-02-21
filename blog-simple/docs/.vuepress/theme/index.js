module.exports = {
    extend: '@vuepress/theme-default',
    plugins: [
        ['@vuepress/plugin-blog', {
            permalink: '/:regular',
            frontmatters: [
                {
                    id: 'tags',
                    keys: ['tags'],
                    path: '/tag/',
                    layout: 'Tags',
                    scopeLayout: 'Tag'
                },
                {
                    id: 'categories',
                    keys: ['categories'],
                    path: '/categories/',
                    layout: 'Category',
                    scopeLayout: 'Category'
                },
                {
                    id: 'timeline',
                    keys: ['timeline'],
                    path: '/timeline/',
                    layout: 'TimeLines',
                    scopeLayout: 'TimeLine'
                }
            ]
        }],
    ]
};
