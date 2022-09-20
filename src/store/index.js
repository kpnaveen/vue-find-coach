import { createStore } from "vuex";

import coachesModule from './modules/coaches';
import requestModule from './modules/requests';
import authModule from './modules/auth';

const store = createStore({
  modules: {
    coach: coachesModule,
    request: requestModule,
    auth: authModule
  }
});

export default store;