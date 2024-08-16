import RoomPostForm from "./RoomPostForm";

export default function RoomPostEdit({roomPost, update}){
    return (
        <div>
            <RoomPostForm mode="edit" roomPost={roomPost} update={update}/>
        </div>
    )
}