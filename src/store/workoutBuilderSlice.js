import { createSlice } from "@reduxjs/toolkit";
import { getStorageWorkoutBuilder } from "../util/sessionStorage";

const storageWorkoutBuilder = getStorageWorkoutBuilder();

const initialState = {
  workoutBuilder: {
    workoutId: storageWorkoutBuilder?.id || null, 
    title: storageWorkoutBuilder?.title || null,
    image: storageWorkoutBuilder?.image || null,
    type: storageWorkoutBuilder?.type || null,
    exercises: storageWorkoutBuilder?.exercises || null,
  }
}

const workoutBuilderSlice = createSlice({
  name: 'workoutBuilder',
  initialState: initialState,
  reducers: {
    setWorkoutBuilder(state, action) {
      state.workoutBuilder.workoutId = action.payload.id;
      state.workoutBuilder.title = action.payload.title;
      state.workoutBuilder.image = action.payload.image;
      state.workoutBuilder.type = action.payload.type;
      state.workoutBuilder.exercises = action.payload.exercises;
    },
    clearWorkoutBuilder(state) {
      state.workoutBuilder.workoutId = null;
      state.workoutBuilder.title = null;
      state.workoutBuilder.image = null;
      state.workoutBuilder.type = null;
      state.workoutBuilder.exercises = null;
    }
  }
});

export const { setWorkoutBuilder, clearWorkoutBuilder } = workoutBuilderSlice.actions;
export default workoutBuilderSlice.reducer