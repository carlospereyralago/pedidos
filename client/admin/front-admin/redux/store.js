import { configureStore } from '@reduxjs/toolkit'
import crudReducer from './crud-slice'
import cartReducer from './cart-slice'

export const store = configureStore({
  reducer: {
    crud: crudReducer
    crud: cartReducer
  }
})

export default store
