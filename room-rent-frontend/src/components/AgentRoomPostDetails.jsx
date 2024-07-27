import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel"
import { RoomPostDescription } from "./RoomPostDetails"
import { useParams } from "react-router-dom";
const roomPostDetailsUrl = "http://localhost:8080/api/public/room-post/";
export default function AgentRoomPostDetails(){
    const params = useParams()
    const url = roomPostDetailsUrl + params.id;

    const [roomPostData, setRoomPostData] = useState()
    const [isLoading, setLoading] = useState(true)

    async function getRoomPostDetails() {
        let roomPostDetails = await fetch(url)
        const roomPost = await roomPostDetails.json()
        setRoomPostData(roomPost);
        setLoading(false)
    }

    useEffect(
        () => {
            getRoomPostDetails()
        }
        , []);


    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    return (
        <div className="w-full h-full flex flex-col">
            <div className=" min-h-80 h-1/2 w-full flex">
                <ImageCarousel images={roomPostData.roomPhotos} />
            </div>
            <div className="w-full flex flex-col">
                <RoomPostDescription roomPost={roomPostData} />
            </div>
            <div className=" flex justify-between p-4">
                <ArchiveBtn roomPostId={roomPostData.id} />
                <EditBtn roomPostId={roomPostData.id} />
            </div>
        </div>
    )
}

function ArchiveBtn({roomPostId}){
    const archiveHandler = async() =>{
        console.log("To archive the roompost", roomPostId)
    }
    return (
        <button className="w-28 h-12 bg-white border-gray-400 transition-colors duration-300
             border-2 rounded hover:bg-green-400 hover:text-white"
                onClick={archiveHandler}>
            Archive
        </button>
    )
}

function EditBtn({roomPostId}){
    const editHandler = async() => {
       console.log("Edit room post..", roomPostId)
    }
    return (
        <button className="w-28 h-12 bg-white border-gray-400 transition-colors duration-300
             border-2 rounded hover:bg-green-400 hover:text-white"
                onClick={editHandler}>
            Edit
        </button>
    )
}