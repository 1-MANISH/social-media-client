import React from 'react' 
import Avatar from '../Avatar/Avatar'
import './Post.scss'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postsSlice'
import {useNavigate} from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'

// single post component
function Post({post}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handlePostLiked(){

    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:' liked or Unliked  '
    }))

    dispatch(likeAndUnlikePost({
      postId:post._id
    }))
  }
 




  return (
    <div className='Post'>

            <div className="heading" onClick={()=>navigate(`/profile/${post.owner._id}`)}>
                <Avatar src={post?.owner?.avatar?.url}/>
                <h4>{post?.owner?.name}</h4>
            </div>

            <div className="content">
                <img src={post?.image?.url} alt="post img" />
            </div>
            <div className="footer">
                <div className="likes" onClick={handlePostLiked}>

                    {
                       post?.isLiked && <AiFillHeart  className='icon-liked'/>
                    }
                    {
                       !post?.isLiked && <AiOutlineHeart className='icon' />
                    }
                    

                    <h4>{post?.likesCount} likes</h4>
                </div>
                <p className='caption'>{post?.caption}</p>
                <h6 className='time-ago'>{post?.timeAgo } </h6>
            </div>

    </div>
  )
}

export default Post