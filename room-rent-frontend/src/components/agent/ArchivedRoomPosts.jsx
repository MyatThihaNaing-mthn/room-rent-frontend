import axios from "axios"
import { getAuthConfig } from "../../utils/ConfigUtils"
import { useEffect, useState } from "react"
import RoomPostItem from "../RoomPostItem";
import Pagination from "../Pagination";

// TODO externalize constants
const pageSize = 4;
const archivedRoomPostsUrl = "http://localhost:8080/api/v1/agent/room-post/archived"
export default function ArchivedRoomPosts(){
    const[archivedRoomPosts, setArchivedRoomPosts] = useState()
    const[pageNo, setPageNo] = useState(1)
    const[totalPage, setTotalPage] = useState(0)

    const fetchArchivedRoomPosts = async(url) => {
        const authConfig = await getAuthConfig()
        try{
            const response = await axios.get(url, authConfig)
            console.log(response)
            setArchivedRoomPosts(response.data.allRoomPosts)
            const totalPages = Math.ceil(response.data.totalContentSize / response.data.pageSize)
            setTotalPage(totalPages)
        }catch(error){
            console.log("error fetching archived room posts...", error)

        }
    }
    const handlePageChange = (e) => {
        console.log(e.selected)
        setPageNo(e.selected+1)
    }

    useEffect(()=> {
        const url = `${archivedRoomPostsUrl}?pageNo=${pageNo}&pageSize=${pageSize}`
        fetchArchivedRoomPosts(url)
    }, [pageNo])

    return (
        <div className=" w-full max-w-full flex flex-col justify-center items-center">
            <div className=" w-full max-w-full flex items-center justify-center flex-wrap">
                {archivedRoomPosts ? archivedRoomPosts.map(roomPost => <RoomPostItem key={roomPost.id} roomPost={roomPost} />) : "Loading"}
            </div>
            <Pagination onPageChange={handlePageChange} totalPage={totalPage}/>
        </div>
    )
}