import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/cart/${userId}`)
        const data = await res.json()
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const addProduct = createAsyncThunk('cart/add', async (productId, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/cart/add/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : productId })
        })
        const data = await res.json()   
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const deleteProduct = createAsyncThunk('cart/delete', async (productId, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/cart/delete/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : productId })
        })
        
        const data = await res.json()
        
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const incProductCart = createAsyncThunk('inc/product',  async (productId, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/cart/inc/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : productId })
        })
        const data = await res.json()
        return data
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})

export const decProductCart = createAsyncThunk('dec/product',  async (productId, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/cart/dec/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : productId })
        })
        const data = await res.json()
        return data
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})


const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        cart : [],
        error : null,
        loader: false
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.cart = action.payload
            state.loader = false
        })
        .addCase(addProduct.pending, (state, action) => {
            state.loader = true
        })
        .addCase(deleteProduct.fulfilled, (state) => {
            state.cart.products = state.cart.products.filter((item, index) => item.productId._id !== index)
            state.loader = false
        })
        .addCase(deleteProduct.pending, (state, action) => {
            state.loader = true
            state.error = null
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loader = false
            state.error = action.payload
        })
        .addCase(incProductCart.fulfilled, (state, action) => {
            state.cart.products = state.cart.products.map((item) => {
                if(item.productId === action.payload) {
                    item.amount++;
                }
                return item;
            })
        })
        .addCase(decProductCart.fulfilled, (state, action) => {
            state.cart.products = state.cart.products.map((item) => {
                if(item.productId === action.payload) {
                    item.amount--;
                }
                return item;
            })
        })
    } 
})

export default cartSlice.reducer