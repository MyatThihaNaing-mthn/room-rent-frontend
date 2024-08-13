
import { useNavigate } from "react-router-dom";
import RoomPostsList from "./RoomPostsList";
import { useUserContext } from "./UserContext"
import { useEffect } from "react";

export default function Home(){
    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(
        () => {
            if(user && user.role === "AGENT"){
                navigate("/agent")
            }
        }, [user, navigate]
    )

    if(user && user.role === "AGENT"){
        return null;
    }else{
        return (
            <div className=" w-full flex justify-center items-center">
                <RoomPostsList/>
            </div>
        )
    }
    
}