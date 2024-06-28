import StringUtils from '../utils/StringUtils'

function RoomPostItem({roomPost}){
    return (
        <div className='flex flex-col border shadow-md rounded mx-2 mb-2 p-3 cursor-pointer'>
            <h3 className='self-start'>{roomPost.roomType} @ {roomPost.location}</h3>
            <div className="flex items-center justify-center xs:text-sm">
            <div className='roomPostThumbnail xs:w-16 xs:h-16'>
                <img src={roomPost.thumbnailImage} className=" max-h-full w-full object-cover"/>
            </div>
            <RoomPostSummary roomPost={roomPost}/>
        </div>
        </div>
    )
}

function RoomPostSummary({roomPost}){
    return (
        <div className="flex flex-col flex-grow items-start ml-4 font-light">
           <p>s${roomPost.price} /mo</p>
           <p>{StringUtils.capitalize(roomPost.stationName)} MRT</p>
           <p>{StringUtils.capitalize(roomPost.propertyType)}</p>
           <p className=' text-xxs self-end'>{roomPost.postedAt}</p>
        </div>
    )
}

export default RoomPostItem