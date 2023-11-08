import styles from './searchPage2.module.css'
import { NewDropDown } from '../../Components/Dropdown/newDropdown'
import { OptionsProps } from '../../Components/Dropdown/newDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseAPI } from '../../main';
import { useLoaderData } from 'react-router-dom';
import { NewSearchBar } from '../../Components/newSearch/newSearchBar';
import { CardDisplay } from '../../Components/CardDisplay/cardDisplay';
import { ToggleButton } from '../../Components/Searchbar/toggleButton';
import { SearchShelter } from '../../Components/newSearch/searchShelter';
import { ShelterCard } from '../../Components/CardDisplay/shelterCard';

export async function defaultLoader() {

            // let response = await baseAPI.post('/petAPI/drop-down/')

            const response = {
            'Dog': ['Labrador Retriever','German Shepherd','Golden Retriever',
                'Bulldog','Poodle','Beagle','Rottweiler','Yorkshire Terrier',
                'Boxer','Dachshund'],
            'Cat': ['Siamese','Maine Coon','Persian','Ragdoll','British Shorthair',
                'Bengal','Sphynx','Abyssinian','Scottish Fold','Burmese'],
        
            'color' : ['Black','White','Gray','Brown','Orange']}

            // ! test

            // const resOptions: any = response.data.data
            const resOptions: any = response

            const pets = Object.entries(resOptions)
                    .filter(([key, value]) => key != 'color')

            const defaultSpecies = pets.map(([key, _]) => ({
                    label: key,
                    value: key
                }))


            const defaultBreed = pets
                .map(([_, value]) => value).flat()
                .map((value) => ({
                    label: value,
                    value: value
                }))

            const defaultColor = Object.entries(resOptions)
                .filter(([key, _]) => key === 'color')
                .map(([_, value]) => (value)).flat()
                .map((value) => ({
                    label: value,
                    value: value
                }))

            // let resPets = await baseAPI.post('/petAPI/search-pet/ids/')
            // let defaultPets = resPets.data.data

            // resPets = await baseAPI.post('/petAPI/info-short/', 
            //     {petIDs: defaultPets})
            // defaultPets = resPets.data.data

            // ! test

            const defaultPets = [{
            petName: 'Max',
            species: 'Dog',
            breed: 'Labrador',
            age: 1,
            availabilityStatus: 'Available',
            imageIDs: [1],
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
        }, {
            petName: 'Max',
            species: 'Dog',
            breed: 'Shiba',
            availabilityStatus: 'Available',
            age: 5,
            imageIDs: [2],
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
            name: 'Hapy Paws',
            phone: '0922607795',
            address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
        },, {
            petName: 'Max',
            species: 'Dog',
            breed: 'Siba',
            availabilityStatus: 'Available',
            imageIDs: [2],
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
            name: 'Happy',
            phone: '0922607795',
            address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
        },
    ]
            return {    species: defaultSpecies, 
                breed: defaultBreed,
                color: defaultColor,
                pets: defaultPets
            }
    
}

export type singleResult = {
        
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



export const SearchPage2 = () => {

    const defaultPets: any = useLoaderData()
    const [pets, setPets] = useState(defaultPets['pets'])
    const [searchType, setSearchType] = useState<string>('Pets')
    const [shelters, setShelters] = useState<any>(defaultPets['pets'])

    const handlePets = ( pets: singleResult[]) => {
        setPets(pets)
    }

    const handleShelters = ( shelters: any[]) => {
        setShelters(shelters)
    }

    const selectType = (toggle: boolean) => {
        if (toggle === false) {
            setSearchType('Shelters')
        } else {
            setSearchType('Pets')
        } 
    }

    return (
        <div className={styles.bgContainer}>
            <div className={styles.bodyWrapper}>
                <ToggleButton
                selectType={selectType}
                ></ToggleButton>
                {searchType === 'Pets' && (
                <>
                <NewSearchBar
                handlePets={handlePets}
                />
                <div className={styles.cardsWrapper}>
                {pets.map((petData: singleResult) => {
                    return (  
                    <CardDisplay
                    url="https://www.google.com"
                    key={petData.breed + petData.petName} 
                    data={petData}
                    ></CardDisplay>
                    )})}
                </div>
                </>)}
                {searchType === 'Shelters' && (
                <>
                <SearchShelter
                handleShelter={handlePets}
                ></SearchShelter>
                <div className={styles.shelterWrapper}>
                {shelters.map((petData: singleResult) => {
                    return (  
                    <ShelterCard
                    name={petData.name}
                    phone={petData.phone}
                    address={petData.address}
                    key={petData.name} 
                    url="https://www.google.com"
                    ></ShelterCard>
                    )
                })}
                </div>
                </>
                )}
            </div>
        </div>
    )
}