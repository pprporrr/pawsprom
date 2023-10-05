import styles from './searchPage.module.css'
import { CardDisplay } from '../../Components/CardDisplay/cardDisplay'
import { SearchBar } from '../../Components/Searchbar/searchBar'
import { filterListProps } from '../../Components/Searchbar/searchBar'
import { useEffect, useState } from 'react'
import { baseAPI } from '../../main'
import { displayfilterProps } from '../../Components/Searchbar/searchBar'
import { Features } from '../../Components/FeaturesDisplay/featuresDisplay'

export const SearchPage = () => {

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
        weightRange: [],
        color: [],
        features: {
            feature1: false,
            feature2: false,
            feature3: false,
            feature4: false,
            feature5: false,
            feature6: false,
            feature7: false,
            feature8: false,
            feature9: false,
            feature10: false,
        }
    }

    type singleResult = {
        
        petName: string
        species: string
        breed: string
        availabilityStatus: string
        imageIDs: number[]
        features: {
        feature1: boolean
        feature2: boolean
        feature3: boolean
        feature4: boolean
        feature5: boolean
        feature6: boolean
        feature7: boolean
        feature8: boolean
        feature9: boolean
        feature10: boolean
        feature11: boolean
        },
        name: string
        phone: string
        address: string
    }
    

    type result = singleResult[]

    // * ===================================================

    const [selectFilter, setSelectFilter] = useState(getFilter)
    const [defaultFilter, setDefaultFilter] = useState<displayfilterProps>(
        // {
        // 'Dog': ['Labrador Retriever','German Shepherd','Golden Retriever',
        //         'Bulldog','Poodle','Beagle','Rottweiler','Yorkshire Terrier',
        //         'Boxer','Dachshund'],
        // 'Cat': ['Siamese','Maine Coon','Persian','Ragdoll','British Shorthair',
        //         'Bengal','Sphynx','Abyssinian','Scottish Fold','Burmese'],
        
        // 'color' : ['Black','White','Gray','Brown','Orange']}
    )
    const [filterDisplay, setFilterDislplay] = useState<displayfilterProps>()
    const [isGetData, setIsGetData] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState<Number[]>([])
    const [resultData, setResultData] = useState<result>()
    const [triggerDefault, setTriggerDefault] = useState<boolean>(false)

    // *---------------- POST to API ----------------* //

    const getFilterData = async() => {
        try {
            const response = await baseAPI.post('/petAPI/drop-down/')
            setDefaultFilter(response.data.data) // two times
            setFilterDislplay(response.data.data)
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    useEffect(() => {

        getFilterData()
        getDefaultData()
        
    }, [])

    // *---------------- POST to API ----------------* //

    // * function for getting selected filter
    const handleSelects = async (catergory: keyof filterListProps, 
        selectedValue: any[]) => {
        const updatedFilter = {... selectFilter}
        if (catergory != 'features') {
            updatedFilter[catergory] = selectedValue
        }
        setSelectFilter(updatedFilter)
        getNewFilter(updatedFilter)
        // setFilterDislplay(updatedFilter)
        // setIsGetData(!isGetData)
    }

    async function getNewFilter(selectFilter: filterListProps) {
        let selectNumber = Object.values(selectFilter)
                    .filter((value) => Array.isArray(value) 
                            && value.length != 0)

        // * sending only select option
        let tempSelected = {...selectFilter}
        let keyList: (keyof filterListProps)[] = Object.keys(tempSelected) as (keyof filterListProps)[];
        for (let i in keyList) {
            let key = keyList[i]
            let value = tempSelected[key]
            if (!Array.isArray(value) || value.length === 0) {
                delete tempSelected[key]
            }
        }

        if (selectNumber.length > 0){                   
            try {
                // console.log('before', tempSelected)
                // * set dropdown according to the selected
                // *---------------- POST to API ----------------* //
                const response = await baseAPI.post('/petAPI/drop-down/filter/', 
                    tempSelected
                )
                let tempFilter: displayfilterProps = {
                    species: [],
                    breed: [],
                    ageRange: [],
                    gender: [],
                    weightRange: [],
                    color: [],
                    features: {
                        feature1: false,
                        feature2: false,
                        feature3: false,
                        feature4: false,
                        feature5: false,
                        feature6: false,
                        feature7: false,
                        feature8: false,
                        feature9: false,
                        feature10: false,
                    }
                }
                if (tempFilter != undefined){
                    tempFilter['breed'] = response.data.data['breed']
                    tempFilter['color'] = response.data.data['color']
                }
                
                setFilterDislplay(tempFilter)
                
            // *---------------- POST to API ----------------* //
            } catch (error) {
                console.log((error as Error).message)
        }} else {
            console.log('no select')
            setFilterDislplay(defaultFilter)
        }
        setIsGetData(!isGetData)
    }


    // console.log('species', filterDisplay)

     // * search pets
    const handleSearch = async() => {
        try {
                console.log('getFilter',selectFilter)
            // *---------------- POST to API ----------------* //
            const response = await baseAPI.post('/petAPI/search-pet/', 
                selectFilter
            )
            setSearchResult(response.data.data)
        // *---------------- POST to API ----------------* //
        } catch (error) {
            console.log((error as Error).message)
        }

        // console.log(searchResult)
    }

    const getPetData = async(searchResult: Number[]) => {
        try {
            
            // *---------------- POST to API ----------------* //
            const response = await baseAPI.post('/petAPI/info-short/', 
                {petIDs: searchResult}
            )
            setResultData(response.data.data)
            
        // *---------------- POST to API ----------------* //
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const getDefaultData = async() => {
        try {
            
        // *---------------- POST to API ----------------* //
        const response = await baseAPI.post('/petAPI/search-pet/ids/')
        setSearchResult(response.data.data)
    // *---------------- POST to API ----------------* //
    } catch (error) {
        console.log((error as Error).message)
    }
    }

    useEffect(() => {
        
        if (searchResult.length != 0 ){
            getPetData(searchResult)
            setTriggerDefault(!triggerDefault)
        } 
        // else {
        //     getDefaultData()
        // }
        
    }, [searchResult])


    return (
        <div className={styles.bgContainer}>
           <div className={styles.bodyWrapper}>
                {/* //! search by selected filter */}
                { filterDisplay != undefined && <SearchBar
                handleSearch={handleSearch}
                isGetData={isGetData}
                filterList={filterDisplay}
                getFilter={selectFilter}
                handleSelects={handleSelects}/>}
                {/* // ! list of card result */}
                {resultData !== undefined && <div className={styles.cardsWrapper}>
                    {/* <CardDisplay data={data}></CardDisplay> */}
                    {resultData.map((petData, index) => {
                        return (  
                        <CardDisplay
                        triggerDefault={triggerDefault}
                        url="https://www.google.com"
                        key={index} 
                        data={petData}
                        ></CardDisplay>
                        )
                        })}
                </div>}
            </div>
        </div>
    )
}