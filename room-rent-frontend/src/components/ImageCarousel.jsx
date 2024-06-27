import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from "react-icons/rx"
function ImageCarousel({images}){
    /*
        take full width and height of parent container
    */
   const [currentIndex, setCurrentIndex] = useState(2)

   const handleLeftArrow = () => {
        let newIndex;
        if(currentIndex != 0){
            newIndex = currentIndex - 1;
        }else{
            newIndex = images.length-1
        }
        setCurrentIndex(newIndex)
   }

   const handleRightArrow = () => {
        let newIndex;
        if(currentIndex != images.length-1){
            newIndex = currentIndex + 1;
        }else{
            newIndex = 0;
        }
        console.log(newIndex)
        setCurrentIndex(newIndex)
   }

    return(
        <div className=" w-full h-full relative group">
            <div
                style={{ backgroundImage: `url(${images[currentIndex].url})`}}
                className=" w-full h-full bg-center bg-cover rounded-md duration-500">
            </div>
            <BsChevronCompactLeft  size={30}
                        className=" hidden group-hover:block absolute top-[50%] left-4 -translate-x-0
                                     cursor-pointer rounded-lg text-2xl text-white
                                     bg-black/25 -translate-y-1/2 "
                        onClick={handleLeftArrow}
                                     />
            <BsChevronCompactRight size={30} 
                        className=" hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-4 -translate-x-0 
                                    cursor-pointer rounded-lg text-2xl text-white
                                     bg-black/25 "
                        onClick={handleRightArrow}
                                    />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex w-fit h-fit">
                {images.map((image, index) => (
                    <RxDotFilled key={index} 
                                size={12}
                                className={`${index===currentIndex? 'text-white' : ''}`}
                                onClick={()=>setCurrentIndex(index)}
                                />
                ))}
            </div>
        </div>
    )
}

export default ImageCarousel