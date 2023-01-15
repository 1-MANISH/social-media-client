import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

// asnch operation -  to get profile information

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile ',
    async (body) => {
        
        try {

            const response = await axiosClient.post('/user/getUserProfile',body)

            return response.rejult

        } catch (e) {

            return Promise.reject(e)
            
        }
    }
)


export const likeAndUnlikePost = createAsyncThunk(
    'post/likeAndUnlikePost',
    async (body) => {

        try {

            const response = await axiosClient.post('/posts/like',body)

            return response.rejult.post

            
        } catch (e) {

            return Promise.reject(e)

        }
        
    }
)


const postsSlice = createSlice({
    name:" postsSlice",
    initialState:{
        userProfile:{}
    },
    reducers:{
    },
    extraReducers:(builder) =>{
        builder.addCase(getUserProfile.fulfilled,(state,action)=>{
            state.userProfile= action.payload
        })
        .addCase(likeAndUnlikePost.fulfilled,(state,action)=>{

            const post = action.payload

            const index = state.userProfile?.posts?.findIndex(item => item._id === post._id)

            if(index !== -1){
                if(state.userProfile?.posts)
                    state.userProfile.posts[index] = post

            }

        })
    }
})


export default postsSlice.reducer;



