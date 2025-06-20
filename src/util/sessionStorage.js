export const setStorageUser = (user) => {
  console.log(user);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getStorageUser = () => {
  const user = JSON.parse(sessionStorage.getItem('user')) || null
  return user;
};

export const clearStorageUser = () => {
  console.log('clearing user')
  sessionStorage.removeItem('user');
};

export const setStorageWorkoutBuilder = (workout) => {
  console.log(workout);
  sessionStorage.setItem('workout', JSON.stringify(workout));
};

export const getStorageWorkoutBuilder = () => {
  const workout = JSON.parse(sessionStorage.getItem('workout')) || null
  return workout;
};

export const clearStorageWorkoutBuilder = () => {
  sessionStorage.removeItem('workout');
}
