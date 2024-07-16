import SearchBar from "./SearchBar";
import SearchFields from "./SearchFields";
import FilterButton from "./FilterButton";
import { useState } from "react";

export default function UserMenu({searchParams, setMenuOpen}){
    const [filterParams, setFilterParams] = useState({
        minPrice : "",
        maxPrice : "",      
        location : "",
        stationName : "",
        propertyType : "",
        roomType : "",
        airConTime : "",
        sharePub : "",
        cookingAllowance : "",
    })
    return (
        <div>
            <SearchBar />
            <SearchFields searchParams={searchParams} setFilterParams={setFilterParams} />
            <FilterButton closeMenu={setMenuOpen} filterParams={filterParams} />
        </div>
    )
}