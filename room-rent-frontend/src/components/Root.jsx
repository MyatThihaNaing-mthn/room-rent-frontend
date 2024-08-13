/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

const tokenRefreshURL = "http://localhost:8080/api/v1/auth/refresh"
const agentProfileURL = "http://localhost:8080/api/v1/agent/profile"
const adminProfileURL = "http://localhost:8080/api/v1/admin/profile"
function Root(){
    const [user, setUser] = useState()
    const [isLoading, setLoading] = useState(true);

    const checkAuthentication = async() => {
        try {
            let accessToken = getAccessTokenFromLocalStorage();
            if(!accessToken){
                const refreshTokenResponse = await axios.get(tokenRefreshURL, {withCredentials : true})
                accessToken = refreshTokenResponse.data.token
                localStorage.setItem("accessToken", accessToken)
            }
            const role = getUserRoleFromToken(accessToken)
            const user = getUserProfile(role, accessToken)
            setUser(user)
        }catch(error){
            console.log("Authentication failed:", error)
        }finally{
            setLoading(false)
        }
    }


    const accessToken = getAccessTokenFromLocalStorage()
    
    useEffect(
        ()=>{
            checkAuthentication()
            },
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