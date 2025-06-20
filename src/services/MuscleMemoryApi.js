import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const muscleMemoryApi = createApi({
  reducerPath: 'muscleMemoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Exercise', 'Workout'],
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
    getWorkouts: build.query({
      query: (userId) => ({
        url: `workouts?userId=${userId}`,
        method: 'GET'
      }),
      providesTags: ['Workout']
    }),
    postWorkout: build.mutation({
      query: (userId, workout) => ({
        url: 'workouts',
        method: 'POST',
        body: {userId: userId, workout: workout},
      }),
      invalidatesTags: ['Workout']
    }),
    patchWorkout: build.mutation({
      query: (userId, workout) => ({
        url: 'workouts',
        method: 'PATCH',
        body: {userId: userId, workout: workout},
      }),
      invalidatesTags: ['Workout']
    }),
    deleteWorkout: build.mutation({
      query: (userId, workoutId) => ({
        url: 'workouts',
        method: 'DELETE',
        body: { userId: userId, workoutId: workoutId },
      }),
      invalidatesTags: ['Workout']
    }),
  })
})

export const {useCreateUserMutation, usePostLoginMutation, usePostExerciseMutation, useGetExercisesQuery, usePatchExerciseMutation, useDeleteExerciseMutation, useGetWorkoutsQuery, usePostWorkoutMutation, usePatchWorkoutMutation, useDeleteWorkoutMutation, usePrefetch} = muscleMemoryApi