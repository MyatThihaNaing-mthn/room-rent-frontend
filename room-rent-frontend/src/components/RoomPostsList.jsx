
import RoomPostItem from "./RoomPostItem";
import { Link, useOutletContext } from "react-router-dom";


function RoomPostsList(){
    const {roomPosts} = useOutletContext()
    
    if(roomPosts == undefined){
        return <h1> Loading....</h1>
    }else{
        return <>
            {
                roomPosts.map((roomPost) => (
                <Link to={`/room-post/${roomPost.id}`} key={roomPost.id}>
                    <RoomPostItem roomPost={roomPost}/>
                </Link>
            ))
            }
        </> 
    }
}

export default RoomPostsList