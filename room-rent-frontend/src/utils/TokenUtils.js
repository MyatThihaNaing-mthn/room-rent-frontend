import axios from "axios"

const tokenRefreshURL = "http://localhost:8080/api/auth/refresh"

export default async function getJwtToken(){
    let token = localStorage.getItem("accessToken")
    if(token){
        return token
    }
    try{
        const response = await axios.get(tokenRefreshURL, {withCredentials: true})
        token = response.data.token;
        localStorage.setItem("accessToken", token)
        return token
    }catch(error){
        console.log("error refreshing access token")
    }
    return null;
}