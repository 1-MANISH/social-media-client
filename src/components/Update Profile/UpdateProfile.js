import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {  updateMyProfile } from '../../redux/slices/appConfigSlice'

function UpdateProfile() {

  const myProfile = useSelector(state=>state.appConfigeReducer.myProfile) // getting profile information

  const [name,setName] = useState('')
  const [bio,setBio] = useState('')
  const [userImage,setUserImage] = useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
     setName(myProfile?.name || '')
     setBio(myProfile?.bio || '')
     setUserImage(myProfile?.avatar?.url || '')
  },[myProfile])


  function handleImageChange(e){

      e.preventDefault()

      // file reader

      const file = e.target.files[0] // hamari file milegi
      const fileReader = new FileReader() // for base 64 encodation
      fileReader.readAsDataURL(file)

      fileReader.onload = () =>{
          if(fileReader.readyState === fileReader.DONE){
             setUserImage(fileReader.result)
              // yhii jayegaa payload ME AS URL
          }
        }
  }

  function handleSubmit(e){

    e.preventDefault()

    dispatch(updateMyProfile({
      name,
      bio,
      userImage
    }))
    
  }

  return (
    <div className='UpdateProfile'>
        <div className="container">

            <div className="left-part">
                <div className="input-user-img">

                    <label htmlFor="inputImg" className='labelImg'>
                        <img src={userImage} alt={myProfile?.name} className='userImg' />
                    </label>

                    <input 
                        className='inputImg'
                        id='inputImg' 
                        type="file" 
                        accept='image/*' 
                        onChange={handleImageChange} 
                    />
                </div>

            </div>

            <div className="right-part">

                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} placeholder='Your Name' onChange={(e)=>setName(e.target.value)} />
                    <input type="text" value={bio} placeholder='Your Bio' onChange={(e)=>setBio(e.target.value)}/>

                    <input type="submit" className='btn-primary' onClick={handleSubmit} />
                </form>

                <button className='delete-account btn-primary'>Delete Account</button>

            </div>

        </div>

    </div>
  )
}

export default UpdateProfile