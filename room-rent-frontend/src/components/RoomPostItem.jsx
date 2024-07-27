//import { MdBedroomChild as BedroomIcon } from "react-icons/md";
import { IoTrainOutline as StationIcon } from "react-icons/io5";
import { MdAttachMoney as PriceIcon } from "react-icons/md";
import { PiBuildingLight as BuildingIcon } from "react-icons/pi";
import { IoLocationOutline as LocationIcon } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getTimePassedFromUTC from "../utils/DateUtils";
import { useUserContext } from "./UserContext";

function RoomPostItem({ roomPost }) {
    return (
        <div className='flex flex-col w-80 min-w-80 border shadow-lg rounded-lg mx-2 mb-2 cursor-pointer'>
            <div className="flex flex-col items-center justify-center xs:text-sm">
                <div className='roomPostThumbnail max-w-full w-full min-h-48 bg-center bg-cover border'
                    style={{ backgroundImage: `url(${roomPost.thumbnailImage})` }}>
                </div>
                <RoomPostSummary roomPost={roomPost} />
            </div>
        </div>
    )
}

function RoomPostSummary({ roomPost }) {
    return (
        <div className="flex flex-col px-3 w-full items-start font-light gap-2">
            <h3 className='self-start font-bold'>{roomPost.roomType} @ {roomPost.location}</h3>
            <div className=' flex w-full h-12 items-center justify-start text-sm'>
                <Station station={roomPost.stationName} />
                <Location location={roomPost.location} />
            </div>
            <div className=' flex w-full h-12 items-center justify-start text-sm'>
                <Price price={roomPost.price} />
                <PropertyType propertyType={roomPost.propertyType} />
            </div>
            <DetailButton roomPostId={roomPost.id} />
            <p className=' text-xxs self-end'>{getTimePassedFromUTC(roomPost.postedAt)}</p>
        </div>
    )
}


function Location({ location }) {
    return (
        <div className=' flex items-center justify-start w-full h-full flex-1'>
            <LocationIcon size={28} />
            {location}
        </div>
    )
}

function Station({ station }) {
    return (
        <div className=' flex items-center justify-start w-full h-full flex-1'>
            <StationIcon size={28} />
            {station}
        </div>
    )
}

function Price({ price }) {
    return (
        <div className=' flex items-center justify-start w-full h-full flex-1'>
            <PriceIcon size={28} />
            {price}
        </div>
    )
}

function PropertyType({ propertyType }) {
    return (
        <div className=' flex items-center justify-start w-full h-full flex-1'>
            <BuildingIcon size={28} />
            {propertyType}
        </div>
    )
}

function DetailButton({ roomPostId }) {
    const {user} = useUserContext()
    const navigate = useNavigate();
    const detailsBtnHandler = () => {
        if(user && user.role === "AGENT"){
            navigate(`/agent/room-post/${roomPostId}`)
        }else{
            navigate(`/room-post/${roomPostId}`)
        }
        
    }
    return <button className=" w-28 h-12 bg-white border-gray-400 transition-colors duration-300
            border-2 rounded self-end hover:bg-green-400 hover:text-white "
        onClick={detailsBtnHandler}>
        View Room
    </button>
}
export default RoomPostItem