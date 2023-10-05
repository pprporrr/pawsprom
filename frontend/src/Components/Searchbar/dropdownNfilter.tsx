import styles from './dropdownNfilter.module.css'
import { filterProps } from './searchBar';
import { DropCheckbox } from '../Dropdown/dropcheckbox';
import { useEffect, useState } from 'react';
import { MoreFilterButton } from './moreFilterButton';
import { SearchProps } from './searchBar';


export const DropdownNFilter:  React.FC<SearchProps> = ({
    filterList,getFilter ,handleSelects, isGetData, handleSearch}) => {
    // seperate in each dropdown
    // const [speciesNbreed, setSpeciesNbreed] =  useState<stringNbreedProps>({
    //     'species': [],
    //     'breed': []
    // })
    const [speciesList, setSpeciesList] = useState<string[]>([])
    const [breedList, setBreedList] = useState<string[]>([])
    const [colorList, setColorList] = useState<string[]>([])


    // useEffect(() => {
        
    //     let temp = Object.entries(filterList).filter(arr =>arr[0] != 'color')
    //     console.log('temp', temp)
    //     setSpeciesNbreed({
    //         'species': temp.map(([key]) => key),
    //         'breed': temp.map(([_, value]) => value).flat()
    //     })
    //     setColorList(filterList['color'])
        
    // }, [handleSelects])

    const moreFilterClick = () => {
        // console.log('Trigger Click')
    }

    useEffect(() => {
        let optionSelect = Object.values(getFilter)
                    .filter(value => Array.isArray(value) 
                            && value.length != 0).length
        if (optionSelect === 0){
            //* for default options
            setNewFilter()
        } else {
            setBreedList(filterList['breed'])
            setColorList(filterList['color'])

        }

    }, [isGetData])

    async function setNewFilter() {
        //* set data for default when no selection
        // let temp = Object.values(getFilter)
        //             .filter(value => Array.isArray(value) 
        //                     && value.length != 0)

        let speciesNbreed = Object.entries(filterList)
                                .filter(([key, _]) => key != 'color')
        
        // if (temp.length === 0) {
            setSpeciesList(speciesNbreed.map(category => category[0]))
            setBreedList(speciesNbreed.map(category => category[1]).flat())
            setColorList(filterList['color'])
        // } else {
            
        //     let wantedSpecies = getFilter['species']
        //     setSpeciesList(speciesNbreed.map(category => category[0]))
        //     console.log('wanted breed',wantedSpecies
        //         .filter(key => key in filterList))
        //     setBreedList( speciesNbreed.map(category => category[1]))
        //     if (getFilter['color'].length === 0){
                
        //         setColorList(filterList['color'])
        //     }
        // }
    }

    return (
        <div className={styles.searchBarWrapper}>
            <div>
                <p>Species</p>
                <DropCheckbox category='species' 
                options={speciesList} 
                updateValue={handleSelects}/>
            </div>
            <div>
                <p>Breed</p>
                <DropCheckbox category='breed' 
                options={breedList} 
                updateValue={handleSelects}/>
            </div>
            {/* <div>
                <p>Color</p>
                <DropCheckbox category='color' 
                options={colorList} 
                updateValue={handleSelects}/>
            </div> */}
            <div className={styles.buttonWrapper}>
                {/* //! Search Button */}
                <button 
                id='searchButton' 
                onClick={handleSearch}>Search</button>
                <MoreFilterButton
                onClick={moreFilterClick}
                handleSelects={handleSelects}
                colorList={colorList}
                ageRange={getFilter['ageRange']}
                ></MoreFilterButton>
            </div>
        </div>
    )
}