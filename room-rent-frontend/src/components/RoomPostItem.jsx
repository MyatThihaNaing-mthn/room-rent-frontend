import StringUtils from '../utils/StringUtils'

function RoomPostItem({roomPost}){
    console.log(roomPost)
    let imageUrl = roomPost.roomPhotos[0].imageUrl;
    return (
        <div className="flex p-4 items-center justify-center xs:text-sm border shadow border-teal-950 rounded m-2">
            <img src={imageUrl} className=" xs:w-8 ws:h-8"></img>
            <RoomPostSummary roomPost={roomPost}/>
        </div>
    )
}

function RoomPostSummary({roomPost}){
    return (
        <div className="flex flex-col flex-grow items-start ml-6">
           <h3>{roomPost.roomType} @ {roomPost.location}</h3>
           <p>{roomPost.price} /mth</p>
           <p>{StringUtils.capitalize(roomPost.stationName)} MRT</p>
           <p>{StringUtils.capitalize(roomPost.propertyType)}</p>
           <p className=' text-xxs self-end'>{roomPost.postedAt}</p>
        </div>
    )
}

export default RoomPostItem