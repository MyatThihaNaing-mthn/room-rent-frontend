import { useEffect } from "react"
import { ClipLoader } from "react-spinners"

const color = '"#ffffff"'

function UploadLoading() {
    useEffect(
        () => {
            document.body.style.overflow = 'hidden'
            return () => document.body.style.overflow = 'auto'
        },
        []
    )

    return (
        <div className=" w-screen h-screen fixed z-50 bg-opacity-80 bg-slate-500
                flex items-center justify-center top-0 left-0">
            <ClipLoader
                color={color}
                loading={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default UploadLoading