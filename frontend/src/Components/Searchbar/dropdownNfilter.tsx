import styles from './dropdownNfilter.module.css'
import { filterProps } from './searchBar';
import { DropCheckbox } from '../Dropdown/dropcheckbox';
import { useEffect, useState } from 'react';
import { MoreFilterButton } from './moreFilterButton';

type DropdownNFilterProps = filterProps & {
    isGetData: boolean
}


export const DropdownNFilter:  React.FC<DropdownNFilterProps> = ({
    filterList,getFilter ,handleSelects, isGetData}) => {
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
        console.log('Trigger Click')
    }

    useEffect(() => {
        
        // TODO: fix update option
        console.log('current', filterList['color'])
        setNewFilter()

    }, [handleSelects])

    async function setNewFilter() {
        let temp = Object.values(getFilter)
                    .filter(value => Array.isArray(value) 
                            && value.length != 0)

        let speciesNbreed = Object.entries(filterList)
                                .filter(([key, _]) => key != 'color')
        
        if (temp.length === 0) {
            setSpeciesList(speciesNbreed.map(category => category[0]))
            setBreedList(speciesNbreed.map(category => category[1]).flat())
            setColorList(filterList['color'])
        } else {
            
            let wantedSpecies = getFilter['species']
            setSpeciesList(speciesNbreed.map(category => category[0]))
            setBreedList(wantedSpecies.map(key => filterList[key]).flat())
            if (getFilter['color'].length === 0){
                
                setColorList(filterList['color'])
            }
        }
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
                <button>Search</button>
                <MoreFilterButton
                onClick={moreFilterClick}
                handleSelects={handleSelects}
                colorList={colorList}
                ></MoreFilterButton>
            </div>
        </div>
    )
}