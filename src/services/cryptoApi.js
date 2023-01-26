import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'f68a98e652msh2a11f695707008cp1bcfc4jsne5b85992e274',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
