import { useNavigate } from "react-router-dom"

function FilterButton({closeMenu}) {
    const navigate = useNavigate()
    const clickHandler = () => {
        closeMenu(false)
        navigate("/")
    }
    return <div className="w-full flex-grow flex flex-col justify-end pb-10">
        <button className=" bg-red-300 w-32 h-14 shadow-sm self-end"
                    onClick={clickHandler}>
            filter
        </button>
    </div>
}


export default FilterButton