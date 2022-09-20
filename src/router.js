import { createRouter, createWebHistory } from "vue-router";
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestReceived, meta: { accessibleTo: 'auth' } },
    { path: '/auth', component: UserAuth, meta: { accessibleTo: 'non-auth' } },
    { path: '/:notFound(.*)', component: NotFound },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.accessibleTo === 'auth' && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta && to.meta.accessibleTo === 'non-auth' && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next();
  }
})

export default router;