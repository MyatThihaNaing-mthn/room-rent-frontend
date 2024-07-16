import AgentHome from "./agent/AgentHome";
import RoomPostsList from "./RoomPostsList";
import { useUserContext } from "./UserContext"

export default function Home(){
    const {user} = useUserContext();
    let homePage;
    if(user){
        homePage = <AgentHome/>
    }else{
        homePage = <RoomPostsList/>
    }
    console.log("home page")
    console.log(user)
    return (
        <div className=" w-full flex justify-center items-center">
            {homePage}
        </div>
    )
}