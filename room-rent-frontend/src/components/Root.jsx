import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useState, useEffect } from "react";

function Root(){
    const [roomPosts, setRoomPosts] = useState([]);
    const [searchParams, setSearchParams] = useState();

    async function getRoomPosts(){
        let roomPostData = await fetch("http://localhost:8080/api/public/all-room-posts?pageNo=1&pageSize=2")
        const roomPostResponse = await roomPostData.json()
        setRoomPosts(roomPostResponse.allRoomPosts)
        setSearchParams(roomPostResponse.searchParams)
    }

    useEffect(
        ()=>{getRoomPosts();}
    ,[]);

    return(
        <div className=" h-full w-full">
            <Navbar searchParams={searchParams}/>
            <Outlet context={{roomPosts}}/>
        </div>
    )
}


export default Root