import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import './CreatePost.scss'
import {BsCardImage} from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { useSelector } from 'react-redux'

function CreatePost() {

    const [postImage,setPostImage] = useState('')
    const [caption,setCaption] = useState('')
    const dispatch = useDispatch()
    const myProflie = useSelector(state=>state.appConfigeReducer.myProfile)

    function handleImageChange(e){

        e.preventDefault()

        // file reader
        const file = e.target.files[0] // hamari file milegi
        const fileReader = new FileReader() // for base 64 encodation
        fileReader.readAsDataURL(file)

        fileReader.onload = () =>{
            if(fileReader.readyState === fileReader.DONE){
                setPostImage(fileReader.result)
                // yhii jayegaa payload ME AS URL
            }
        }

    }

    const handlePostSubmit = async () => {

       try {


            await axiosClient.post('/posts',{
                caption,
                postImage
            })

            dispatch(getUserProfile({
                userId:myProflie?._id
            }))

       } catch (e) {
            
            return e

       }finally{

            setCaption('')
            setPostImage('')

       }


    }
  return (
    <div className='CreatePost'>
        <div className="left-part">
            <Avatar src={myProflie?.avatar?.url}/>
        </div>
        <div className="right-part">
            <input 
                 value={caption}
                 type="text" 
                 className='captionInput' 
                 placeholder='Write caption !!'
                 onChange={(e)=>setCaption(e.target.value)}
            />

            {
                postImage && (
                    <div className="img-container">
                        <img className='post-img' src={ postImage} alt="post img" />
                    </div>
                )
            }

            <div className="bottom-part">
                <div className="input-post-img">
                    <label htmlFor="inputImg" className='labelImg'>
                         <BsCardImage className='label-img-icon' />
                    </label>

                    <input 
                        className='inputImg'
                        id='inputImg' 
                        type="file" 
                        accept='image/*' 
                        onChange={handleImageChange} 
                    />

                </div>

                <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
            </div>


        </div>
    </div>
  )
}

export default CreatePost