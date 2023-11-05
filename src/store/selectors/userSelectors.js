import { createSelector } from 'reselect';

const getUserToken = (state) => state.user.token

const getUserError = (state) => state.user.user.error

const getBasicUserInfo = (state) => state.user.user

const getFullUserInfo = createSelector(
  state => state.user.user,
  state => state.user.token,
  (user, token) => {
    return {
      email: user.email,
      name: user.name,
      token
    }
  }
)

export {
  getUserToken,
  getUserError,
  getBasicUserInfo,
  getFullUserInfo
}