let timer = null;

export default {
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    }) 
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })    
  },
  async auth(context, payload) {
    const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    if(payload.mode === 'signup') {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }
    const res = await fetch(authUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        returnSecureToken: true
      })
    });
    if(!res.ok) {
      let error = 'Signin failed';
      if (payload.mode === 'signup') {
        error = 'Signup failed'
      }
      throw new Error(error);
    }
    const response = await res.json();
    const expiresAt = new Date().getTime() + (response.expiresIn * 1000)
    localStorage.setItem('token', response.idToken)
    localStorage.setItem('userId', response.localId);
    localStorage.setItem('tokenExpiry', expiresAt);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, +response.expiresIn * 1000)

    context.commit('setAuth',{
      userId: response.localId,
      token: response.idToken,
      autoLoggedout: false
    })
  },
  logout(context) {
    clearTimeout(timer);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    context.commit('setAuth', {
      userId: null,
      token: null,
    })
  },
  tryAutoLogin(context) {
    const userId = localStorage.getItem('userId') || null;
    const token = localStorage.getItem('token') || null;
    const expiresAt = localStorage.getItem('tokenExpiry');
    if (expiresAt && +expiresAt - new Date().getTime() < 0) {
      context.dispatch('autoLogout')
    }
    if(userId && token) {
      context.commit('setAuth', {
        userId,
        token
      })
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('autoLoggedOut')
  }
}