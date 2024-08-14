import RoomPostForm from "./RoomPostForm";

export default function RoomPostEdit({roomPost}){
    return (
        <div>
            <RoomPostForm mode="edit" roomPost={roomPost}/>
        </div>
    )
}