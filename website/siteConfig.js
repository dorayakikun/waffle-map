const siteConfig = {
  title: 'Waffle Map' /* title for your website */,
  tagline: 'Fantastic mesh renderer',
  url: 'https://dorayakikun.github.io/waffle-map/' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'waffle-map',
  organizationName: 'dorayakikun',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  headerIcon: 'img/docusaurus.svg', // FIXME
  footerIcon: 'img/docusaurus.svg', // FIXME
  favicon: 'img/favicon.png',           // FIXME
  colors: {
    primaryColor: '#2E8555',
    secondaryColor: '#205C3B',
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' dorayakikun',
  highlight: {
    theme: 'default',
  },
  // FIXME Add the algolia settings
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  repoUrl: 'https://github.com/dorayakikun/waffle-map',
};

module.exports = siteConfig;
