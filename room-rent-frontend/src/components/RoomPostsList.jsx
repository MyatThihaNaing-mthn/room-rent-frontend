
import { useState, useEffect, useCallback } from "react";
import RoomPostItem from "./RoomPostItem";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";


// const roomPostsURL = "http://localhost:8080/api/v1/public/all-room-posts?pageNo=1&pageSize=4"

function RoomPostsList() {
    const [roomPosts, setRoomPosts] = useState(undefined);
    const [pageNo, setPageNo] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const url = `http://localhost:8080/api/v1/public/all-room-posts?pageNo=${pageNo}&pageSize=3`

    const location = useLocation()
    const [searchParams] = useSearchParams()

    const handlePageChange = (event) =>{
        console.log(event.selected)
        setPageNo(event.selected + 1)
    } 

    const fetchRoomPosts = useCallback(async () => {
        try {
            let roomPostResponse = await fetch(url + "&" + searchParams.toString())
            console.log(searchParams.toString())
            const roomPostData = await roomPostResponse.json()
            console.log(roomPostData)
            setRoomPosts(roomPostData.allRoomPosts)
            const totalPage = Math.ceil(roomPostData.totalContentSize / roomPostData.pageSize)
            setTotalPage(totalPage)
        } catch (error) {
            console.log("error fetching roompost list")
        }
    }, [searchParams, url])

    useEffect(
        () => { fetchRoomPosts() }
        , [fetchRoomPosts, location.search], pageNo);
    if (roomPosts == undefined) {
        return <h1> Loading....</h1>
    } else {
        return <div className=" w-full max-w-full flex flex-col justify-center items-center">
            <div className=" w-full flex items-center justify-center flex-wrap">
                {

                    roomPosts.map((roomPost) => (
                        <RoomPostItem roomPost={roomPost} key={roomPost.id} />

                    ))
                }
            </div>
            <Pagination onPageChange={handlePageChange} totalPage={totalPage}/>
        </div>
    }
}

export default RoomPostsList