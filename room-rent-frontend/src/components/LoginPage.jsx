import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const singInURL = "http://localhost:8080/api/auth/agent/login"

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

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(singInURL, {
            username : username,
            password : password
        },{
            withCredentials: true
        })
            .then(function (response) {
                localStorage.setItem("accessToken", response.data.token)
                console.log(jwtDecode(response.data.token))
                setUser(response.data)
                console.log(user);
            })
            .catch(function (error) {
                console.log(error);
            })
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