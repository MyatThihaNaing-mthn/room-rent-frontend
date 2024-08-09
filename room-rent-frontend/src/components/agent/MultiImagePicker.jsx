
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLayerPlus } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
export default function MultiImagePicker({onChange, initialImages=[] }) {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const loadInitialImages = async() => {
        console.log(initialImages)
        if(initialImages.length > 0){
            try{
                const images = await Promise.all(
                    initialImages.map(image => 
                        fetchImageAsFile(image.imageUrl, image.filename)
                    )
                )
                console.log(images)
                const imageUrls = images.map(url => URL.createObjectURL(url))
                console.log(imageUrls)
                setImageFiles(images)
                setImageUrls(imageUrls)
            }catch(error){
                console.log(error)
            }
        }
    }


    const updateRoomPhotosOfRoomPost = () =>{
        onChange(imageFiles)
    }

    const filePickHandler = (e) => {
        if(e.target.files.length > 10){
            return
        }
        if (e.target.files != null && e.target.files.length > 0) {
            const pickedImages = Array.from(e.target.files)
            const newImages = rejectSameFile(imageFiles, pickedImages)

            let newImageUrls = newImages.map(file => URL.createObjectURL(file))

            setImageUrls(
                (prev) => [...prev, ...newImageUrls]
            )
            setImageFiles(
                (prev) => [...prev, ...newImages]
            )
            updateRoomPhotosOfRoomPost()
        }
    }
    const rejectSameFile = (existingImages, newImages) => {
        const existingImageNames = new Set(existingImages.map(image => image.name))
        let selectedImages = []
        newImages.forEach(
            (newImage) => {
                if(!existingImageNames.has(newImage.name)){
                    selectedImages.push(newImage)
                }
            }
        )
        return selectedImages;
    }

    useEffect(
        () => {
            loadInitialImages()
            return () => { imageUrls.forEach(image => URL.revokeObjectURL(image)) }
        }, []
    )

    useEffect( () => {
        updateRoomPhotosOfRoomPost(imageFiles);
    }, [imageFiles]
    )

    const removeImage = (imageUrl) => {
        const index = imageUrls.indexOf(imageUrl)
        if(index > -1){
            setImageFiles(
                (prev) => prev.filter((_, i) => i !== index)
            )
            setImageUrls(prev => prev.filter((_, i) => i !== index))
            URL.revokeObjectURL(imageUrl)
            updateRoomPhotosOfRoomPost(imageFiles)
        }
    }

    return (
        <div className=" w-full flex flex-col items-start justify-center">
            <label className="flex flex-col items-center cursor-pointer">
                <BiLayerPlus size={48}
                    fill="blue" />
                <input
                    type="file"
                    alt="room images"
                    multiple
                    onChange={(e) => filePickHandler(e)}
                    className="hidden"
                />
                <span>Upload Room Photos</span>
            </label>
            <div className=" flex flex-wrap w-full items-center justify-start gap-1">
                {imageUrls.length > 0 &&
                    imageUrls.map(image => <ImageThumbnail key={image}
                        imageHandler={removeImage}
                        imageUrl={image} />)}
            </div>
        </div>
    );
}

function ImageThumbnail({ imageUrl, imageHandler }) {

    return (
        <div className=" relative w-36 h-32">
            <div className=" absolute top-1 right-1 w-fit h-fit rounded-full bg-white bg-opacity-70">
                <IoCloseOutline size={20}
                    onClick={() => imageHandler(imageUrl)} />
            </div>
            <div className=" w-full max-w-full h-full max-h-full border bg-center bg-cover "
                style={{ backgroundImage: `url(${imageUrl})` }}>
            </div>
        </div>
    )
}

async function fetchImageAsFile(imageUrl, filename){
    try{
        const response = await axios(
            {
                url: imageUrl,
                method: 'GET',
                responseType: 'blob'
            }
        )
        const blob = response.data
        const file = new File([blob], filename, {type: blob.type})
        return file
    }catch(error){
        console.log(error)
    }
}