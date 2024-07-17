import DropDownItem from "./DropDownItem"
import {convertForUi} from "../../utils/StringUtils"

function SearchFields({searchParams, setFilterParams, filterParams}){
    
    const minPriceChangeHandler = (value) => {
        setFilterParams(
            {
                ...filterParams,
                minPrice : value
            }
        )
    }

    const maxPriceChangeHandler = (value) => {
        setFilterParams(
            {
                ...filterParams,
                maxPrice : value
            }
        )
    }
    if(searchParams){
        return <div className=" grid grid-cols-2 w-full mt-4">
        
        <TextInput fieldName="Min Price" 
                    filterBuilder={setFilterParams} 
                    filterParams={filterParams}
                    inputChangeHandler={minPriceChangeHandler}
                    />
        <TextInput fieldName="Max Price" 
                        filterBuilder={setFilterParams}
                        filterParams={filterParams}
                        inputChangeHandler={maxPriceChangeHandler}
                        />
        {
            Object.entries(searchParams).map( ([attr, value]) => {
                return <DropDownItem name={convertForUi(attr)} 
                            filterBuilder={setFilterParams} 
                            filterParams={filterParams} 
                            key={attr}
                            id={attr}
                            options={value}
                            />
            })
        }
        </div>
    }else{
        return <>

        </>
    }
}

function TextInput({fieldName, inputChangeHandler}){
    const onChangeHandler = (e) => {
        inputChangeHandler(e.target.value)
    }

    return <div className="flex p-2 ">
        <div className=" flex w-full h-12 bg-red-300 items-center justify-center gap-1">
            <label className=" text-white">{fieldName}</label>
            <input type="text"
                className=" w-16 p-2 h-8 max-h-12 shadow-lg rounded-lg"
                onChange={onChangeHandler}></input>
        </div>
    </div>
}

export default SearchFields