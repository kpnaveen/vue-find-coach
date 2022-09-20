export default {
  getRequests(state) {
    return state.requests;
  },
  hasRequests(_, getters) {
    return getters.getCurrentUserRequests.length > 0
  },
  getCurrentUserRequests(_, getters, _2, rootGetters) {
    const currentUserId = rootGetters.getUserId;
    const requests = getters.getRequests;
    return requests.filter((req) => req.coachId === currentUserId);
  }
}