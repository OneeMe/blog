module.exports = {
    title: 'Onee\'s Blog',
    description: 'Onee\'s Blog',
    theme: '@vuepress/theme-blog',
    themeConfig: {
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
    }
}
