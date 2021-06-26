module.exports = {
    title: 'Onee\'s Blog',
    head: [
        ['link', { rel: 'icon', href: '/icon.png' }]
    ],
    description: 'Onee\'s Blog',
    theme: '@vuepress/theme-blog',
    themeConfig: {
        feed: {
            rss: true,
            canonical_base: 'https://onee.me'
        },
        pwa: true,
        dateFormat: 'YYYY-MM-DD',
        nav: [
            {
                text: 'Timeline',
                link: '/',
            },
            {
                text: 'Skill',
                link: '/skill/',
            },
            {
                text: 'About',
                link: '/about/',
            },
        ]
    },
}
