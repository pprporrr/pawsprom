import { useState } from "react"
import styles from './newFilter.module.css'
import { useLoaderData } from "react-router-dom"
import { baseAPI } from "../../main"
import { NewDropDown } from "../FilterSearch/Dropdown/newDropdown"
import { singleResult } from "../../Pages/SearchPage2/searchPage2"
import Popup from "reactjs-popup"
import { NewMoreFilter } from "./newMoreFilter"

type NewFilterProps = {
	handlePets: (pets: singleResult[]| string) => void
}

type FeatureFilter = {
    [key:string]: boolean
}


export type SelectedFilter = {
	species?: string[]
	breed?: string[]
	color?: string[]
	ageRange?: number[]
	weight?: number[]
	features?: {
		[key:string]: boolean
	}
}

export const NewFilter: React.FC<NewFilterProps> = (
	{handlePets}) => {

	const defaultOptions: any = useLoaderData()
	const [species, setSpecies] = useState(defaultOptions["species"])
	const [breed, setBreed] = useState(defaultOptions["breed"])
	const [color, setColor] = useState(defaultOptions["color"])
	const [ageRange, setAgeRange] = useState<number[]>([])
	const [weightRange, setWeightRange] = useState<number[]>([])
	const [selectedOptions, setSelectedOptions] = useState<SelectedFilter>() 
	const [pets, setPets] = useState<singleResult[]>()
    const features = 
        {   'feature1': false,
            'feature2': false,
            'feature3': false,
            'feature4': false,
            'feature5': false,
            'feature6': false,
            'feature7': false,
            'feature8': false,
            'feature9': false,
            'feature10': false,
            'feature11': false,}

	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	//* when select filter species, breed, color
	const handleFilterSelect = async(category:keyof SelectedFilter, options: string[]) => {
		let tempSelected = selectedOptions
		tempSelected = {...tempSelected, 
				[category]: options}
		if (options.length === 0) {
				delete tempSelected[category]}
		setSelectedOptions(tempSelected)
		getFilterData(tempSelected, category)
	}

	const handleFilterRange = async(category:keyof SelectedFilter, options: number[]) => {
		let tempSelected = selectedOptions
		tempSelected = {...tempSelected, 
			[category]: options}
		if (options.length === 0) {
			delete tempSelected[category]}
		setSelectedOptions(tempSelected)
	}

	const handleSearch = async() => {
		let res = await getPetData(selectedOptions)
		if (res != undefined) {
			handlePets(res)
		}
	}

    const handleFeatures = 
    async(category:keyof SelectedFilter, options: any) => {
        let tempSelected = selectedOptions
		tempSelected = {...tempSelected, 
				[category]: options}
        setSelectedOptions(tempSelected)
    }
        

	const handleMoreFilter = () => {
		setIsConfirmOpen(!isConfirmOpen)
	}

	//* get new options according to the selected options
	const getFilterData = async(tempSelected: any, category: keyof SelectedFilter) => {
		console.log('length',Object.keys(tempSelected))
		//* no filter selected set to default

		if (Object.keys(tempSelected).length === 0 ||
        (Object.keys(tempSelected).length === 1 && tempSelected['features'] !== undefined)) {
			setSpecies(defaultOptions["species"])
			setBreed(defaultOptions["breed"])
			setColor(defaultOptions["color"])
			handlePets('default')
		}
		else {
			try {
				let resOptions = await baseAPI.post('/petAPI/drop-down/filter/',
				tempSelected )
				let data =  resOptions.data.data
				console.log('from api', data)
				//! test
				// let data = {
				// 	'species': ['Dog', 'Cat', 'Horse', 'Bird', 'Fish'],
				// 	'breed': ['Labrador Retriever'],
				// 	'color' : ['Black','White']
				// }
				if (category !== 'species'){
				setSpecies(data.species.map((value: string) => ({
					label: value,
					value: value
					})))
				}
				if (category !== 'breed'){
				setBreed(data.breed.map((value: string) => ({
					label: value,
					value: value
					})))
				}

				if (category !== 'color'){
				setColor(data.color.map((value: string) => ({
					label: value,
					value: value
					})))
				}
			} catch (error) {
					console.log((error as Error).message)
			}
	}
}

	// * get pets that match the filters
	const getPetData = async(selectedOptions: any) => {

		try {
				let resData = await baseAPI.post(
						'/petAPI/search-pet/', selectedOptions )

						console.log(resData)
				try {
						let resPets = await baseAPI.post('/petAPI/info-short/', 
						{petIDs: resData.data.data})
						setPets(resPets.data.data)

						console.log(resPets.data.data)
						return resPets.data.data
				} catch (error) {
						console.log((error as Error).message)
				}
		} catch (error) {
				console.log((error as Error).message)
		}
	}
	console.log(selectedOptions)
	return (
		<div className={styles.searchBarWrapper}>
			<NewDropDown
				currentOption={selectedOptions !== undefined
                && selectedOptions['species']? 
				selectedOptions['species']: []}
				category={"species"}
				options={species}
				handleSelect={handleFilterSelect}/>
			<NewDropDown
					currentOption={selectedOptions !== undefined
                    && selectedOptions['breed']?
					selectedOptions['breed']: []}
					category={"breed"}
					options={breed}
					handleSelect={handleFilterSelect}/>
			<div className={styles.buttonWrapper}>
				<button className={styles.searchButton}
					type="submit">
					<img className={styles.searchImg}
					src="/search-symbol.svg"
					onClick={handleSearch}/>
				</button>
				<button onClick={handleMoreFilter}
				className={styles.moreFilter}>More Filter</button>
				<Popup open={isConfirmOpen}>
					<NewMoreFilter
						color={color}
                        features={selectedOptions !== undefined
                        && selectedOptions['features']?
                        selectedOptions['features']: features}
                        handleFeatures={handleFeatures}
						onConfirm={handleMoreFilter}
						handleSelectsOption={handleFilterSelect}
						handleSelectsRange={handleFilterRange}
						selectedOptions={selectedOptions}
					></NewMoreFilter>
				</Popup>
			</div>
		</div>
	)
}