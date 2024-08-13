import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import ActiveRoomPostsList from "./ActiveRoomPostsList.jsx";

export default function AgentHome(){
    const {user} = useUserContext();
    const navigate = useNavigate();

    if(user && user.role==="AGENT"){
        return (
            <div className=" w-full flex justify-center items-center">
                <ActiveRoomPostsList/>
            </div>
        )
    }else{
        navigate("/")
    }
    
}