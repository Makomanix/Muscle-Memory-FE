import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const muscleMemoryApi = createApi({
  reducerPath: 'muscleMemoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
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

export const {useCreateUserMutation, usePostLoginMutation, usePostExerciseMutation} = muscleMemoryApi