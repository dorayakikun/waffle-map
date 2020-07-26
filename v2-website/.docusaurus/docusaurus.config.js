export default {
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
          "homePageId": "getting-started",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "../docs",
          "sidebarPath": "/sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "/Users/tomohidetakao/go/src/github.com/dorayakikun/waffle-map/v2-website/src/css/customTheme.css"
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
          "to": "docs/",
          "label": "Docs",
          "position": "left"
        },
        {
          "to": "docs/api",
          "label": "API",
          "position": "left"
        }
      ],
      "hideOnScroll": false
    },
    "image": "img/favicon.png",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2020 dorayakikun",
      "logo": {
        "src": "img/wafflemap.svg"
      },
      "style": "light"
    },
    "algolia": {
      "apiKey": "608c52525cab230bb2188506291b313b",
      "indexName": "waffle_map"
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false
    }
  },
  "themes": []
};