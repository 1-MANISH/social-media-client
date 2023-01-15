import React, { useEffect, useState } from 'react'
import Post from '../Posts/Post'
import './Profile.scss'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { useSelector } from 'react-redux'
import { followAndUnFollow } from '../../redux/slices/feedSlice'

function Profile() {

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const userProfile = useSelector(state=>state.postsReducer.userProfile)
  const myProfile = useSelector(state=>state.appConfigeReducer.myProfile)
  const feedData = useSelector(state=>state.feedReducer.feedData)
  const[isMyProfile,setIsMyProfile] = useState(false)
  const [isFollowing,setIsFollowing] = useState(false)

  useEffect(()=>{

    dispatch(getUserProfile({
      userId:params.userId
    }))

    setIsMyProfile(myProfile?._id === params.userId)

    setIsFollowing(feedData.followings.find(item => item._id === params.userId))


  },[dispatch,myProfile,params.userId,feedData])

  function handleUserFollow(e){
    e.preventDefault()
    
    dispatch(followAndUnFollow({
        userIdToFollow:params.userId
    }))

}


  return (
    <div className='Profile'>

        <div className="container">

          <div className="left-part">

             { isMyProfile && <CreatePost/>}
             
             {
                userProfile?.posts?.map((post,index) =>
                     <Post key={index} post = {post} />
                )
             }
             {
             /* <Post />
             <Post />
             <Post />
             <Post /> */
             }
          </div>
          <div className="right-part">

              <div className="profile-card">

                 <img className='user-img' src={userProfile?.avatar?.url} alt="user img" />
                 <h3 className='user-name'>{userProfile?.name}</h3>
                 <p className="user-bio">{userProfile?.bio}</p>
                 <div className="follower-info">
                    <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                    <h4>{`${userProfile?.followings?.length} Followings`}</h4>
                 </div>

                 {
                     isMyProfile && (
                          <button className='update-profile btn-primary' onClick={()=>navigate('/updateProfile')}>Update Profile</button>
                     )
                 }
                 {
                     !isMyProfile && !isFollowing && (
                        <button className='follow btn-primary' onClick={handleUserFollow}>Follow</button>
                     )
                 }
                 {
                     !isMyProfile && isFollowing && (
                        <button className='follow btn-primary' onClick={handleUserFollow}>UnFollow</button>
                     )
                 }



              </div>

          </div>

        </div>

    </div>
  )
}

export default Profile