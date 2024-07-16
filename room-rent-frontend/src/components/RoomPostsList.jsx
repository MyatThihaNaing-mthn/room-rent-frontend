
import { useState, useEffect } from "react";
import RoomPostItem from "./RoomPostItem";
import { useLocation } from "react-router-dom";


const roomPostsURL = "http://localhost:8080/api/public/all-room-posts?pageNo=1&pageSize=8"

function RoomPostsList(){
    const [roomPosts, setRoomPosts] = useState([]);

    const {search} = useLocation()
    const filters = new URLSearchParams(search)

    const fetchRoomPosts = async() =>{
        let roomPostData = await fetch(roomPostsURL+"&"+filters.toString())
        console.log(roomPostsURL+"&"+filters.toString())
        const roomPostResponse = await roomPostData.json()
        setRoomPosts(roomPostResponse.allRoomPosts)
    }

    useEffect(
        ()=>{fetchRoomPosts();}
    , [search]);

    
    if(roomPosts == undefined){
        return <h1> Loading....</h1>
    }else{
        return <div className=" w-full max-w-full flex items-center justify-center flex-wrap">
            {

                roomPosts.map((roomPost) => (
                    <RoomPostItem roomPost={roomPost} key={roomPost.id}/>

            ))
            }
        </div> 
    }
}

export default RoomPostsList