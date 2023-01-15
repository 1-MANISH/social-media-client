import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
import Follower from '../Follower/Follower'
import Post from '../Posts/Post'
import './Feed.scss'

function Feed() {


   const dispatch = useDispatch()

   const feedData = useSelector(state=>state.feedReducer.feedData)

   
   useEffect(()=>{

        dispatch(getFeedData())

   },[dispatch])


  return (
    <div className='Feed'>

      <div className="container">

           <div className="left-part">


            {
                  feedData?.posts?.map((post,index)=>{
                     return <Post key={index} post={post}/>
                  })
            }

             

           </div>
           <div className="right-part">

              <div className="following">
                 <h3 className='title'>You Are Followings</h3>

                {
                  feedData?.followings?.map((user,index)=>{
                     return <Follower key={index} user={user} />
                  })
                }

              </div>

              <div className="suggestions">
                 <h3 className='title'>Suggessted For You</h3>

                 {
                  feedData?.suggestions?.map((user,index)=>{
                     return <Follower key={index} user={user} />
                  })
                }
                 
              </div>
           </div>

      </div>

    </div>
  )
}

export default Feed