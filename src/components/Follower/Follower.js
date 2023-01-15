import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import './Follower.scss'
import { useDispatch,useSelector } from 'react-redux'
import { followAndUnFollow } from '../../redux/slices/feedSlice'
import {useNavigate} from 'react-router-dom'

function Follower({user}) {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const feedData = useSelector(state=>state.feedReducer.feedData)
   const [isFollowing,setIsFollowing] = useState(false)



  useEffect(()=>{

     setIsFollowing(feedData.followings.find(item => item._id === user._id))

  },[dispatch,feedData,user._id,isFollowing])


  function handleUserFollow(e){
      e.preventDefault()
      
      dispatch(followAndUnFollow({
          userIdToFollow:user._id
      }))

  }

  return (
    <div className='Follower'>
        
        <div className="user-info" onClick={()=>navigate(`/profile/${user._id}`)}>
            <Avatar src={user?.avatar?.url}/>
            <h4 className='name'>{user?.name}</h4>
        </div>
        
        <h5 
          className={isFollowing ?  "hover-link follow-link" : "btn-primary "} 
          onClick={handleUserFollow}
        >
            { isFollowing ? 'UNFOLLOW':'FOLLOW'}
        </h5>

    </div>
  )
}

export default Follower