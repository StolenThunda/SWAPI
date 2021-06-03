const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/films', component: () => import('src/pages/CategoryWrapper.vue') },
      { path: '/characters', component: () => import('src/pages/CategoryWrapper.vue') },
      { path: '/starships', component: () => import('src/pages/CategoryWrapper.vue') },
      { path: '/species', component: () => import('src/pages/CategoryWrapper.vue') },
      { path: '/planets', component: () => import('src/pages/CategoryWrapper.vue') },
      { path: '/vehicles', component: () => import('src/pages/CategoryWrapper.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
