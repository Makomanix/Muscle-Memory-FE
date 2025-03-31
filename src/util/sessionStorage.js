export const setStorageUser = (user) => {
  console.log(user);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const getStorageUser = () => {
  let user = JSON.parse(sessionStorage.getItem('user')) || null
  return user;
}

export const clearStorageUser = () => {
  console.log('clearing user')
  sessionStorage.removeItem('user');
}
