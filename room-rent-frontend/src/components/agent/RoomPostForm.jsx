import axios from "axios";
import { useEffect, useState } from "react"
import DropDownItem from "../menu/DropDownItem";
import MultiImagePicker from "./MultiImagePicker";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UploadLoading from "../UploadLoading";

const metaDataURL = "http://localhost:8080/api/v1/agent/room-post-data"
const roomPostRegisterURL = "http://localhost:8080/api/v1/agent/room-post"
const errorSpanClassName = "text-sm text-red-700"

export default function RoomPostForm({mode, roomPost}) {
    const [roomPostRegisterMetadata, setRoomPostRegisterMetadata] = useState();
    const { register, 
            handleSubmit,
            control,
            watch,
            formState: { errors },
            reset
         } = useForm();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    
    // TODO fix duplicate code for header config
    const data = watch()
    console.log(data)

    const getConfig = () => {
        const accessToken = localStorage.getItem("accessToken")
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        return config
    }

    const showRoomPostDetails = () => {
        reset(roomPost)
        console.log(roomPost)
    }


    const getRoomPostRegisterMetadata = async() => {
        try {
            const response = await axios.get(metaDataURL, getConfig());
            setRoomPostRegisterMetadata(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createRoomPostFormData = (data) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if (key !== "roomPhotoFiles" && value) {
                formData.append(key, value)
            } else if (key === "roomPhotoFiles" && value) {
                for (let i = 0; i < data.roomPhotoFiles.length; i++) {
                    formData.append("roomPhotoFiles", data.roomPhotoFiles[i])
                    console.log(typeof data.roomPhotoFiles[i])
                }
            }
        }
        return formData
    }
    const onSubmit = async (data) => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken")
        const formData = createRoomPostFormData(data)
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            }
        }
       
        try {
            let response;
            if(mode === "register"){
                response = await axios.post(roomPostRegisterURL, formData, config)
            }else if(mode === "edit" && roomPost){
                const url = roomPostRegisterURL+"/"+roomPost.id
                response = await axios.put(url, formData, config)
                reset(response.data)
            }
            navigate("/")
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(
        () => { 
            getRoomPostRegisterMetadata()
            if(mode === "edit" && roomPost){
                showRoomPostDetails()
                console.log(roomPost)
            }
            },
        [mode]
    )

    return (
        roomPostRegisterMetadata ?
            <div className="w-full flex flex-col">
                {isLoading && <UploadLoading/>}
                <form className=" w-full flex flex-col px-4"
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className=" text-4xl font-extrabold my-2">
                    Room Rental Registration
                </h1>
                <RoomDetailsSection
                    metadata={roomPostRegisterMetadata}
                    onChangeValue={register}
                    errors={errors}
                    control={control} />
                <PreferenceSection
                    metadata={roomPostRegisterMetadata}
                    control={control}
                    errors={errors} />
                <LocationSection
                    metadata={roomPostRegisterMetadata}
                    control={control}
                    errors={errors} />
                <ImagePicker control={control} initialImages={roomPost? roomPost.roomPhotos : []}/>
                <RoomPostDetailsButtons isLoading={isLoading} mode={mode}/>
            </form>
            </div>
            :
            "Wait..."
    )
}

function RoomPostDetailsButtons({isLoading, mode}){
    const navigate = useNavigate()
    return (
        <div className=" w-full flex justify-between items-center my-8">
            <button type="button" 
                disabled={isLoading} 
                onClick={()=>navigate(-1)}
                className=" border w-32 h-14 "
                >Cancel</button>
            <button type="submit" 
                    disabled={isLoading}
                    className=" border w-32 h-14 "
            >
                {mode==="edit"? "Update" : "Create"}
            </button>
        </div>
    )
}

