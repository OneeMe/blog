module.exports = {
    title: 'Onee\'s Blog',
    description: 'Onee\'s Blog',
    theme: '@vuepress/theme-blog',
    chainWebpack: config => {
        config.module.rules.delete('images')
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                // You options here, default options:
                // limit: 10000,
                // name: `assets/img/[name].[hash:8].[ext]`
            })
    },
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
