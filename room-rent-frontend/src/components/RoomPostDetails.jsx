import AgentCard from "./AgentCard";
import ImageCarousel from "./ImageCarousel";


function RoomPostDetails({roomPost}) {
    const images = [
        {
            "url": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        },
        {
            "url": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
            "url": "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        },
        {
            "url": "https://images.unsplash.com/photo-1719216323699-79e62fbc6a56?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const mockRoomPost = {
        "id": 2,
        "stationName": "Orchard",
        "price": 1000.0,
        "roomType": "Master Room",
        "totalPax": 2,
        "cookingAllowance": "Cooking Allowed",
        "sharePub": "share PUB",
        "airConTime": "Unlimited",
        "allowVisitor": false,
        "location": "Orchard",
        "propertyType": "condominium",
        "description": "Live in a home away from home. Connect and bond with neighbors of diverse nationalities. Enjoy peerless service by Residence Concierge, Capella Singapore and the dedicated Property Management team, which delivers unobtrusive, meeting and anticipating residents' needs. No request is too small and the most challenging requests are welcomed",
        "agent": {
            "id": 1,
            "username": "tester1",
            "role": "AGENT",
            "email": "tester1@test.com",
            "phoneNumber": "09383733",
            "profilePhoto": "IMG_1690.JPG",
            "createdAt": "2024-06-21T12:23:04.403+00:00"
        },
        "postedAt": "2024-06-21T12:26:42.587+00:00",
        "roomPhotos": [
            {
                "id": 2,
                "imageUrl": "https://d16uutppy0f24v.cloudfront.net/about_us.png",
                "filename": "about_us.png"
            }
        ]

    }

    const agent = {
        "id": 1,
            "username": "Micheal Lam",
            "role": "AGENT",
            "email": "tester1@test.com",
            "phoneNumber": "09383733",
            "profilePhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTlHOIDT1fFfYhabUc7o-Pc08bqihLYc5XDKW-xRGFlUQJDs-rDs-IDKKxB1tl_m1wPY&usqp=CAU",
            "createdAt": "2024-06-21T12:23:04.403+00:00"
    }
    return (
        <div className="w-full h-full flex flex-col">
            <div className=" min-h-80 h-1/2 w-full flex">
                <ImageCarousel images={images} />
            </div>
            <div className="w-full flex flex-col">
                <RoomPostDescription roomPost={mockRoomPost}/>
            </div>
           <div>
                <AgentCard agent={agent}/>
           </div>
        </div>
    );
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

