import styles from './searchPage.module.css'
import { CardDisplay } from '../../Components/CardDisplay/cardDisplay'
import { SearchBar } from '../../Components/Searchbar/searchBar'
import { filterListProps } from '../../Components/Searchbar/searchBar'
import { useEffect, useState } from 'react'
import { baseAPI } from '../../main'
import { displayfilterProps } from '../../Components/Searchbar/searchBar'

export const SearchPage = () => {
    // search components send to api then
    // get info from api go to list component to display

    //! for testing
    const data = {
            petName: 'Max',
            species: 'Dog',
            breed: 'Labrador',
            availabilityStatus: 'Available',
            imageIDs: [],
            features: {
            feature1: true,
            feature2: false,
            feature3: true,
            feature4: false,
            feature5: true,
            feature6: false,
            feature7: false,
            feature8: false,
            feature9: false,
            feature10: false,
            feature11: false,
        },
        name: 'Happy Paws',
        phone: '0922607795',
        address: 'bangkok soi 1 thailand pathumwan'
    }


    const getFilter: filterListProps = {
        species: [],
        breed: [],
        ageRange: [],
        gender: [],
        weight: [],
        color: [],
        features: {
            feature1: true,
            feature2: true,
            feature3: true,
            feature4: true,
            feature5: true,
            feature6: true,
            feature7: true,
            feature8: true,
            feature9: true,
            feature10: true,
        }
    }


    // mock initial data
    const mockFilter: displayfilterProps = {
        'Cat': ['Siamese','Maine Coon','Persian','Ragdoll','British Shorthair',
                'Bengal','Sphynx','Abyssinian','Scottish Fold','Burmese'],

        'Dog': ['Labrador Retriever','German Shepherd','Golden Retriever',
                'Bulldog','Poodle','Beagle','Rottweiler','Yorkshire Terrier',
                'Boxer','Dachshund'],
        
        'color' : ['Black','White','Gray','Brown','Orange'],
    }

    // * ===================================================

    const [selectFilter, setSelectFilter] = useState(getFilter)

    // ! test have to change mockFilter
    const [defaultFilter, setDefaultFilter] = useState<displayfilterProps>(mockFilter)
    const [filterDisplay, setFilterDislplay] = useState<displayfilterProps>(mockFilter)

    // *---------------- POST to API ----------------* //
    // useEffect(() => {
    //     baseAPI.post('/petAPI/drop-down/')
    //     .then((response) => {
    //     console.log('pass')
    //     console.log(response.data)

    //     setDefaultFilter(response.data.data) // two times
    //     });
        
    // }, [])
    // *---------------- POST to API ----------------* //

    // * function for getting selected filter
    const handleSelects = async (catergory: keyof filterListProps, 
        selectedValue: any[]) => {
        const updatedFilter = {... selectFilter}
        if (catergory != 'features') {
            updatedFilter[catergory] = selectedValue
        }

        setSelectFilter(updatedFilter)
        getColor(updatedFilter)
        // // * set dropdown according to the selected
        //     // *---------------- POST to API ----------------* //
        //     baseAPI.post('/petAPI/drop-down/colors/', {
        //         species: updatedFilter['species']
        //     }).then((response) => {
        //         console.log(response.data)
        //         let tempSelect = defaultFilter
        //         tempSelect['color'] = response.data.data
        //         setDefaultFilter(tempSelect)

        //     })
            
        // // *---------------- POST to API ----------------* //
        
    }

    // useEffect(() => {
        
    //     getColor(selectFilter)
        
    // }, [handleSelects])

    async function getColor(selectFilter: filterListProps) {
        try {
            console.log('pass')
            // * set dropdown according to the selected
            // *---------------- POST to API ----------------* //
            const response = await baseAPI.post('/petAPI/drop-down/colors/', {
                species: selectFilter['species']
            })
            
            let tempSelect = defaultFilter
            tempSelect['color'] = response.data.data['color']
            console.log(tempSelect)
            // setFilterDislplay(tempSelect)
            
        // *---------------- POST to API ----------------* //
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    // console.log(filterDisplay['color'])


    return (
        <div className={styles.bgContainer}>
            <div className={styles.bodyWrapper}>
                {/* //! search by selected filter */}
                <SearchBar 
                filterList={filterDisplay}
                getFilter={selectFilter}
                handleSelects={handleSelects}/>
                {/* // ! list of card result */}
                <div className={styles.cardsWrapper}>
                    <CardDisplay data={data}></CardDisplay>
                </div>
            </div>
        </div>
    )
}