export default {
  setAuth(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.expiresIn = payload.expiry;
    state.autoLoggedout = payload.autoLoggedout || false;
  },
  autoLoggedOut(state) {
    state.autoLoggedout = true
  }
}