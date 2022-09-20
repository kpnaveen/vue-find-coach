export default {
  getUserId(state) {
    return state.userId
  },
  getToken(state) {
    return state.token
  },
  isAuthenticated(state) {
    return !!state.token
  },
  isAutoLoggedOut(state) {
    return state.autoLoggedout;
  }
}