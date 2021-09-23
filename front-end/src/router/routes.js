
const routes = [
  {
    path: '/app',
    name: "app front page",
    redirect: { name: 'wall' },
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'wall',
        component: () => import('pages/WallPage.vue'),
        name: "wall" },
      { path: 'network',
        component: () => import('pages/NetworkPage.vue'),
        name: "network" },
      { path: 'proposals',
        component: () => import('src/pages/ProposalsPage.vue'),
        name: "proposals" },
      { path: 'discussions',
        component: () => import('pages/DiscussionsPage.vue'),
        name: "discussions" },
      { path: 'notifications',
        component: () => import('pages/NotificationsPage.vue'),
        name: "notifications" },
      { path: 'personal_data',
        component: () => import('pages/PersonalDataPage.vue'),
        name: "personal data" },
      { path: 'settings',
        component: () => import('pages/SettingsPage.vue'),
        name: "settings" },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', 
        component: () => import('pages/FrontPage.vue'),
        name: "front page",  },
    ]
  },
  {
    path: '/app/admin',
    meta: { authAdmin: true },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', 
        component: () => import('pages/AdminPage.vue'),
        name: "admin page",  },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: "error",
    component: () => import('pages/Error404.vue')
  }
]

export default routes
