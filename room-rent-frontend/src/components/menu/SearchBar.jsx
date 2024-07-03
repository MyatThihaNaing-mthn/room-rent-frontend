function SearchBar({filterParams, setFilterParams}){
    const onLocationChangeHandler = (event)=>{
        setFilterParams({
            ...filterParams,
            location : event.target.value
        })
    }
    return <div className="w-full p-2">
        <input type="text" 
            placeholder="Search by location" 
            className=" w-full h-12 p-2 rounded-xl"
            onChange={onLocationChangeHandler}
            />
    </div>
}


export default SearchBar