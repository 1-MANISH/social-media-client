import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndUnlikePost } from "./postsSlice";

// asnch operation -  to get profile information

export const getFeedData = createAsyncThunk(
    'user/getFeedData',
    async () => {
        
        try {

            const response = await axiosClient.get(
                '/user/getFeedData'
            )
            
            return response.rejult

        } catch (e) {

            return Promise.reject(e)
            
        }
    }
)


export const followAndUnFollow = createAsyncThunk(
    'user/followAndUnFollow',
    async (body) => {
        try {

            const response = await axiosClient.post(
                '/user/follow',
                body
            )

            return response.rejult.user

        } catch (e) {

            return Promise.reject(e)
            
        } 
    }
)

const feedSlice = createSlice({
    name:" feedSlice",
    initialState:{
        feedData:{}
    },
    extraReducers:(builder) =>{
        builder.addCase(getFeedData.fulfilled,(state,action)=>{
            state.feedData= action.payload
        })
        .addCase(likeAndUnlikePost.fulfilled,(state,action)=>{

            const post = action.payload

            const index = state?.feedData?.posts?.findIndex(item => item._id === post._id)

            // console.log('post index',post,index);

            if(index !== -1){
                if(state?.feedData?.posts)
                    state.feedData.posts[index]  = post

            }

        })
        .addCase(followAndUnFollow.fulfilled,(state,action)=>{

            const user = action.payload

            const index = state?.feedData?.followings?.findIndex(item=> item._id === user._id)

            const index2 = state?.feedData?.suggestions?.findIndex(item => item._id === user._id)

            if(index !== -1){
                state?.feedData?.followings?.splice(index,1)
                state?.feedData?.suggestions?.push(user)

            }else{
                state?.feedData?.followings?.push(user);
                state?.feedData?.suggestions?.splice(index2,1)
            }


        })
        
    }
})


export default feedSlice.reducer;



