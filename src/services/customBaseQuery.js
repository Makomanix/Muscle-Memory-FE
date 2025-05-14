import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.mm.local:8080/',
  credentials: 'include',
});

const customBaseQuery = async (args, api, extraOptions) => {
  console.log('args', args);
  let result = await baseQuery(args, api, extraOptions);
  console.log('when does this go off')

  if (result?.error?.status === 401) {
    console.log('inside custom 401')
    const refreshTokens = await baseQuery('/auth/access', api, extraOptions);

    console.log('right after attempting to refreshTokens', refreshTokens);
    if (refreshTokens?.status === 200) {
      console.log('refreshTokens.data', refreshTokens?.status)
      result = await baseQuery(args, api, extraOptions)
      //handle logout
    }
  }
  console.log('result', result);
  return result;
};

export default customBaseQuery;