import { useState } from 'react';
import styles from './searchShelter.module.css'
import Select from 'react-select'
import { baseAPI } from '../../main';
import { singleResult } from '../../Pages/SearchPage2/searchPage2';

type SearchShelterProps = {
  handleShelter: (shelters: any) => void
}

export const SearchShelter: React.FC<SearchShelterProps> = ({handleShelter}) => {
  const handleChange = async(event: any) => {
    const target = event.target as HTMLInputElement;
    let response = getShelter(target.value)
    handleShelter(response)
  }

  const getShelter = async(inputText: string) => {
    try {
        let resData = await baseAPI.post(
          '', inputText )
        return resData
        } catch (error) {
          console.log((error as Error).message)
  }}
  
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
    <img className={styles.searchImg}
    src="search-symbol.svg"/>
    </div>
  );
}