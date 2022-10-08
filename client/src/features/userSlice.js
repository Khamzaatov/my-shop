const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const authSignUp = createAsyncThunk('auth/signUp', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/registration', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            return thunkAPI.rejectWithValue(json)
        }

        return json
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const authSignIn = createAsyncThunk('auth/signIn', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/login', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data)
        }

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user)


        return data

    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})

const userSlice = createSlice({
    name : 'user',
    initialState : {
        error1 : null,
        error2 : null,
        signIn : false,
        signUp : false,
        token : localStorage.getItem('token'),
        user : localStorage.getItem('user')
    },
    reducers : {
        signOut : (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.user = null
            state.token = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(authSignUp.pending, (state, action) => {
            state.signUp = true
            state.error1 = null
        })
        .addCase(authSignUp.rejected, (state, action) => {
            state.signUp = false
            state.error1 = action.payload
        })
        .addCase(authSignUp.fulfilled, (state, action) => {
            state.signUp = false
            state.error1 = null 
        })
        .addCase(authSignIn.pending, (state, action) => {
            state.signUp = true
            state.error2 = null
        })
        .addCase(authSignIn.rejected, (state, action) => {
            state.signUp = null
            state.error2 = action.payload
        })
        .addCase(authSignIn.fulfilled, (state, action) => {
            state.signUp = null
            state.error2 = null
            state.token = action.payload.token
            state.user = action.payload.user
            console.log(action.payload.user);
        })
    }
})

export const { signOut } = userSlice.actions
export default userSlice.reducer