function RoomDetailsSection({ metadata, onChangeValue,errors, control }) {


    return (
        <div className=" w-full flex flex-col items-center justify-center gap-2">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="address"
                    className=" w-1/3 text-left self-center">
                    Address:
                </label>
                <textarea
                    id="address"
                    name="address"
                    className=" w-1/3 border h-14"
                    {...onChangeValue("address")}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="description"
                    className=" w-1/3 text-left self-center">
                    Description:
                </label>
                <textarea id="description"
                    name="description"
                    className=" w-1/3 xs:w-1/2 border h-32"
                    {...onChangeValue("description")}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="price"
                    className=" w-1/3 text-left self-center">
                    Price
                </label>
                <input type="text"
                    id="price"
                    name="price"
                    placeholder="SGD"
                    className="border w-24 h-10 text-right"
                    {...onChangeValue("price")}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="totalPax"
                    className=" w-1/3 text-left self-center">
                    Total Person
                </label>
                <input type="text"
                    id="totalPax"
                    name="totalPax"
                    className="border w-24 h-10 text-right"
                    {...onChangeValue("totalPax")}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                        <label htmlFor="roomType"
                            className=" w-1/3 text-left self-center">
                            Room Type:
                        </label>
                        <div className=" w-3/5 flex flex-col items-center justify-center">
                            <div className=" max-w-full">
                                {errors.roomType && <span className={errorSpanClassName}>{errors.roomType.message}</span>}
                            </div>                
                            <div className=" w-full">
                            <Controller
                                control={control}
                                name="roomType"
                                rules={{required: "Room Type is required"}}
                                render={({field:{onChange, value}}) => (
                                    <DropDownItem
                                        options={metadata.roomType}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            </div>
                        </div>
                    </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="propertyType"
                    className=" w-1/3 text-left self-center">
                    Property Type:
                </label>
                <div className=" w-3/5 flex flex-col items-center justify-center">
                    {errors.propertyType && <span className={errorSpanClassName}>{errors.propertyType.message}</span>}
                    <Controller
                        name="propertyType"
                        rules={{required: "Property Type is required"}}
                        control={control}
                        render={({field:{onChange, value}}) => (
                            <DropDownItem
                                onChange={onChange}
                                options={metadata.propertyType}
                                value={value}
                            />
                        )}
                     />
                </div>
            </div>
        </div>
    )
}

function PreferenceSection({ metadata, control, errors }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="cookingAllowance"
                    className=" w-1/3 text-left self-center">
                    Cooking:
                </label>
                <div className=" w-3/5">
                    {errors.cookingAllowance && <span className={errorSpanClassName}>{errors.cookingAllowance.message}</span>}
                    <Controller
                    control={control}
                    rules={{required: "Cooking allowance is required"}}
                    name="cookingAllowance"
                    render={({field:{onChange, value}}) => (
                        <DropDownItem
                            onChange={onChange}
                            value={value}
                            options={metadata.cookingAllowance}
                        />
                    )}
                     />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="sharePub"
                    className=" w-1/3 text-left self-center">
                    PUB:
                </label>
                <div className=" w-3/5">
                    {errors.sharePub && <span className={errorSpanClassName}>{errors.sharePub.message}</span>}
                    <Controller
                    rules={{required: "Pub share is required"}}
                    name="sharePub"
                    control={control}
                    render={({field:{onChange, value}}) => (
                        <DropDownItem
                            onChange={onChange}
                            value={value}
                            options={metadata.sharePub}
                        />
                    )}
                    />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="airConTime"
                    className=" w-1/3 text-left self-center">
                    Air-Con Time:
                </label>
                <div className=" w-3/5">
                    {errors.airConTime && <span className={errorSpanClassName}>{errors.airConTime.message}</span>}
                    <Controller
                        control={control}
                        rules={{required: "AirCon Time is required"}}
                        name="airConTime"
                        render={({field:{onChange, value}}) => (
                            <DropDownItem
                                onChange={onChange}
                                value={value}
                                options={metadata.airConTime}
                            />
                        )}
                    />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="allowVistor"
                    className=" w-1/3 text-left self-center">
                    Visitor:
                </label>
                <div className=" w-3/5">
                    {errors.allowVisitor && <span>{errors.allowVisitor.message}</span>}
                    <Controller 
                        control={control}
                        name="allowVisitor"
                        render={({field:{onChange, value}}) => (
                            <AllowVisitor
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

function LocationSection({ metadata, control, errors }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="stationName"
                    className=" w-1/3 text-left self-center">
                    Nearest Station:
                </label>
                <div className=" w-3/5">
                    {errors.stationName && <span className={errorSpanClassName}>{errors.stationName.message}</span>}
                    <Controller
                        rules={{required: "Station name is required"}}
                        control={control}
                       name="stationName"
                        render={({field:{onChange, value}}) => (
                            <DropDownItem 
                                options={metadata.stationName} 
                                onChange={onChange} 
                                value={value}
                            />
                        )}
                    />
                </div>
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="location"
                    className=" w-1/3 text-left self-center">
                    Location:
                </label>
                <div className=" w-3/5">
                    {errors.location && <span className={errorSpanClassName}>{errors.location.message}</span>}
                    <Controller
                        control={control}
                        rules={{required: "Location is required"}}
                        name="location"
                        render={({field: {onChange, value}}) => (
                            <DropDownItem
                                    options={metadata.location} 
                                    onChange={onChange}
                                    value={value}
                                />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

function AllowVisitor({onChange, value}) {
    const onChangeHandler = (e) => {
        const { value } = e.target
        onChange(value === "allow" ? true : false)
    }
    return (
        <div className=" w-full flex p-2 items-center gap-2 justify-center">
            <input type="radio"
                id="allowed"
                name="allowVisitor"
                value="allow"
                defaultChecked={value == true? true : false}
                onChange={onChangeHandler}
            />
            <label htmlFor="allowed">Allow</label>
            <br></br>
            <input type="radio"
                id="notAllowed"
                name="allowVisitor"
                value="notAllow"
                defaultChecked={value == true? false : true}
                onChange={onChangeHandler}
            />
            <label htmlFor="notAllowed">Not Allow</label>
            <br></br>
        </div>
    )
}

function ImagePicker({control, initialImages=[]}){
    return (
        <>
            <Controller
                control={control}
                name="roomPhotoFiles"
                render={({field:{onChange}}) => (
                    <MultiImagePicker
                        onChange={onChange}
                        initialImages={initialImages}
                    />
                )}
            />
        </>
    )
}