import axios from "axios";
import { useEffect, useState } from "react"
import DropDownItem from "../menu/DropDownItem";
import MultiImagePicker from "./MultiImagePicker";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UploadLoading from "../UploadLoading";

const metaDataURL = "http://localhost:8080/api/v1/agent/room-post-data"
const roomPostRegisterURL = "http://localhost:8080/api/v1/agent/room-post"
export default function RoomPostRegisterForm() {
    const [roomPostRegisterMetadata, setRoomPostRegisterMetadata] = useState();
    const { register, 
            handleSubmit,
            control,
            formState: { errors },
         } = useForm();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

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

    const createRoomPostFormData = (data) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if (key !== "roomPhotoFiles") {
                formData.append(key, value)
            } else if (key === "roomPhotoFiles") {
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
            await axios.post(roomPostRegisterURL, formData, config)
            setLoading(false)
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(
        () => { getRoomPostRegisterMetadata() },
        []
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
                    control={control} />
                <LocationSection
                    metadata={roomPostRegisterMetadata}
                    control={control} />
                <ImagePicker control={control}/>
                <button type="submit" disabled={isLoading}>Create</button>
            </form>
            </div>
            :
            "Wait..."
    )
}

function RoomDetailsSection({ metadata, onChangeValue,errors, control }) {


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
                    {...onChangeValue("address")}
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
                    {...onChangeValue("description")}
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
                    {...onChangeValue("price")}
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
                    {...onChangeValue("totalPax")}
                    required
                />
            </div>
            <div className=" flex w-full justify-start items-center">
                        <label htmlFor="roomType"
                            className=" w-1/3 mb-auto text-left">
                            Room Type:
                        </label>
                        <div className=" w-3/5 flex items-center justify-center">
                            <Controller
                                control={control}
                                name="roomType"
                                rules={{required: "Room Type is required"}}
                                render={({field:{onChange}}) => (
                                    <DropDownItem
                                        options={metadata.roomType}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors.roomType && <span>{errors.roomType.message}</span>}
                        </div>
                    </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="propertyType"
                    className=" w-1/3 mb-auto text-left">
                    Property Type:
                </label>
                <div className=" w-3/5 flex items-center justify-center">
                    <Controller
                        name="propertyType"
                        control={control}
                        render={({field:{onChange}}) => (
                            <DropDownItem
                                onChange={onChange}
                                options={metadata.propertyType}
                            />
                        )}
                     />
                </div>
            </div>
        </div>
    )
}

function PreferenceSection({ metadata, control }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="cookingAllowance"
                    className=" w-1/3 mb-auto text-left">
                    Cooking:
                </label>
                <div className=" w-3/5">
                    <Controller
                    control={control}
                    name="cookingAllowance"
                    render={({field:{onChange}}) => (
                        <DropDownItem
                            onChange={onChange}
                            options={metadata.cookingAllowance}
                        />
                    )}
                     />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="sharePub"
                    className=" w-1/3 mb-auto text-left">
                    PUB:
                </label>
                <div className=" w-3/5">
                    <Controller
                    name="sharePub"
                    control={control}
                    render={({field:{onChange}}) => (
                        <DropDownItem
                            onChange={onChange}
                            options={metadata.sharePub}
                        />
                    )}
                    />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="airConTime"
                    className=" w-1/3 mb-auto text-left">
                    Air-Con Time:
                </label>
                <div className=" w-3/5">
                    <Controller
                        control={control}
                        name="airConTime"
                        render={({field:{onChange}}) => (
                            <DropDownItem
                                onChange={onChange}
                                options={metadata.airConTime}
                            />
                        )}
                    />
                </div>
            </div>

            <div className=" flex w-full justify-start items-center">
                <label htmlFor="allowVistor"
                    className=" w-1/3 mb-auto text-left">
                    Visitor:
                </label>
                <div className=" w-3/5">
                    <Controller 
                        control={control}
                        name="allowVisitor"
                        render={({field:{onChange}}) => (
                            <AllowVisitor
                                onChange={onChange}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

function LocationSection({ metadata, control }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="stationName"
                    className=" w-1/3 mb-auto text-left">
                    Nearest Station:
                </label>
                <div className=" w-3/5">
                    <Controller
                        control={control}
                        name="stationName"
                        render={({field:{onChange}}) => (
                            <DropDownItem 
                                options={metadata.stationName} 
                                onChange={onChange} 
                            />
                        )}
                    />
                </div>
            </div>
            <div className=" flex w-full justify-start items-center">
                <label htmlFor="location"
                    className=" w-1/3 mb-auto text-left">
                    Location:
                </label>
                <div className=" w-3/5">
                    <Controller
                        control={control}
                        name="location"
                        render={({field: {onChange}}) => (
                            <DropDownItem
                                    options={metadata.location} 
                                    onChange={onChange}
                                />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

function AllowVisitor({onChange }) {
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

function ImagePicker({control}){
    return (
        <>
            <Controller
                control={control}
                name="roomPhotoFiles"
                render={({field:{onChange}}) => (
                    <MultiImagePicker
                        onChange={onChange}
                    />
                )}
            />
        </>
    )
}