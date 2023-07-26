export const SET_USER_DETAILS = 'SET_USER_DETAILS';

interface User {
    fname: string,
    lname: string,
    email: string,
    userId: string
}
export const setUserDetails = (user: User) => {
  return {
    type: SET_USER_DETAILS,
    payload: user,
  };
};
