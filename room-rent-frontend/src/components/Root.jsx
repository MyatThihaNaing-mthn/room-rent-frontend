/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

const tokenRefreshURL = "http://localhost:8080/api/auth/refresh"
const agentProfileURL = "http://localhost:8080/api/agent/profile"
const adminProfileURL = "http://localhost:8080/api/admin/profile"
function Root(){
    const [user, setUser] = useState()
    //check accesstoken
    //use refreshToken 
    //if refreshToken expire, assume as public
    const accessToken = getAccessTokenFromLocalStorage()
    const checkAuthentication = async() => {
        if(accessToken){
            //get id from token and retrieve profile data
            const userID = getUserIdFromToken(accessToken)
            //fetch data using accessToken
            const role = getUserRoleFromToken(accessToken)
            const user = await getUserProfile(role, accessToken)
            setUser(user)
            console.log(user)
        }else{
            try{
                const refreshTokenResponse  = await axios.get(tokenRefreshURL, {withCredentials: true})
                const newAccessToken = refreshTokenResponse.data.token
                localStorage.setItem("accessToken", newAccessToken)
                const role = getUserRoleFromToken(newAccessToken)
                const user = await getUserProfile(role, newAccessToken)
                setUser(user)
                console.log(user)
            }catch(error){
                console.log(error)
            }
        }
    }
    
    useEffect(
        ()=>{checkAuthentication();},
        []
    )

    return(
        <div className=" h-full w-full">
            <UserContext.Provider value={{user, setUser}}>
                <Navbar/>
                <Outlet/>
            </UserContext.Provider>
        </div>
    )
}


export default Root


function getAccessTokenFromLocalStorage(){
    return localStorage.getItem("accessToken")
}

function getUserIdFromToken(token){
    try{
        const userID = jwtDecode(token).sub
        return userID
    }catch(error){
        return null
    }
}

function getUserRoleFromToken(token){
    try{
        const user = jwtDecode(token).user
        return user.role.toLowerCase()
    }catch(error){
        return null
    }
}

async function getUserProfile(role, accessToken){
    try{
        let response;
        const config = {
            headers : {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        if(role==="agent"){
            response = await axios.get(agentProfileURL, config)
        }
        else if(role==="admin"){
            response = await axios.get(adminProfileURL, config)
        }
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}