import axios from "axios";
import { useEffect, useState } from "react"
import DropDownItem from "../menu/DropDownItem";
import MultiImagePicker from "./MultiImagePicker";

const metaDataURL = "http://localhost:8080/api/agent/room-post"
const roomPostRegisterURL = "http://localhost:8080/api/agent/room-post"
export default function RoomPostRegister() {
    const [roomPostRegisterMetadata, setRoomPostRegisterMetadata] = useState();
    const [roomPost, setRoomPost] = useState();

    // TODO fix duplicate code for header config

    const getConfig = () => {
        const accessToken = localStorage.getItem("accessToken")
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        return config
    }

    const getRoomPostRegisterMetadata = async () => {
        try {
            const response = await axios.get(metaDataURL, getConfig());
            setRoomPostRegisterMetadata(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createRoomPostRequest = () => {
        const formData = new FormData();
        for(const [key, value] of Object.entries(roomPost)){
            if(key !== "roomPhotoFiles"){
                formData.append(key, value)
            }else if(key === "roomPhotoFiles"){
                for (let i = 0; i < roomPost.roomPhotoFiles.length; i++) {
                    formData.append("roomPhotoFiles", roomPost.roomPhotoFiles[i])
                    console.log(typeof roomPost.roomPhotoFiles[i])
                }
            }
        }
        return formData
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        console.log("submitting")
        const accessToken = localStorage.getItem("accessToken")
        const formData = createRoomPostRequest()
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type" : "multipart/form-data"
            }
        }
        try{
            const response = await axios.post(roomPostRegisterURL, formData, config)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(
        () => { getRoomPostRegisterMetadata() },
        []
    )

    console.log(roomPost)

    return (
        roomPostRegisterMetadata ?
            <form className=" w-full flex flex-col px-4"
                    onSubmit={onSubmitHandler}>
                <h1 className=" text-4xl font-extrabold my-2">
                    Room Rental Registration
                </h1>
                <RoomDetailsSection 
                    metadata={roomPostRegisterMetadata}
                    roomPost={roomPost} 
                    setRoomPost={setRoomPost} />
                <PreferenceSection 
                    metadata={roomPostRegisterMetadata} 
                    roomPost={roomPost} 
                    setRoomPost={setRoomPost} />
                <LocationSection 
                    metadata={roomPostRegisterMetadata} 
                    roomPost={roomPost} 
                    setRoomPost={setRoomPost} />
                <MultiImagePicker
                    setRoomPost={setRoomPost}
                    roomPost={roomPost}
                />
                <button type="submit">Create</button>
            </form>
            :
            "Wait..."
    )
}

function RoomDetailsSection({ metadata, roomPost, setRoomPost }) {

    const handleInputChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        setRoomPost(
            {
                ...roomPost,
                [name] : value
            }
        )
    }

    return (
        <div className=" w-full flex flex-col items-center justify-center gap-2">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="address"
                    className=" w-1/3 mb-auto text-left">
                    Address:
                </label>
                <textarea
                    id="address"
                    name="address"
                    className=" w-1/3 border h-14"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="description"
                    className=" w-1/3 mb-auto text-left">
                    Description:
                </label>
                <textarea id="description"
                    name="description"
                    className=" w-1/3 xs:w-1/2 border h-32"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="price"
                    className=" w-1/3 mb-auto text-left">
                    Price
                </label>
                <input type="text"
                    id="price"
                    name="price"
                    placeholder="SGD"
                    className="border w-24 h-10 text-right"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="totalPax"
                    className=" w-1/3 mb-auto text-left">
                    Total Person
                </label>
                <input type="text"
                    id="totalPax"
                    name="totalPax"
                    className="border w-24 h-10 text-right"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="roomType"
                    className=" w-1/3 mb-auto text-left">
                    Room Type:
                </label>
                <div className=" w-3/5 flex items-center justify-center">
                    <DropDownItem id={"roomType"} options={metadata.roomType} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="propertyType"
                    className=" w-1/3 mb-auto text-left">
                    Property Type:
                </label>
                <div className=" w-3/5 flex items-center justify-center">
                    <DropDownItem id={"propertyType"} options={metadata.propertyType} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
        </div>
    )
}

function PreferenceSection({ metadata, roomPost, setRoomPost }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="cookingAllowance"
                    className=" w-1/3 mb-auto text-left">
                    Cooking:
                </label>
                <div className=" w-3/5">
                    <DropDownItem id={"cookingAllowance"} options={metadata.cookingAllowance} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="sharePub"
                    className=" w-1/3 mb-auto text-left">
                    PUB:
                </label>
                <div className=" w-3/5">
                    <DropDownItem id={"sharePub"} options={metadata.sharePub} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="airConTime"
                    className=" w-1/3 mb-auto text-left">
                    Air-Con Time:
                </label>
                <div className=" w-3/5">
                    <DropDownItem id={"airConTime"} options={metadata.airConTime} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="allowVistor"
                    className=" w-1/3 mb-auto text-left">
                    Visitor:
                </label>
                <div className=" w-3/5">
                    <AllowVisitor roomPost={roomPost} setRoomPost={setRoomPost}/>
                </div>
            </div>
        </div>
    )
}

function LocationSection({ metadata, roomPost, setRoomPost }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="stationName"
                    className=" w-1/3 mb-auto text-left">
                    Nearest Station:
                </label>
                <div className=" w-3/5">
                    <DropDownItem id={"stationName"} options={metadata.stationName} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="location"
                    className=" w-1/3 mb-auto text-left">
                    Location:
                </label>
                <div className=" w-3/5">
                    <DropDownItem id={"location"} options={metadata.location} filterParams={roomPost} filterBuilder={setRoomPost} />
                </div>
            </div>
        </div>
    )
}

function AllowVisitor({roomPost, setRoomPost}){
    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setRoomPost(
            {
                ...roomPost,
                [name] : value === "allow"? true : false
            }
        )
    }
    return(
        <div className=" w-full flex p-2 items-center gap-2 justify-center">
            <input type="radio" 
                    id="allowed" 
                    name="allowVisitor" 
                    value="allow"
                    onChange={onChangeHandler}
                    />
            <label htmlFor="allowed">Allow</label> 
            <br></br>
            <input type="radio" 
                    id="notAllowed" 
                    name="allowVisitor" 
                    value="notAllow"
                    onChange={onChangeHandler}
                    />
            <label htmlFor="notAllowed">Not Allow</label> 
            <br></br>
        </div>
    )
}