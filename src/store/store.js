import { configureStore, createSlice } from '@reduxjs/toolkit'

let userNames = createSlice({
    name: 'userName',
    initialState: '',
    reducers: {
        setUserName: (state, action, e) => {
            e.target.value = action.payload
        }
    }
})

export const { setUserName } = userNames.actions

export default configureStore({
    reducer: {
        userNames: userNames.reducer
    }
}) 