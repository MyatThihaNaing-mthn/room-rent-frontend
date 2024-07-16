import { useEffect, useState } from "react";
import RoomPostItem from "../RoomPostItem";
import axios from "axios";

const activeRoomPostsUrl = "http://localhost:8080/api/agent/room-post/active"

const getConfig = () =>{
    const accessToken = localStorage.getItem("accessToken")
    const config = {
        headers : {
            "Authorization" : `Bearer ${accessToken}`
        }
    }
    return config;
}

export default function ActiveRoomPostsList(){
    const[activeRoomPosts, setActiveRoomPosts] = useState();

    const getActiveRoomPost = async() => {
        const config = getConfig()
        const response = await axios.get(activeRoomPostsUrl, config)
        const roomPosts  = response.data
        setActiveRoomPosts(roomPosts)
    }

    useEffect(
        ()=>{getActiveRoomPost()},[]
    )

    return (
        <div className=" w-full max-w-full flex items-center justify-center flex-wrap">
            {activeRoomPosts ? activeRoomPosts.map(roomPost => <RoomPostItem key={roomPost.id} roomPost={roomPost}/>) : "Loading" }
        </div>
    )
}
