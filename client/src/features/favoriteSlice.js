import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFavorite = createAsyncThunk('fetch/favorite', async (_, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/favorite/${userId}`)
        const data = await res.json()
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const addProductFavorite = createAsyncThunk('add/favorite', async (id, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/favorite/add/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : id })
        })
        const data = await res.json()   
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const deleteProductFavorite = createAsyncThunk('delete/favorite', async (id, thunkAPI) => {
    try {
        const userId = await thunkAPI.getState().user.user
        const res = await fetch(`http://localhost:4000/favorite/delete/${userId}`, {
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ product : id })
        })
        const data = await res.json()   
        return data 
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})


const favoriteSlice = createSlice({
    name : 'favorite',
    initialState : {
        favorite : [],
        loader : false
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchFavorite.fulfilled, (state, action) => {
            state.favorite = action.payload
        })
        .addCase(addProductFavorite.fulfilled, (state, action) => {
            state.favorite = action.payload
        })
        .addCase(deleteProductFavorite.fulfilled, (state, action) => {
            state.favorite = action.payload
            state.loader = false
        })
        .addCase(deleteProductFavorite.pending, (state, action) => {
            state.loader = true
        })
    }
})

export default favoriteSlice.reducer