import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const heliumHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'access-control-request-headers': 'content-type',
    // 'access-control-allow-headers': ['Origin','Content-Type','Accept'],
    'access-control-request-method': 'GET',
    // 'access-control-allow-origin': '*',
    'sec-fetch-mode': 'no-cors',
    'host': 'https://api.helium.io',
    // 'authority': 'ugxlyxnlrg9udfdyzwnrvghlu2vydmvycg.blockjoy.com'
    'origin': '*'


}

const createRequest = (url) => ({ url, headers: heliumHeaders })

const baseUrl = 'https://api.helium.io';

export const heliumApi = createApi({
    reducerPath: 'heliumApi',
    baseQuery: fetchBaseQuery({baseUrl}),

    endpoints: (builder) => ({
        getHeliumSupply: builder.query({
            query: () => createRequest(`/v1/stats/token_supply?format=raw`),
        }),
        getHeliumHotspots: builder.query({
            query: (myAddress) => createRequest(`/v1/accounts/${myAddress}/hotspots`),
        }),
        getHeliumAccountRewardsAllTime: builder.query({
            query: (AccountAddress ) => createRequest(`/v1/accounts/${AccountAddress}/rewards/sum?min_time=2020-01-27T00:00:00Z`)
        }),
        getHeliumAccountRewardsWeek: builder.query({
            query: (AccountAddress) => createRequest(`/v1/accounts/${AccountAddress}/rewards/sum?min_time=-7%20day&bucket=day`)
        }),
        getHeliumAccountRewardsMonth: builder.query({
            query: (AccountAddress) => createRequest(`/v1/accounts/${AccountAddress}/rewards/sum?min_time=-30%20day&bucket=day`)
        }),
        getHeliumAccountRewardsYear: builder.query({
            query: (AccountAddress) => createRequest(`/v1/accounts/${AccountAddress}/rewards/sum?min_time=-52%20week&bucket=week`)
        }),
        getHeliumHotspotsRewardsAllTime: builder.query({
            query: (HotspotAddress) => createRequest(`/v1/hotspots/${HotspotAddress}/rewards/sum?min_time=2020-01-27T00:00:00Z`),
        }),
        getHeliumAccountActivityPayment: builder.query({
            query: (AccountAddress) => createRequest(`/v1/accounts/${AccountAddress}/activity?min_time=2020-01-27T00:00:00Z&filter_types=rewards_v2`)
        }),
        getHeliumAccountStats: builder.query({
            query: (AccountAddress) => createRequest(`/v1/accounts/${AccountAddress}/stats`)
        }),

    })
})

export const { 
    useGetHeliumSupplyQuery, 
    useGetHeliumHotspotsQuery, 
    useGetHeliumAccountRewardsAllTimeQuery, 
    useGetHeliumAccountRewardsWeekQuery, 
    useGetHeliumAccountRewardsMonthQuery, 
    useGetHeliumAccountRewardsYearQuery, 
    useGetHeliumHotspotsRewardsAllTimeQuery, 
    useGetHeliumAccountActivityPaymentQuery,
    useGetHeliumAccountStatsQuery 
} = heliumApi;