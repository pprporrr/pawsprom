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
    [K in keyof filterListProps] : any
}

type featuresProps = {
    [key: string]: boolean
}


// * For display list in dropdown
// export type filterListProps = {
//     species: string[]
//     breed: string[]
//     ageRange: number[]
//     gender: string[]
//     weightRange: number[]
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

export type filterListProps = {
    species: string[]
    breed: string[]
    ageRange: number[]
    gender: string[]
    weightRange: number[]
    color: string[]
    features: featuresProps
}

// * type for filter
export type filterProps = {
    isGetData: boolean
    getFilter: filterListProps
    filterList: displayfilterProps
    handleSelects: (catergory: keyof filterListProps, selectedValue: any[]) => void
}

export type SearchProps = filterProps & {
    handleSearch: () => void
}

export const SearchBar: React.FC<SearchProps> = (
    {filterList, getFilter, handleSelects, isGetData, handleSearch}) => {
    // * now 'getfilter' is not use

    return (
        <div className={styles.searchWrapper}>
            {/* //! for select as pet or shelter */}
            <ToggleButton/>
            {/* // ! for pet filter */}
            <DropdownNFilter
            handleSearch={handleSearch}
            isGetData={isGetData}
            filterList={filterList} 
            getFilter={getFilter}
            handleSelects={handleSelects}/>
        </div>
    )
}