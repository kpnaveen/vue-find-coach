import mutations from './mutation.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      autoLoggedout: false,
    }
  },
  mutations,
  actions,
  getters
}