module.exports={
  "title": "Waffle Map",
  "tagline": "Fantastic mesh renderer",
  "url": "https://dorayakikun.github.io/waffle-map/",
  "baseUrl": "/waffle-map/",
  "organizationName": "dorayakikun",
  "projectName": "waffle-map",
  "scripts": [
    "https://buttons.github.io/buttons.js"
  ],
  "favicon": "img/favicon.png",
  "customFields": {
    "repoUrl": "https://github.com/dorayakikun/waffle-map"
  },
  "onBrokenLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "/",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "../docs",
          "sidebarPath": "/sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": require.resolve("./src/css/customTheme.css"),
        }
      }
    ]
  ],
  "plugins": [
    [
      "@docusaurus/plugin-client-redirects",
      {
        "fromExtensions": [
          "html"
        ]
      }
    ]
  ],
  "themeConfig": {
    "navbar": {
      "title": "Waffle Map",
      "logo": {
        "src": "img/wafflemap.svg"
      },
      "items": [
        {
          "to": "docs/getting-started",
          "label": "Docs",
          "position": "left"
        },
        {
          "to": "docs/api",
          "label": "API",
          "position": "left"
        },
        {
          "to": "docs/guides",
          "label": "Guides",
          "position": "left"
        }
      ]
    },
    "image": "img/favicon.png",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2020 dorayakikun",
      "logo": {
        "src": "img/wafflemap.svg"
      }
    },
    "algolia": {
      "apiKey": "608c52525cab230bb2188506291b313b",
      "indexName": "waffle_map"
    }
  }
}