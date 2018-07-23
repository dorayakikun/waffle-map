const siteConfig = {
  title: 'Waffle Map' /* title for your website */,
  tagline: 'Fantastic mesh renderer',
  url: 'https://dorayakikun.github.io/waffle-map/' /* your website url */,
  baseUrl: '/waffle-map/' /* base url for your project */,
  projectName: 'waffle-map',
  organizationName: 'dorayakikun',
  headerLinks: [
    { search: true },
    { doc: 'getting-started', label: 'Docs' },
    { doc: 'api', label: 'API' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],
  headerIcon: 'img/wafflemap.svg',
  footerIcon: 'img/wafflemap.svg',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#FF9100',
    secondaryColor: '#FF6D00',
  },
  copyright: 'Copyright © ' + new Date().getFullYear() + ' dorayakikun',
  highlight: {
    theme: 'default',
  },
  algolia: {
    apiKey: "608c52525cab230bb2188506291b31",
    indexName: "waffle_map"
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  ogImage: 'img/favicon.png',
  twitterImage: 'img/favicon.png',
  repoUrl: 'https://github.com/dorayakikun/waffle-map',
}

module.exports = siteConfig
