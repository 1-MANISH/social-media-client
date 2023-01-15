import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


// asnch operation -  to get profile information

export const getMyInfo = createAsyncThunk(
    'user/getMyInfo',
    async () => {
        
        try {

            const response = await axiosClient.get('/user/getMyInfo')

            return response.rejult

        } catch (e) {

            return Promise.reject(e)
            
        }
    }
)

// asynch operation - to upadate profile

export const updateMyProfile = createAsyncThunk(
    'user/updateMyProfile',

    async (body) => {
        try {

            const response = await axiosClient.put('/user/updateMyProfile',body)

            return response.result
            
        } catch (e) {

            return Promise.reject(e)

        }
    }
)


const appConfigeSlice = createSlice({
    name:"appConfigeSlice",
    initialState:{
        isLoading:false,
        toastData:{},
        myProfile:{},
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        showToast:(state,action)=>{
            state.toastData = action.payload
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(getMyInfo.fulfilled,(state,action)=>{
            state.myProfile = action.payload.user
        })
        .addCase(updateMyProfile.fulfilled,(state,action)=>{
            state.myProfile = action.payload.user
        })
    }
})


export default appConfigeSlice.reducer

export const {setLoading,showToast} = appConfigeSlice.actions;

