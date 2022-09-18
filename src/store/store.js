import { configureStore, createSlice } from '@reduxjs/toolkit'

let userNames = createSlice({
    name: 'userName',
    initialState: '',
    reducers: {
        setUserName: (state, action, e) => {
            return e.target.value
        }
    }
})

export const { setUserName } = userNames.actions

export default configureStore({
    reducer: {
        userNames: userNames.reducer
    }
}) 