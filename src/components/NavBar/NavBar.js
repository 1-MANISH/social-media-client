import React from 'react'
import './NavBar.scss'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { axiosClient } from '../../utils/axiosClient'
import { removeItem,KEY_ACCESS_TOKEN } from '../../utils/localStorageManager'


function NavBar() {


  const navigate = useNavigate()
  const myProfile = useSelector(state=>state.appConfigeReducer.myProfile) // getting profile information

  async function handleLogoutClick(){
      try { 
        
          await axiosClient.post('auth/logout')
          removeItem(KEY_ACCESS_TOKEN)
          navigate('/login')


        
      } catch (e) {
         return e
      }

  }
  return (
    <div className='Navbar'>

  

      <div className="container">

        <h2 className="banner hover-link" onClick={()=>navigate('/')}>SOCIAL MEDIA</h2>

        <div className="right-side">
           <div className="profile hover-link" 
                onClick={()=>navigate(`/profile/${myProfile._id}`)
              }
            >
            <Avatar  src={myProfile?.avatar?.url}/>
           </div>
           <div className="logout hover-link" onClick={handleLogoutClick}>
            <AiOutlineLogout />
           </div>
        </div>
       

      </div>
      
    </div>
  )
}

export default NavBar