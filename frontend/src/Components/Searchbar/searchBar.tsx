import styles from './searchBar.module.css'
import { ToggleButton } from './toggleButton'
import { DropdownNFilter } from './dropdownNfilter'

// * For selected value in each fields

// export type dataFilterProps = {
//     species: string[]
//     breed: string[]
//     ageRange: Number[]
//     gender: string[]
//     weight: Number[]
//     color: string[]
//     features: {
//         feature1: boolean,
//         feature2: boolean,
//         feature3: boolean,
//         feature4: boolean,
//         feature5: boolean,
//         feature6: boolean,
//         feature7: boolean,
//         feature8: boolean,
//         feature9: boolean,
//         feature10: boolean,
//     }
// }

// ! let's me think first
export type displayfilterProps = {
    [key: string] : string[]
}


// * For display list in dropdown
export type filterListProps = {
    species: string[]
    breed: string[]
    ageRange: Number[]
    gender: string[]
    weight: Number[]
    color: string[]
    features: {
        feature1: boolean,
        feature2: boolean,
        feature3: boolean,
        feature4: boolean,
        feature5: boolean,
        feature6: boolean,
        feature7: boolean,
        feature8: boolean,
        feature9: boolean,
        feature10: boolean,
    }
}

// * type for filter
export type filterProps = {
    getFilter: filterListProps
    filterList: displayfilterProps
    handleSelects: (catergory: keyof filterListProps, selectedValue: any[]) => void
}

export const SearchBar: React.FC<filterProps> = ({filterList, getFilter, handleSelects}) => {
    // * now 'getfilter' is not use

    return (
        <div className={styles.searchWrapper}>
            {/* //! for select as pet or shelter */}
            <ToggleButton/>
            {/* // ! for pet filter */}
            <DropdownNFilter
            isGetData={true}
            filterList={filterList} 
            getFilter={getFilter}
            handleSelects={handleSelects}/>
        </div>
    )
}