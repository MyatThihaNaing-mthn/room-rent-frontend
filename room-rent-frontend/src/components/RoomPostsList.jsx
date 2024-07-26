
import { useState, useEffect, useCallback } from "react";
import RoomPostItem from "./RoomPostItem";
import { useLocation, useSearchParams } from "react-router-dom";


const roomPostsURL = "http://localhost:8080/api/public/all-room-posts?pageNo=1&pageSize=12"

function RoomPostsList(){
    const [roomPosts, setRoomPosts] = useState([]);

    const location = useLocation()
    const [searchParams] = useSearchParams()

    const fetchRoomPosts = useCallback(async() =>{
        let roomPostData = await fetch(roomPostsURL+"&"+searchParams.toString())
        console.log(searchParams.toString())
        try{
            const roomPostResponse = await roomPostData.json()
            console.log(roomPostResponse.allRoomPosts)
            setRoomPosts(roomPostResponse.allRoomPosts)
        }catch(error){
            setRoomPosts([])
            console.log("error fetching roompost list")
        }
    }, [searchParams])

    useEffect(
        ()=>{fetchRoomPosts()}
    , [fetchRoomPosts, location.search]);

    
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