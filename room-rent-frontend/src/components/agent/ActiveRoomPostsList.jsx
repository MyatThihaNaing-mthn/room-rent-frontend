import { useEffect, useState } from "react";
import RoomPostItem from "../RoomPostItem";
import axios from "axios";
import Pagination from "../Pagination";

const pageSize = 4;
const baseUrl = "http://localhost:8080/api/v1/agent/room-post/active"

const getConfig = () => {
    const accessToken = localStorage.getItem("accessToken")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return config;
}

export default function ActiveRoomPostsList() {
    const [activeRoomPosts, setActiveRoomPosts] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    
    const handlePageChange = (e) => {
        console.log(e.selected)
        setPageNo(e.selected+1)
    }

    const getActiveRoomPost = async () => {
        const config = getConfig()
        const activeRoomPostsUrl = `${baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}`
        console.log(activeRoomPostsUrl)
        const response = await axios.get(activeRoomPostsUrl, config)
        const roomPosts = response.data.allRoomPosts
        console.log(roomPosts)
        const totalPages = Math.ceil(response.data.totalContentSize / response.data.pageSize)
        console.log(totalPages)
        setTotalPage(totalPages)
        setActiveRoomPosts(roomPosts)
    }

    useEffect(
        () => { getActiveRoomPost() }, [pageNo]
    )

    return (
        <div className=" w-full max-w-full flex flex-col justify-center items-center">
            <div className=" w-full max-w-full flex items-center justify-center flex-wrap">
                {activeRoomPosts ? activeRoomPosts.map(roomPost => <RoomPostItem key={roomPost.id} roomPost={roomPost} />) : "Loading"}
            </div>
            <Pagination onPageChange={handlePageChange} totalPage={totalPage}/>
        </div>
    )
}
