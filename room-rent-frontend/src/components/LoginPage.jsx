import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"

const singInURL = "http://localhost:8080/api/auth/agent/login"
const agentProfileURL = "http://localhost:8080/api/agent/profile"
const adminProfileURL = "http://localhost:8080/api/admin/profile"

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

function getUserRoleFromToken(token){
    try{
        const user = jwtDecode(token).user
        return user.role.toLowerCase()
    }catch(error){
        return null
    }
}

export function LoginPage() {

    const {user, setUser} = useUserContext()
    const navigate = useNavigate()
    
    useEffect(
        ()=>{
            if (user) {
                console.log(user)
                navigate("/")
            }
        }, [user, navigate]
    )

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const doLogIn = async() =>{
        const response = await axios.post(singInURL,
            {
                username : username,
                password : password
            },{
                withCredentials : true
            }
        )
        const authResponse = response.data;
        const accessToken = authResponse.token;
        localStorage.setItem("accessToken", accessToken)
        const role = getUserRoleFromToken(accessToken);
        console.log("Token", accessToken)
        const currentUser = await getUserProfile(role, accessToken);
        console.log("User response", currentUser)
        setUser(currentUser)
        navigate("/")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        try{
            doLogIn()
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className=" w-full h-full-container flex items-center justify-center">
            <form className=" w-3/4 flex flex-col items-center justify-center gap-2"
                onSubmit={(e)=> submitHandler(e)}>
                <input type="text"
                    placeholder="Username"
                    alt="username field"
                    className=" w-full h-12 border shadow-lg p-2 text-sm font-light"
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input type="password"
                    placeholder="Password"
                    alt="password field"
                    className=" w-full h-12 border shadow-lg p-2 text-sm font-light"
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <button type="submit"
                        className=" w-full h-12 border shadow-lg p-2 text-sm font-bold bg-slate-600 text-white">
                    Log in
                </button>
                <button className="w-full h-12 border shadow-lg p-2 text-sm font-bold bg-red-300 text-white">
                    Sign up?
                </button>
            </form>
        </div>
    )
}