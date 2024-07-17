import { useNavigate } from "react-router-dom"

let url = "/room-posts/"

const applyFilters = (filterParams) =>{
    let filters = new URLSearchParams()
    for(const [key, value] of Object.entries(filterParams)){
        if(value){
            filters.append(key, value)
        }
    }
    return filters.toString()
}

function FilterButton({closeMenu, filterParams}) {
    const navigate = useNavigate()
    const clickHandler = () => {
        closeMenu(false)
        
        let filters = applyFilters(filterParams)
        navigate({pathname: url, search: filters})
    }
    return <div className="w-full flex-grow flex flex-col justify-end pb-10">
        <button className=" bg-red-300 w-32 h-14 shadow-sm self-end text-white"
                    onClick={clickHandler}>
            filter
        </button>
    </div>
}


export default FilterButton