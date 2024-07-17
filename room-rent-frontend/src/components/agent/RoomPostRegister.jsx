import axios from "axios";
import { useEffect, useState } from "react"
import DropDownItem from "../menu/DropDownItem";

const metaDataURL = "http://localhost:8080/api/agent/room-post"
export default function RoomPostRegister() {
    const [roomPostRegisterMetadata, setRoomPostRegisterMetadata] = useState();
    const [roomPost, setRoomPost] = useState();

    // TODO fix duplicate code for header config

    const getRoomPostRegisterMetadata = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        try {
            const response = await axios.get(metaDataURL, config);
            setRoomPostRegisterMetadata(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(roomPost)

    useEffect(
        () => { getRoomPostRegisterMetadata() },
        []
    )

    return (
        roomPostRegisterMetadata?
        <div className=" w-full flex flex-col">
            <RoomDetailsSection metadata={roomPostRegisterMetadata} roomPost={roomPost} setRoomPost={setRoomPost} />
            <PreferenceSection metadata={roomPostRegisterMetadata} roomPost={roomPost} setRoomPost={setRoomPost}/>
            <LocationSection metadata={roomPostRegisterMetadata} roomPost={roomPost} setRoomPost={setRoomPost} />
        </div>
        :
        "Wait..."
    )
}

function RoomDetailsSection({ metadata, roomPost, setRoomPost }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="address"
                        className=" w-1/3">Address:</label>
                <input type="text"
                    id="address"
                    name="address"
                    className=" w-1/3"
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="description"
                        className=" w-1/3">Description:</label>
                <textarea id="description"
                    name="description"
                    className=" w-1/3"
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="price"
                className=" w-1/3">Price</label>
                <input type="text"
                    id="price"
                    name="price"
                    className=" w-1/3"
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="totalPax"
                className=" w-1/3">Total Person</label>
                <input type="text"
                    id="totalPax"
                    name="totalPax"
                    className=" w-1/3"
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="roomType"
                className=" w-1/3">Room Type:</label>
                <div className=" w-3/5 flex items-center justify-center">
                    <DropDownItem id={"roomType"} options={metadata.roomType} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
        </div>
    )
}

function PreferenceSection({metadata, roomPost, setRoomPost}){
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="cookingAllowance"
                className=" w-1/3">Cooking:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"cookingAllowance"} options={metadata.cookingAllowance} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="sharePub"
                className=" w-1/3">PUB:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"sharePub"} options={metadata.sharePub} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="airConTime"
                className=" w-1/3">Air-Con Time:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"airConTime"} options={metadata.airConTime} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="allowVistor"
                className=" w-1/3">Visitor:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"allowVisitor"} options={["Allow", "Not Allow"]} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
        </div>
    )
}

function LocationSection({metadata, roomPost, setRoomPost}){
    return (
        <div className=" w-full flex flex-col items-center justify-center">
           <div className=" flex w-full justify-start items-center">
                <label htmlFor="stationName"
                className=" w-1/3">Nearest Station:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"stationName"} options={metadata.stationName} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="location"
                className=" w-1/3">Location:</label>
                <div className=" w-3/5">
                    <DropDownItem id={"location"} options={metadata.location} filterParams={roomPost} filterBuilder={setRoomPost}/>
                </div>
            </div>
        </div>
    )
}