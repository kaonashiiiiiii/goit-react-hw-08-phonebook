import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "api/request";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: '',
}

const _apiURL = 'https://connections-api.herokuapp.com/'

// contacts operations

export const getUserContacts = createAsyncThunk(
  'contacts/get',
  async (token) => {
    const endpoint = `${_apiURL}contacts`
    return await request(endpoint, 'GET', null, {'Authorization': token})
  }
)

export const postContact = createAsyncThunk(
  'contacts/post',
  async ({ contact, token }) => {
    const endpoint = `${_apiURL}contacts`
    return await request(endpoint, 'POST', JSON.stringify(contact), {'Authorization': token, 'Content-Type': 'application/json'})
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async ({ contactId, token }) => {
    const endpoint = `${_apiURL}contacts/${contactId}`
    return await request(endpoint, 'DELETE', null, {'Authorization': token})
  }
)

// export const updateContact = createAsyncThunk(
//   'contacts/update',
//   async ({ contact, token }) => {
//     const { contactId, execParams } = contact
//     const endpoint = `${_apiURL}contacts/${contactId}`
//     return await request(endpoint, 'PATCH', JSON.stringify(execParams), {'Authorization': token})
//   }
// )

const heroesSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserContacts.pending, (state) => {
        state.contacts.isLoading = true
      })
      .addCase(getUserContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.items = action.payload
        state.contacts.error = null
      })
      .addCase(getUserContacts.rejected, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.error = action.error
      })
      .addCase(postContact.pending, (state) => {
        state.contacts.isLoading = true
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.items = [...state.contacts.items, action.payload]
        state.contacts.error = null
      })
      .addCase(postContact.rejected, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.error = action.error
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.isLoading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload.id)
        state.contacts.error = null
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false
        state.contacts.error = action.error
      })
      // .addCase(updateContact.pending, (state) => {
      //   state.contacts.isLoading = true
      // })
      // .addCase(updateContact.fulfilled, (state, action) => {
      //   // TODO
      //   console.log(action.payload)
      //   state.contacts.isLoading = false
      //   state.contacts.error = null
      // })
      // .addCase(updateContact.rejected, (state, action) => {
      //   state.contacts.isLoading = false
      //   state.contacts.error = action.error
      // })
  }
})

const { actions, reducer } = heroesSlice

export const {
  setFilter
} = actions

export default reducer
