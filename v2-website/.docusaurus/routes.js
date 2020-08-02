
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/waffle-map/',
  component: ComponentCreator('/waffle-map/','609'),
  exact: true,
},
{
  path: '/waffle-map/__docusaurus/debug',
  component: ComponentCreator('/waffle-map/__docusaurus/debug','b80'),
  exact: true,
},
{
  path: '/waffle-map/blog',
  component: ComponentCreator('/waffle-map/blog','f40'),
  exact: true,
},
{
  path: '/waffle-map/blog/2018/05/14/v1.20.0',
  component: ComponentCreator('/waffle-map/blog/2018/05/14/v1.20.0','bbd'),
  exact: true,
},
{
  path: '/waffle-map/blog/2018/08/04/v1.21.0',
  component: ComponentCreator('/waffle-map/blog/2018/08/04/v1.21.0','ce2'),
  exact: true,
},
{
  path: '/waffle-map/search',
  component: ComponentCreator('/waffle-map/search','225'),
  exact: true,
},
{
  path: '/waffle-map/docs',
  component: ComponentCreator('/waffle-map/docs','65a'),
  
  routes: [
{
  path: '/waffle-map/docs/',
  component: ComponentCreator('/waffle-map/docs/','441'),
  exact: true,
},
{
  path: '/waffle-map/docs/api',
  component: ComponentCreator('/waffle-map/docs/api','59c'),
  exact: true,
},
{
  path: '/waffle-map/docs/guides',
  component: ComponentCreator('/waffle-map/docs/guides','6c1'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
