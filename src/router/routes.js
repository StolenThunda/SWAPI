const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/films', component: () => import('src/pages/CategoryCarousel.vue') },
      { path: '/characters', component: () => import('pages/CategoryCarousel.vue') },
      { path: '/starships', component: () => import('pages/CategoryCarousel.vue') },
      { path: '/species', component: () => import('pages/CategoryCarousel.vue') },
      { path: '/planets', component: () => import('pages/CategoryCarousel.vue') },
      { path: '/vehicles', component: () => import('pages/CategoryCarousel.vue') },
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
