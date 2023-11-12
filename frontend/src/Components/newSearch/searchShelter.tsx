import styles from './searchShelter.module.css'
import { baseAPI } from '../../main';
import { useState } from 'react';

type SearchShelterProps = {
  handleShelter: (shelters: any) => void
}

export const SearchShelter: React.FC<SearchShelterProps> = ({handleShelter}) => {
  const [inputText, setInputText] = useState<string>()

  const handleChange = async(event: any) => {
    const target = event.target as HTMLInputElement;
    setInputText(target.value)

    // when search nothing
    if (target.value === '') {
      let response = await getShelter('')
      handleShelter(response)
    } 
  }

  const getShelter = async(inputText: string) => {
    try {
        let resData = await baseAPI.post(
          '/shelterAPI/search-shelter/', 
          { shelterName: inputText } )
          console.log(resData)
          if (resData.data.success === true) {
            return resData.data.data
          } else {
            return {}
          }
        } catch (error) {
          console.log((error as Error).message)
  }}

  const handleSearch = async() => {
    if (inputText !== undefined) {
      let response = await getShelter(inputText)
      handleShelter(response)
    }
  }

  return (
    <div className={styles.searchWrapper}>
    <div className={styles.barWrapper}>
    <p>Search Shelter</p>
    <input
    type="text"
    placeholder="Search here"
    onChange={handleChange}
    >
    </input>
    </div>
    <button className={styles.searchButton} 
    onClick={handleSearch}></button>
    </div>
  );
}