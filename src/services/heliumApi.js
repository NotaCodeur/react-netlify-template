import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const heliumHeaders = {
    
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'access-control-request-headers': 'content-type',
    // 'access-control-allow-headers': ['Origin','Content-Type','Accept'],
    // 'access-control-request-method': 'GET',
    // 'access-control-allow-origin': '*',
    // 'sec-fetch-mode': 'no-cors',
    // 'host': 'https://api.helium.io',
    // 'authority': 'ugxlyxnlrg9udfdyzwnrvghlu2vydmvycg.blockjoy.com'
    // 'origin': 'http://localhost:3000',
    // "Content-Type": "application/json",
    


}

const createRequest = (url) => ({ url, headers: heliumHeaders })
// https://api.allorigins.win/raw?url=
// https://thingproxy.freeboard.io/fetch/https://api.helium.io
// ? 404 : 'https://api.allorigins.win/raw?url=https://api.helium.io'
// ../netlify/functions
const baseUrl = '/.netlify/functions'  ;

export const heliumApi = createApi({
    reducerPath: 'heliumApi',
    baseQuery: fetchBaseQuery({baseUrl}),

    endpoints: (builder) => ({
        // helium data
        getHeliumSupply: builder.query({
            query: () => createRequest(`/hotspots?search=/v1/stats/token_supply?format=raw`),
        }),

        // account data
        getHeliumAccountStats: builder.query({
            query: (AccountAddress) => createRequest(`/hotspots?search=/v1/accounts/${AccountAddress}/stats`)
        }),
        getHeliumHotspots: builder.query({
            query: (myAddress) => createRequest(`/hotspots?search=/v1/accounts/${myAddress}/hotspots`),
        }),
        getHeliumAccountRewardsAllTime: builder.query({
            query: (AccountAddress ) => createRequest(`/hotspotsAllTime?search=/v1/accounts/${AccountAddress}/rewards/sum`)
        }),
        
        //bucket day
        getHeliumAccountRewardsDay: builder.query({
            query: (AccountAddress) => createRequest(`/hotspotsDay?search=/v1/accounts/${AccountAddress}/rewards/sum`)
        }),
        //bucket week
        getHeliumAccountRewardsWeek: builder.query({
            query: (AccountAddress) => createRequest(`/hotspotsWeek?search=/v1/accounts/${AccountAddress}/rewards/sum`)
        }),

        // roles / transaction data
        getHeliumAccountRolesCount: builder.query({
            query: (AccountAddress) => createRequest(`/hotspots?search=/v1/accounts/${AccountAddress}/roles/count`)
        }),
        getHeliumAccountRolesPayTransactions: builder.query({
            query: (AccountAddress) => createRequest(`/hotspotsPayCursor?search=/v1/accounts/${AccountAddress}/roles?filter_types=payment_v1%2Cpayment_v2`)
        }),
        getHeliumAccountRolesCursor: builder.query({
            query: ({address: AccountAddress, cursor: paymentCursor}) => createRequest(`/hotspotsPayCursor?search=/v1/accounts/${AccountAddress}/roles?cursor=${paymentCursor}`)
        }),
        getHeliumTransactionHash: builder.query({
            query: (hash) => createRequest(`/hotspotsPayCursor?search=/v1/transactions/${hash}`)
        }),

        // hotspot data
        getHeliumHotspotsRewardsAllTime: builder.query({
            query: (HotspotAddress) => createRequest(`/hotspotsAllTime?search=/v1/hotspots/${HotspotAddress}/rewards/sum`),
        }),
        // bucket hour
        getHeliumHotspotsRewardsHour: builder.query({
            query: (HotspotAddress) => createRequest(`/hotspotsHour?search=/v1/hotspots/${HotspotAddress}/rewards/sum`),
        }),
        // bucket day
        getHeliumHotspotsRewardsDay: builder.query({
            query: (HotspotAddress) => createRequest(`/hotspotsDay?search=/v1/hotspots/${HotspotAddress}/rewards/sum`),
        }),
        // bucket week
        getHeliumHotspotsRewardsWeek: builder.query({
            query: (HotspotAddress) => createRequest(`/hotspotsWeek?search=/v1/hotspots/${HotspotAddress}/rewards/sum`),
        }),
    })
})

export const { 
    useGetHeliumSupplyQuery, 
    useGetHeliumHotspotsQuery, 
    
    useGetHeliumAccountStatsQuery, 
    useGetHeliumAccountRewardsAllTimeQuery, 
    useGetHeliumAccountRewardsDayQuery, 
    useGetHeliumAccountRewardsWeekQuery, 

    useGetHeliumAccountRolesCountQuery, 
    useGetHeliumAccountRolesPayTransactionsQuery, 
    useGetHeliumAccountRolesCursorQuery,
    useGetHeliumTransactionHashQuery,

    useGetHeliumHotspotsRewardsAllTimeQuery, 
    useGetHeliumHotspotsRewardsHourQuery, 
    useGetHeliumHotspotsRewardsDayQuery, 
    useGetHeliumHotspotsRewardsWeekQuery, 
} = heliumApi;