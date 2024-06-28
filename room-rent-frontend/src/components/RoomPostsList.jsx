import { useEffect, useState } from "react"
import RoomPostItem from "./RoomPostItem";
import { Link } from "react-router-dom";


function RoomPostsList(){
    const [isLoading, setLoading] = useState(true)
    const [roomPosts, setRoomPosts] = useState([]);

    async function getRoomPosts(){
        let roomPostData = await fetch("http://localhost:8080/api/public/all-room-posts?pageNo=1&pageSize=2")
        const roomPostResponse = await roomPostData.json()
        setRoomPosts(roomPostResponse.allRoomPosts)
        setLoading(false)
    }

    useEffect(
        ()=>{getRoomPosts();}
    ,[]);
    console.log(roomPosts)
    const roomPostListView = roomPosts.map((roomPost) => (
        <Link to={`/room-post/${roomPost.id}`} key={roomPost.id}>
            <RoomPostItem roomPost={roomPost}/>
        </Link>
    ));
    if(isLoading){
        return <h1> Loading....</h1>
    }else{
        return <>
            {roomPostListView}
        </> 
    }
}

export default RoomPostsList