export default {
  async addRequest(context, payload) {
    const data = {
      userEmail: payload.email,
      coachId: payload.coachId,
      message: payload.message
    }
    const res = await fetch(`https://auth-test-production-2c40b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) {
      // error
    }
    const response = await res.json();
    context.commit('addRequest', {...data, id: response.name});
  },
  async getRequests(context) {
    const userId = context.rootGetters.getUserId;
    const token = context.rootGetters.getToken;
    const res = await fetch(`https://auth-test-production-2c40b-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`);
    if(!res.ok) {
      // error handle
    }
    const response = await res.json();
    const requests = [];
    for(let key in response) {
      requests.push({
        id: key,
        ...response[key]
      })
    }
    context.commit('setRequests', requests)
  }
}