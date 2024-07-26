function SearchBar({register}){
    
    return <div className="w-full p-2">
        <input type="text" 
            placeholder="Search by location" 
            className=" w-full h-12 p-2 rounded-xl"
            {...register("location")}
            />
    </div>
}


export default SearchBar