import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import ActiveRoomPostsList from "./ActiveRoomPostsList.jsx";
import { useEffect } from "react";

export default function AgentHome(){
    const {user} = useUserContext();
    const navigate = useNavigate();

    const navigateToDefaultHomeWhenNotLogin = () => {
        if(user === null || user === undefined){
            navigate("/")
        }
    }
    
    useEffect(() => {
        navigateToDefaultHomeWhenNotLogin()
    },[])

    return (
        <div className=" w-full flex justify-center items-center">
            <ActiveRoomPostsList/>
        </div>
    )
    
}