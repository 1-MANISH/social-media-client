import React, { useEffect } from 'react'
import './Home.scss'
import NavBar from '../../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../redux/slices/appConfigSlice'

function Home() {
 
  const dispatch = useDispatch()

  // when page reload / at home page get my profile from api call
  useEffect(()=>{
    dispatch(getMyInfo())
  },[dispatch]) 

  return (
    <>

      {/* Always visible when we reach to home */}
       <NavBar/> 

      {/* feed or profile or update profile */}

      <div className="outlet" style={{marginTop:'60px'}}>
          <Outlet/>
      </div>
       

    </>
  )
}

export default Home