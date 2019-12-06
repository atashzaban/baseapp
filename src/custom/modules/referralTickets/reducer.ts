//tslint:disable
import { ReferralTicketsActions, ReferralOverallPayload } from './actions';
import { REFERRAL_TICKETS_DATA, REFERRAL_TICKETS_ERROR, REFERRAL_TICKETS_FETCH } from './constants';

export interface ReferralOverallState {
    loading: boolean;
    data: ReferralOverallPayload;
}

const initialState: ReferralOverallState = {
    loading: false,
    data: {
        overall: {
            direct: {
                active: 0,
                inactive: 0,
            },
            referrals: {
                active: 0,
                inactive: 0,
            },
            bonuses: {
                active: 0,
                inactive: 0,
            },
        },
        bonuses: [],
        direct: {
            ticketsForRegistration: {
                active: 0,
                inactive: 0,
            },
            emrx: {
                balance: 0,
                active: 0,
                inactive: 0,
            },
            usd: {
                balance: 0,
                active: 0,
                inactive: 0,
            },
        },
    },
};

export const referralTicketsReducer = (state = initialState, action: ReferralTicketsActions) => {
    switch (action.type) {
        case REFERRAL_TICKETS_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case REFERRAL_TICKETS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case REFERRAL_TICKETS_FETCH:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};