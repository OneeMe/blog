module.exports = {
    title: 'Onee\'s Blog',
    description: 'Onee\'s Blog',
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
