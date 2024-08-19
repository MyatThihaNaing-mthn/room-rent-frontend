import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel"
import { RoomPostDescription } from "./RoomPostDetails"
import { useNavigate, useParams } from "react-router-dom";
import RoomPostEdit from "./agent/RoomPostEdit";
import axios from "axios";
import { getAuthConfig } from "../utils/ConfigUtils";

const roomPostDetailsUrl = "http://localhost:8080/api/v1/public/room-post/";
const roomPostArchiveUrl = "http://localhost:8080/api/v1/agent/room-post/archive/";
const roomPostActivateUrl = "http://localhost:8080/api/v1/agent/room-post/activate/"
export default function AgentRoomPostDetails() {

    const [isEdit, setEdit] = useState(false)
    const params = useParams()
    const url = roomPostDetailsUrl + params.id;
    const [roomPostData, setRoomPostData] = useState()
    const [isLoading, setLoading] = useState(true)

    const editHandler = () => {
        setEdit(true)
    }

    const updateHandler = () => {
        setEdit(false)
    }

    async function getRoomPostDetails() {
        let roomPostDetails = await fetch(url)
        const roomPost = await roomPostDetails.json()
        setRoomPostData(roomPost);
        setLoading(false)
    }
    console.log(roomPostData)

    useEffect(
        () => {
            getRoomPostDetails()
        }
        , [params.id, isEdit]);


    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    return (
        <div className="w-full h-full flex flex-col">
            {isEdit ? <RoomPostEdit roomPost={roomPostData} update={updateHandler} /> :
                <>
                    <div className=" min-h-80 h-1/2 w-full flex">
                        <ImageCarousel images={roomPostData.roomPhotos} />
                    </div>
                    <div className="w-full flex flex-col">
                        <RoomPostDescription roomPost={roomPostData} />
                    </div>
                    <div className=" flex justify-between p-4">
                        <ArchiveBtn roomPostId={roomPostData.id} hasArchived={roomPostData.archived}/>
                        <EditBtn editHandler={editHandler} />
                    </div>
                </>}
        </div>
    )
}

function ArchiveBtn({ roomPostId, hasArchived }) {
    const url = hasArchived ? roomPostActivateUrl + roomPostId : roomPostArchiveUrl + roomPostId
    const navigate = useNavigate()

    const clickHandler = async () => {
        const config = await getAuthConfig()
        console.log(config)
        try {
            const response = await axios.put(url, null, config)
            if (response.status === 201) {
                navigate("/agent")
            }
        } catch (error) {
            console.log("Error archiving roompost..", error)
        }
    }
    return (
        <button className="w-28 h-12 bg-white border-gray-400 transition-colors duration-300
             border-2 rounded hover:bg-green-400 hover:text-white"
            onClick={clickHandler}>
            {hasArchived ? "Re-Activate" : "Archive"}
        </button>
    )
}

function EditBtn({ editHandler }) {
    return (
        <button className="w-28 h-12 bg-white border-gray-400 transition-colors duration-300
             border-2 rounded hover:bg-green-400 hover:text-white"
            onClick={editHandler}>
            Edit
        </button>
    )
}