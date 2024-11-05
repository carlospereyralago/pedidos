import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartProducts.findIndex(product => product.id === action.payload.id)

      if (productIndex >= 0) {
        if (action.payload.quantity === 0) {
          state.cartProducts.splice(productIndex, 1)
        } else {
          state.cartProducts[productIndex].quantity = action.payload.quantity
        }
      } else {
        state.cartProducts.push(action.payload)
      }
    }
  }
})

export const {
  addToCart
} = cartSlice.actions

export default cartSlice.reducer
