import { useState } from "react"
import styles from './newSearchBar.module.css'
import { useLoaderData } from "react-router-dom"
import { baseAPI } from "../../main"
import { NewDropDown } from "../FilterSearch/Dropdown/newDropdown"
import { ToggleButton } from "../Searchbar/toggleButton"
import { NewFilter } from "./newFilter"
import { singleResult } from "../../Pages/SearchPage2/searchPage2"


type NewSearchBarProps = {
	handlePets: (pets: singleResult[]) => void
}

export const NewSearchBar: React.FC<NewSearchBarProps> = ({handlePets}) => {

	const [getDefault, setGetDefault] = useState<boolean>(false)
	const [petOptions, setPetOptions] = useState<any>()
	const [colorOptions, setColorOptions] = useState<any>()

	const defaultOptions: any = useLoaderData()


	return (
		<div className={styles.searchWrapper}>
			<NewFilter 
			handlePets={handlePets} />
		</div>
	)
}