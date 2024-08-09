import RoomPostForm from "./RoomPostForm";

export default function RoomPostEdit(){
    return (
        <div>
            <RoomPostForm mode="edit" roomPostId={3}/>
        </div>
    )
}