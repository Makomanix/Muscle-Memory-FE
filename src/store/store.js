import { configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { muscleMemoryApi } from "../services/MuscleMemoryApi";
import userReducer from './userSlice'
import workoutBuilderReducer from './workoutBuilderSlice';




export const store = configureStore({
  reducer: {
    [muscleMemoryApi.reducerPath]: muscleMemoryApi.reducer,
    user: userReducer,
    workoutBuilder: workoutBuilderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(muscleMemoryApi.middleware)
});

setupListeners(store.dispatch);