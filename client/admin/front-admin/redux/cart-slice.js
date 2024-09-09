import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    formElement: {
      data: null
    }
  },
  reducers: {
    showFormElement: (state, action) => {
      state.formElement = action.payload
    }
  }
})

export const {
  showFormElement
} = cartSlice.actions

export default cartSlice.reducer
