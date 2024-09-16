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
  },
  refreshTable: (state, action) => {
    console.log('Tabla refrescada con endpoint:', action.payload) // Verifica si se actualiza el estado
    state.tableEndpoint = action.payload
  }
})

export const {
  showFormElement
} = cartSlice.actions

export default cartSlice.reducer
