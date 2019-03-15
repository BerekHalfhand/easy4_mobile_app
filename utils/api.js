
export default class Api {
  static login = (
    login,
    password
  ) => {
    console.log('api/login');

    return fetch('https://mp.api.easy4.pro/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password
      }),
    }).then(response => response.json());
  }

  static signup = (
    firstName,
    secondName,
    lastName,
    email,
    phone,
    password
  ) => {
    console.log('api/signup');

    return fetch('https://mp.api.easy4.pro/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        secondName: secondName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
      }),
    }).then(response => response.json());
  }

  static userInfo = (token) => {
    console.log('api/userInfo');

    return fetch('https://mp.api.easy4.pro/user/info', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response => response.json());
  }

  static msisdns = (token) => {
    console.log('api/msisdns');

    return fetch('https://mp.api.easy4.pro/external/msisdns', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response => response.json());
  }

  static balance = (phone) => {
    console.log('api/balance');

    return fetch('https://mp.api.easy4.pro/test/balance/' + phone, {
      headers: {
        Accept: 'application/json',
        // Authorization: 'Bearer ' + this.state.token,
      },
    }).then(response => response.json());
  }

  static restorePassword = (email) => {
    console.log('api/restorePassword');

    return fetch(`https://mp.api.easy4.pro/emails/${email}/restore/password`, {
      headers: {
        Accept: 'application/json',
      },
    }).then(response => response.json());
  }
}
