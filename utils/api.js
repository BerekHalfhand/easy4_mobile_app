
export default class Api {
  static basicHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })

  // static login = (
  //   login,
  //   password
  // ) => {
  //   console.log('api/login');
  //
  //   const url = 'https://mp.api.easy4.pro/auth/login';
  //
  //   let data = JSON.stringify({
  //     login,
  //     password
  //   });
  //
  //   var request = new Request(url, {
  //     method: 'POST',
  //     body: data,
  //     headers: Api.basicHeaders
  //   });
  //
  //   return fetch(request).then(response => response.json());
  // }

  // static signup = (values) => {
  //   console.log('api/signup');
  //
  //   const url = 'https://mp.api.easy4.pro/users';
  //
  //   // strip the values object of empty fields
  //   Object.keys(values).forEach((key) => (values[key] === '') && delete values[key]);
  //
  //   let data = JSON.stringify(values);
  //
  //   var request = new Request(url, {
  //     method: 'POST',
  //     body: data,
  //     headers: Api.basicHeaders
  //   });
  //
  //   return fetch(request).then(response => response.json());
  // }

  // static userInfo = (token) => {
  //   console.log('api/userInfo');
  //
  //   return fetch('https://mp.api.easy4.pro/user/info', {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     },
  //   }).then(response => response.json());
  // }

  static msisdns = (token) => {
    console.log('api/msisdns');

    return fetch('https://mp.api.easy4.pro/external/msisdns', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response => response.json());
  }

  static balance = (phone, token) => {
    console.log('api/balance');

    return fetch('https://mp.api.easy4.pro/test/balance/' + phone, {
      headers: {
        Accept: 'application/json',
        // Authorization: 'Bearer ' + token,
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
