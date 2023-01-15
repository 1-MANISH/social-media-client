
//  helps to call - backend API
import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager'
import store from '../redux/store'
import { setLoading, showToast } from '../redux/slices/appConfigSlice'
import { TOAST_FAILURE } from '../App'


// cleint help us to perfrom operation at gloabal

export  const axiosClient = axios.create({
    baseURL:process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials:true
})



// send authorization header for each api call
// from frontEnd we are sending accesss_token to req.header['authoriazation] me
axiosClient.interceptors.request.use(
    (request)=>{

        const accessToken =  getItem(KEY_ACCESS_TOKEN)

        request.headers['Authorization'] = `Bearer ${accessToken}`


        store.dispatch(setLoading(true))

        return request
    }
)


//  Reseponse from backend 
axiosClient.interceptors.response.use(


    async (response)=>{

        store.dispatch(setLoading(false))

        const data = response.data // actual data

        if(data.status === 'ok'){
            return data
        }   



        const originalRequest = response.config
        const statusCode = data.statusCode
        const error = data.message


        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))


        // access token expires
        if(statusCode === 401 && !originalRequest._retry){

            originalRequest._retry = true

            const response = await axios.create(
                {
                    withCredentials:true
                }
            ).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)

            // console.log('response from backend',response.rejult.newAccessToken);

            if(response.data.status === 'ok'){

                setItem(KEY_ACCESS_TOKEN,response.data.rejult.newAccessToken)
                
                originalRequest.headers['Authorization'] = `Bearer ${response.data.rejult.newAccessToken}`

                return axios(originalRequest)
            }
            else {
                 // when refresh token expires, send user to login page

                removeItem(KEY_ACCESS_TOKEN);
    
                window.location.replace('/login','_self')
    
                return Promise.reject(error)
            }
        } 

        return Promise.rejult(error)
    },async (error)=>{

        store.dispatch(setLoading(false))

        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error.message
        }))

        return Promise.rejult(error)
    }
)