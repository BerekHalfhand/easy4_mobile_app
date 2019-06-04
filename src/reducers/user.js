import * as T from '../actions/types';
// import tariffs from 'app/utils/tariffData.json';

export default (state = {}, action) => {
  let {type, payload} = action;

  // take the first available tariff as default
  // let activeTariff = Object.keys(tariffs)[0];
  let tariffRemains = null;

  switch (type) {
  case T.READ_STATE:
    console.log('USER/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('USER/RESET_STATE', state);
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
    console.log('USER/USER_INFO_SUCCESS', payload);

    // for (let tariff in tariffs) {
    //   if (tariffs[tariff].id == payload.tariffId)
    //     activeTariff = tariff;
    // }

    return {
      ...state,
      _id: payload._id,
      firstName: payload.firstName,
      secondName: payload.secondName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      // tariff: activeTariff,
      ...(payload.firstName && {fullName: `${payload.firstName} ${payload.lastName}`}),
      ...(state.doNotPersist && {doNotPersist: state.doNotPersist})
    };

  case T.SELECT_PHONE:
    console.log('USER/SELECT_PHONE', payload);
    return {
      ...state,
      selectedPhone: payload.phone,
    };

  case T.MSISDNS_FETCH_SUCCESS:
    console.log('USER/MSISDNS_FETCH_SUCCESS', payload);
    return {
      ...state,
      msisdns: payload.items.map(v => v.msisdn),
    };

  case T.MSISDNS_FETCH_FAILURE:
    console.log('USER/MSISDNS_FETCH_FAILURE', payload);
    return {
      ...state,
      msisdns: [],
    };

  case T.BALANCE_FETCH_SUCCESS:
    console.log('USER/BALANCE_FETCH_SUCCESS', payload);
    return {
      ...state,
      balance: payload.balance,
    };

  case T.BALANCE_FETCH_FAILURE:
    console.log('USER/BALANCE_FETCH_FAILURE');
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
    // console.log(`USER/${type}`, payload);
    if (!payload.result) return state;

    payload.result.map(obj => {
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
