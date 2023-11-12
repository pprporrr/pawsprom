
import styles from './newSearchBar.module.css'
import { NewFilter } from "./newFilter"
import { singleResult } from "../../Pages/SearchPage2/searchPage2"


type NewSearchBarProps = {
	handlePets: (pets: singleResult[] | string) => void
}

export const NewSearchBar: React.FC<NewSearchBarProps> = ({handlePets}) => {

	// const [getDefault, setGetDefault] = useState<boolean>(false)
	// const [petOptions, setPetOptions] = useState<any>()
	// const [colorOptions, setColorOptions] = useState<any>()
	// const defaultOptions: any = useLoaderData()

	return (
		<div className={styles.searchWrapper}>
			<NewFilter 
			handlePets={handlePets} />
		</div>
	)
}