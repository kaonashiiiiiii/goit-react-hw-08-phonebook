import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "api/request";

const initialState = {
  user: {
    name: '',
    email: '',
    isLoading: false,
    error: null
  },
  token: '', //if exist -> user is logged in
}

const _apiURL = 'https://connections-api.herokuapp.com/'

// users operations
export const signupUser = createAsyncThunk(
  'users/signup',
  async (user) => {
    const endpoint = `${_apiURL}users/signup`
    return await request(endpoint, 'POST', JSON.stringify(user), {'Content-Type': 'application/json', 'Accept' : '*/*'})
  }
)

export const loginUser = createAsyncThunk(
  'users/login',
  async (user) => {
    const endpoint = `${_apiURL}users/login`
    return await request(endpoint, 'POST', JSON.stringify(user), {'Content-Type': 'application/json'})
  }
)

export const logoutUser = createAsyncThunk(
  'users/logout',
  async (token) => {
    const endpoint = `${_apiURL}users/logout`
    return await request(endpoint, 'POST', null, {'Authorization': token})
  }
)

// export const getCurrentUser = createAsyncThunk(
//   'users/current',
//   async (token) => {
//     const endpoint = `${_apiURL}users/current`
//     return await request(endpoint, 'GET', null, {'Authorization': token})
//   }
// )

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.user.isLoading = true
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user.error = null
        state.user.isLoading = false
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.user.error = action.error
        state.user.isLoading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.user.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload
        state.token = token
        state.user.isLoading = false
        state.user.error = null
        state.user.email = user.email
        state.user.name = user.name
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.isLoading = false
        state.user.error = action.error
      })
      .addCase(logoutUser.pending, (state) => {
        state.user.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user.email = ''
        state.user.name = ''
        state.token = ''
        state.user.isLoading = false
        state.user.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user.isLoading = false
        state.user.error = action.error
      })
      // .addCase(getCurrentUser.pending, (state) => {
      //   state.user.isLoading = true
      // })
      // .addCase(getCurrentUser.fulfilled, (state, action) => {
      //   // TODO
      //   console.log(action.payload)
      //   state.user.isLoading = false
      //   state.user.error = null
      // })
      // .addCase(getCurrentUser.rejected, (state, action) => {
      //   state.user.isLoading = false
      //   state.user.error = action.error
      // })
  }
})

const { reducer } = userSlice

export default reducer