import DropDownItem from "./DropDownItem"
import { convertForUi } from "../../utils/StringUtils"
import { Controller } from "react-hook-form"

function SearchFields({ searchParams, control, register}) {

    if (searchParams) {
        return <div className=" grid grid-cols-2 w-full mt-4">

            <TextInput fieldName="minPrice"
                labelName="Min Price"
                register={register}
            />
            <TextInput fieldName="maxPrice"
                labelName="Max Price"
                register={register}
            />
            {
                Object.entries(searchParams).map(([attr, value]) => {
                    return <Controller
                        control={control}
                        name={attr}
                        key={attr}
                        render={({field:{onChange}}) => (
                            <DropDownItem 
                                labelName={convertForUi(attr)}
                                id={attr}
                                options={value}
                                onChange={onChange}
                            />
                        )}
                    />
                })
            }
        </div>
    } else {
        return <>

        </>
    }
}

function TextInput({ labelName, fieldName, register }) {

    return <div className="flex p-2 ">
        <div className=" flex w-full h-12 bg-red-300 items-center justify-center gap-1">
            <label className=" text-white">{labelName}</label>
            <input type="text"
                className=" w-16 p-2 h-8 max-h-12 shadow-lg rounded-lg"
                {...register(fieldName)}></input>
        </div>
    </div>
}

export default SearchFields