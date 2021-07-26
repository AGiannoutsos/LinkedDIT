
const routes = [
  {
    path: '/app',
    name: "app front page",
    redirect: { name: 'wall' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'wall',
        component: () => import('pages/WallPage.vue'),
        name: "wall" },
      { path: 'network',
        component: () => import('pages/NetworkPage.vue'),
        name: "network" },
      { path: 'adverts',
        component: () => import('pages/AdvertsPage.vue'),
        name: "adverts" },
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

    // <q-route-tab to="/wall" label="Wall" />
    // <q-route-tab to="/network" label="Network" />
    // <q-route-tab to="/adverts" label="Adverts" />
    // <q-route-tab to="/discussions" label="Discussions" />
    // <q-route-tab to="/notifications" label="Notifications" />
    // <q-route-tab to="/personal_data" label="Personam Data" />
    // <q-route-tab to="/settings" label="Settings" />

  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', 
        component: () => import('pages/FrontPage.vue'),
        name: "front page",  },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
