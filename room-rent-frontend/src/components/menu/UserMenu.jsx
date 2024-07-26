import SearchBar from "./SearchBar";
import SearchFields from "./SearchFields";
import FilterButton from "./FilterButton";
import { useForm } from "react-hook-form";

export default function UserMenu({ searchParams, setMenuOpen }) {

    const {register,
        control, 
        watch} = useForm()
    
    const filters = watch()
        
    return (
        <div>
            <SearchBar register={register} />
            <SearchFields searchParams={searchParams} control={control} register={register} />
            <FilterButton closeMenu={setMenuOpen} filterParams={filters} />
        </div>
    )
}