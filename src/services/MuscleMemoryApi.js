import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const muscleMemoryApi = createApi({
  reducerPath: 'muscleMemoryApi',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    createUser: build.mutation({ 
      query: (newUser) => ({
        url: 'auth/signup',
        method: 'PUT',
        body: newUser,
      })  
    }),
    postLogin: build.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
      })
    }),
    getAccessToken: build.query({
      query: () => ({
        url: 'auth/access',
        method: "GET"
      })
    }),
    getExercises: build.query({
      query: () => 'exercises'
    }),
    postExercise: build.mutation({
      query: (exercise) => ({
        url: 'exercises',
        method: 'POST',
        body: exercise,
      })
    }),
  })
})

export const {useCreateUserMutation, usePostLoginMutation, usePostExerciseMutation, useLazyGetAccessTokenQuery} = muscleMemoryApi