import * as T from './types';

export const readState = () => ({ type: T.READ_STATE });
export const resetState = () => ({ type: T.RESET_STATE });

const toggleOfferAction = () => ({ type: T.OFFER_TOGGLE, payload: {} });
const togglePolicyAction = () => ({ type: T.POLICY_TOGGLE, payload: {} });
const markBannersSeenAction = () => ({ type: T.BANNERS_SEEN, payload: {} });

export const toggleOffer = () => dispatch => dispatch(toggleOfferAction());
export const togglePolicy = () => dispatch => dispatch(togglePolicyAction());
export const markBannersSeen = () => dispatch => dispatch(markBannersSeenAction());
