export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isUserCoach(_, getters, _2, rootGetters) {
    const userId = rootGetters.getUserId;
    const coaches = getters.coaches;
    return coaches.some(coach => coach.id === userId)
  },
  getLastFetch(state) {
    return state.lastFetch;
  },
  shouldFetch(state) {
    if(!state.lastFetch) {
      return true
    } else  {
      return (new Date().getTime() - state.lastFetch)/1000 > 60
    }
  }
}