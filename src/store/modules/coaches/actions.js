export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.getUserId;
    const data = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.area
    }
    const token = context.rootGetters.getToken;
    const res = await fetch(`https://auth-test-production-2c40b-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    if(res.ok){
      context.commit('addCoach', {
        ...data,
        id: userId
      })
    }
  },
  async getCoaches(context, payload) {
    const shouldFetch = context.getters.shouldFetch;
    if (!shouldFetch && !payload.forceFetch) {
      return
    }
    const res = await fetch(`https://auth-test-production-2c40b-default-rtdb.firebaseio.com/coaches.json`);
    if (!res.ok) {
      throw new Error('Failed to fetch coaches');
    }
    const response = await res.json();
    const coaches = [];
    for(let key in response ) {
      const obj = {
        id: key,
        ...response[key]
      }
      coaches.push(obj);
    }
    context.commit('setCoaches', coaches)
  }
}