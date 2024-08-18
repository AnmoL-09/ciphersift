import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '09f7840594msh84c16aef2ae1fecp1c2ecdjsnaebba0b1bafa',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = 'https://coingecko.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoExchanges: builder.query({
            query: (id) => createRequest(`exchanges`),
        }),
    })
})

export const  {
    useGetCryptoExchangesQuery
} = cryptoExchangeApi;
