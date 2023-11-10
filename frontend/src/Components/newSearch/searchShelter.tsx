import styles from './searchShelter.module.css'
import { baseAPI } from '../../main';

type SearchShelterProps = {
  handleShelter: (shelters: any) => void
}

export const SearchShelter: React.FC<SearchShelterProps> = ({handleShelter}) => {
  const handleChange = async(event: any) => {
    const target = event.target as HTMLInputElement;
    let response = await getShelter(target.value)
    handleShelter(response)
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