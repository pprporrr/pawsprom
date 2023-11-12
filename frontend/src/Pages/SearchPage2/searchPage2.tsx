import styles from './searchPage2.module.css'
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { NewSearchBar } from '../../Components/newSearch/newSearchBar';
import { ToggleButton } from '../../Components/Searchbar/toggleButton';
import { SearchShelter } from '../../Components/newSearch/searchShelter';
import { ShelterCard } from '../../Components/CardDisplay/shelterCard';
import { StyledCardDisplay } from '../../Components/CardDisplay/Card.styles';
import { baseAPI } from '../../main';

export async function defaultLoader() {

    // ! test
    // const response = {
    // 'Dog': ['Labrador Retriever','German Shepherd','Golden Retriever',
    //     'Bulldog','Poodle','Beagle','Rottweiler','Yorkshire Terrier',
    //     'Boxer','Dachshund'],
    // 'Cat': ['Siamese','Maine Coon','Persian','Ragdoll','British Shorthair',
    //     'Bengal','Sphynx','Abyssinian','Scottish Fold','Burmese'],

    // 'color' : ['Black','White','Gray','Brown','Orange']}

    // const resOptions: any = response
    //!
    let response = await baseAPI.post('/petAPI/drop-down/')
    const resOptions: any = response.data.data
    const pets = Object.entries(resOptions)
            .filter(([key, _]) => key != 'color')

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

    let resPets = await baseAPI.post('/petAPI/search-pet/ids/')
    let defaultPets = resPets.data.data
    
    resPets = await baseAPI.post('/petAPI/info-short/', 
    {petIDs: defaultPets})
    defaultPets = resPets.data.data
    // console.log(defaultPets)

    let resShelter = await baseAPI.post('/shelterAPI/list-shelter/')
    
    let defaultShelters = resShelter.data.data
    console.log(defaultShelters)

    return {species: defaultSpecies, 
        breed: defaultBreed,
        color: defaultColor,
        pets: defaultPets,
        shelters: defaultShelters,
    }
    
}

export type singleResult = {
  petID: number
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
    const [shelters, setShelters] = useState<any>(defaultPets['shelters'])

    const handlePets = ( pets: singleResult[]| string) => {
        if (pets === 'default') {
            setPets(defaultPets['pets'])
        } else {
            setPets(pets)
        }}

    const handleShelters = ( shelters: any) => {
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
            console.log(petData)
            return (  
            <StyledCardDisplay
            url={`petprofileothers/${petData.petID}`}
            key={petData.breed + petData.petName} 
            data={petData}
            />
            )})}
          </div>
        </>)}
        {searchType === 'Shelters' && (
        <>
        <SearchShelter
        handleShelter={handleShelters}
        ></SearchShelter>
        <div className={styles.shelterWrapper}>
                    {/* //! type for shelter response */}
        {Object.keys(shelters).length !== 0 ? (
                shelters.map((shelterData: any) => {
          return (  
          <ShelterCard
          name={shelterData.shelterName}
          phone={shelterData.shelterphoneNumber}
          address={shelterData.shelterAddress}
          key={shelterData.shelterID + shelterData.shelterName} 
          url={`shelterprofile/${shelterData.shelterID}`}
          ></ShelterCard>
          )
        })) :
                <p>No Shelter Found!</p>}
        </div>
        </>
        )}
      </div>
    </div>
  )
}