import { CommonError } from '../../../modules/types';
import { REFERRAL_TICKETS_DATA, REFERRAL_TICKETS_ERROR, REFERRAL_TICKETS_FETCH } from './constants';


export interface ReferralTicketsFetch {
    type: typeof REFERRAL_TICKETS_FETCH;
    payload: string;
}

export interface ReferralTicketsError {
    type: typeof REFERRAL_TICKETS_ERROR;
    payload?: CommonError;
}

export interface ReferralPayload {
    tickets: number; // кол-во тикетов, полученных за реферала
    email: string; // email реферала
    isActive: number; // статус реферала, 0/1
    subreferrals: number; // кол-во рефералов 2-го уровня
    activeSubreferrals: number; // кол-во активных рефералов 2-го уровня
}

export interface BonusPayload {
    tickets: number;  // кол-во тикетов, полученных за бонус
    action: string; // тип бонуса (e. g. facebook post)
    link: string; // ссылка на пост
}

export interface ReferralOverallPayload {
    overall: {
        direct: {
            active: number,
            inactive: number,
        },
        referrals: {
            // count: number,
            // subreferralsCount: number,
            active: number,
            inactive: number,
        },
        bonuses: {
            active: number,
            inactive: number,
        },
    };
    direct: {
        ticketsForRegistration: {
            active: number,
            inactive: number,
        },
        emrx: {
            balance: number,
            active: number,
            inactive: number,
        },
        usd: {
            balance: number,
            active: number,
            inactive: number,
        },
    };
    // referrals: ReferralPayload[];
    bonuses: BonusPayload[];
}

export interface ReferralTicketsData {
    type: typeof REFERRAL_TICKETS_DATA;
    payload: ReferralOverallPayload;
}

export type ReferralTicketsActions = ReferralTicketsFetch | ReferralTicketsData | ReferralTicketsError;

export const referralTicketsFetch = (payload: string): ReferralTicketsFetch => ({
    type: REFERRAL_TICKETS_FETCH,
    payload,
});

export const referralTicketsData = (payload: ReferralTicketsData['payload']): ReferralTicketsData => ({
    type: REFERRAL_TICKETS_DATA,
    payload,
});

export const referralTicketsError = (payload: ReferralTicketsError['payload']): ReferralTicketsError => ({
    type: REFERRAL_TICKETS_ERROR,
    payload,
});
