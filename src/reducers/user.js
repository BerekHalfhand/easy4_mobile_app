import * as T from '../actions/types';
// import tariffs from 'app/utils/tariffData.json';

export default (state = {}, action) => {
  let {type, payload} = action;

  // take the first available tariff as default
  // let activeTariff = Object.keys(tariffs)[0];
  let tariffRemains = null;
  let msisdns = [];

  switch (type) {
  case T.READ_STATE:
    console.log(`USER/${type}`, state);
    return state;

  case T.ICCID_INFO_SUCCESS:
  case T.ICCID_INFO_FAILURE:
  case T.ICCID_BIND_SUCCESS:
  case T.ICCID_BIND_FAILURE:
    console.log(`USER/${type}`, payload);
    return state;

  case T.RESET_STATE:
    console.log(`USER/${type}`, state);
    return {};

  case T.LOGOUT_SUCCESS:
  case T.LOGOUT_FAILURE:
  case T.UPDATE_TOKEN_FAILURE:
    console.log(`USER/${type}`, payload);
    return {};

  case T.LOGIN_SUCCESS:
  case T.LOGIN_FAILURE:
  case T.USER_INFO_FAILURE:
    console.log(`USER/${type}`, payload);
    return {
      ...(state.doNotPersist && {doNotPersist: state.doNotPersist})
    };

  case T.USER_INFO_SUCCESS:
    console.log(`USER/${type}`, payload);

    return {
      ...state,
      userId: payload._id,
      firstName: payload.firstName,
      secondName: payload.secondName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      ...(payload.firstName && {fullName: `${payload.firstName} ${payload.lastName}`}),
      ...(state.doNotPersist && {doNotPersist: state.doNotPersist})
    };

  case T.SELECT_PHONE:
    console.log(`USER/${type}`, payload);
    return {
      ...state,
      selectedPhone: payload.phone,
    };

  case T.MSISDNS_FETCH_SUCCESS:
    console.log(`USER/${type}`, payload);

    if (payload.items && payload.items.length) {
      for (const item of payload.items){
        if (item && item.msisdns && item.msisdns[0] && item.msisdns[0].msisdn)
          msisdns.push(item.msisdns[0].msisdn);
      }
    }
    return {
      ...state,
      msisdns
    };

  case T.MSISDNS_FETCH_FAILURE:
    console.log(`USER/${type}`, payload);
    return {
      ...state,
      msisdns: [],
    };

  case T.BALANCE_FETCH_SUCCESS:
    console.log(`USER/${type}`, payload);
    if (!payload.body) return state;

    return {
      ...state,
      balance: payload.body.balance,
    };

  case T.BALANCE_FETCH_FAILURE:
    console.log(`USER/${type}`);
    return {
      ...state,
      balance: null,
    };

  case T.TARIFF_FETCH_SUCCESS:
    console.log(`USER/${type}`, payload);
    return {
      ...state,
      tariffId: payload.result.id,
    };

  case T.TARIFF_FETCH_FAILURE:
    console.log(`USER/${type}`, payload);
    return {
      ...state,
      tariffId: null,
    };

  case T.REMAINS_FETCH_SUCCESS:
    console.log(`USER/${type}`, payload);
    if (!payload.body) return state;

    payload.body.map(obj => {
      if (obj.productId == 1021 && obj.packages && obj.packages.length) {
        if (obj.packages[0].remainingVolume)
          tariffRemains = obj.packages[0].remainingVolume;
      }
    });

    return {
      ...state,
      tariffRemains,
    };

  case T.REMAINS_FETCH_FAILURE:
    console.log(`USER/${type}`, payload);
    return {
      ...state,
      tariffRemains: null,
    };

  case T.DO_NOT_PERSIST_TOGGLE:
    return {
      ...state,
      doNotPersist: !state.doNotPersist,
    };

  default:
    return state;
  }
};
