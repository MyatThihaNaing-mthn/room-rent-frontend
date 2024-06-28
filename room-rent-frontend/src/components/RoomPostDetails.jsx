import { useParams } from "react-router-dom";
import AgentCard from "./AgentCard";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";

const roomPostDetailsUrl = "http://localhost:8080/api/public/room-post/";
function RoomPostDetails() {
    const params = useParams();

    const url = roomPostDetailsUrl+params.id;
    const [roomPostData, setRoomPostData] = useState();
    const [isLoading, setLoading] = useState(true);

    async function getRoomPostDetails(){
        let roomPostDetails = await fetch(url)
        const roomPost = await roomPostDetails.json()
        setRoomPostData(roomPost);
        console.log(roomPost.roomPhotos)
        setLoading(false)
    }

    useEffect(
        ()=>{getRoomPostDetails();}
    ,[]);


    if(isLoading){
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
                <RoomPostDescription roomPost={roomPostData}/>
            </div>
           <div>
                <AgentCard agent={roomPostData.agent}/>
           </div>
        </div>
    )
}

function RoomPostDescription({ roomPost }) {
    return (
        <div className=" w-full h-full flex flex-col justify-center relative">
            <div className=" text-start p-4 gap-2 flex flex-col justify-center">
                <h2 className=" text-lg font-bold">{roomPost.location}</h2>
                <p>Nearest MRT: {roomPost.stationName}</p>
                <div className=" w-fit h-fit p-2 bg-gray-800 text-white rounded-sm">
                    <p>{roomPost.roomType}</p>
                </div>
                <p>s$ {roomPost.price}/mo</p>
            </div>

            <div className="p-4">
                <h2 className=" text-lg font-bold text-start">Description</h2>
                <p className=" font-light text-left">{roomPost.description}</p>
            </div>
            <div className="p-4">
                <h2 className=" text-lg font-bold text-start">Features</h2>
                <div className=" grid grid-cols-2 text-justify text-sm">
                    <p className=" p-2 border-b ">Property Type:</p>
                    <p className=" p-2 border-b ">{roomPost.propertyType}</p>
                    <p className=" p-2 border-b ">Room Type:</p>
                    <p className=" p-2 border-b ">{roomPost.roomType}</p>
                    <p className=" p-2 border-b ">Total Pax:</p>
                    <p className=" p-2 border-b ">{roomPost.totalPax}</p>
                    <p className=" p-2 border-b ">Cooking Allowance:</p>
                    <p className=" p-2 border-b ">{roomPost.cookingAllowance}</p>
                    <p className=" p-2 border-b ">PUB:</p>
                    <p className=" p-2 border-b ">{roomPost.sharePub}</p>
                    <p className=" p-2 border-b ">Visitor:</p>
                    <p className=" p-2 border-b ">{roomPost.allowVisitor? 'Yes' : 'No'}</p>
                    <p className=" p-2 border-b ">Nearest Station:</p>
                    <p className=" p-2 border-b ">{roomPost.stationName}</p>
                </div>
            </div> 
        </div>
    )
}
export default RoomPostDetails;

