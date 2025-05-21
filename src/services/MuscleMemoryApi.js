import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const muscleMemoryApi = createApi({
  reducerPath: 'muscleMemoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Exercise'],
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
        method: 'GET'
      })
    }),
    getExercises: build.query({
      query: () => ({
        url: 'exercises',
        method: 'GET'
      }),
      providesTags: ['Exercise']
    }),
    postExercise: build.mutation({
      query: (exercise) => ({
        url: 'exercises',
        method: 'POST',
        body: exercise,
      }),
      invalidatesTags: ['Exercise']
    }),
    patchExercise: build.mutation({
      query: (exercise) => ({
        url: 'exercises',
        method: 'PATCH',
        body: exercise,
      }),
      invalidatesTags: ['Exercise']
    }),
    deleteExercise: build.mutation({
      query: (exerciseId) => ({
        url: 'exercises',
        method: 'DELETE',
        body: {id: exerciseId},
      }),
      invalidatesTags: ['Exercise']
    }),
  })
})

export const {useCreateUserMutation, usePostLoginMutation, usePostExerciseMutation, useGetExercisesQuery, usePatchExerciseMutation, useDeleteExerciseMutation} = muscleMemoryApi