import { configureStore } from '@reduxjs/toolkit'
import product from '../features/productSlice'
import user from '../features/userSlice'
import cart from '../features/cartSlice'
import favorite from '../features/favoriteSlice'

export const store = configureStore({
    reducer : {
        user,
        product,
        cart,
        favorite
    }
})