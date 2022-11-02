import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetch', async (category, thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:4000/products/${category}`)
        const products = await response.json()

        return products
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    } 
})

const productSlice = createSlice({
    name : 'product',
    initialState: {
        products : []
    },
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

export default productSlice.reducer