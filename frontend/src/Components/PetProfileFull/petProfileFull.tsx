import styles from './petProfileFull.module.css'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { slides } from '../../MockData/carouselData.json'
import { IconText } from '../IconText/iconText'
import { VaccineRecords } from '../VaccineRecords/vaccineRecords'
import { Features } from '../FeaturesDisplay/featuresDisplay'
import { DeleteButton } from '../DeleteButton/deleteButton'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'


interface PetProfileFullProps {
	petID: number
	page: string
	data: { petName: string
		species: string | null
		breed: string | null
		age: number
		gender: string
		weight: number
		color: string | null
		dateofbirth: string
		description: string | null
		imageIDs: number[]
		features: {
			feature1: boolean,
			feature2: boolean,
			feature3: boolean,
			feature4: boolean,
			feature5: boolean,
			feature6: boolean,
			feature7: boolean,
			feature8: boolean,
			feature9: boolean,
			feature10: boolean,
		}
		availabiltyStatus: string
		vaccinationRecord: null
		// shelterID: number
		vaccinationName: string[]
		vaccinationDate: string[]
		address: string
	}

	baseAPI: AxiosInstance
}

// TODO: fix svg file , now using img calling svg

export const PetProfileFull: React.FC<PetProfileFullProps> = ({petID, page, data, baseAPI}) => {

	// * receive 'page' to identify visibility of components (button)
	//* 'data' is the data fetch from API
	//* 'baseAPI' base URL of API (AxiosInstance)

	// change string in 'vaccinationDate' and 'dateofbirth' into Date Object
	// console.log(data.vaccinationDate)
	const vaccineDateObjects = data.vaccinationDate.map(dateString => new Date(dateString))
	const dateOfBirth = new Date(data.dateofbirth)
	const [triggerDelete, setTriggerDelete] = useState(false)
	const [apiResponse, setAPIResponse] = useState(null)
	
	//* delete button sending delete request
	const handleDeleteClick = () => {

		console.log('send delete request')
		// test petID = 103
        baseAPI.delete('/petAPI/delete-profile/106/')
        .then(response => {
            console.log('response from api', response.data.success)
			setAPIResponse(response.data.success)
        })
        .catch(error => {
            console.error(error);
        })
	}
	
	useEffect(() => {
	console.log("set response", apiResponse)
	}, [apiResponse])
	
	return (
		<div className={styles.cardWrapper}>
			{/* //!Title Section */}
			<section className={styles.topContainer}>
				<div className={styles.titleContainer}>
					<p className={styles.title}>Pet Profile</p>
					<div style={{ width: '2.813rem', height: '2.813rem' }}>
						{/* <SpeciesSymbol></SpeciesSymbol> change later na vvvvvvvvvvv svg*/}
						<img src="../../cat.svg" alt="edit-symbol" />
					</div>
					<p className={styles.title}>Edit pet profile</p>
					<div  style={{ width: '1.563rem', height: '1.563rem' }}>
						{/* // change later na vvvvvvvvvvv svg  */}
						<img src="../../edit-symbol.svg" alt="edit-symbol" />
					</div>
				</div>
			</section>
			{/* //!General Information Section */}
			<section className={styles.infoContainer1}>
				{/* <ImageSlider imageIDs={data.imageIDs} baseAPI={baseAPI}></ImageSlider> */}
				<ImageSlider data={slides}></ImageSlider>
				<div className={styles.wrapperFlex}>
					<IconText text={data.breed} fontSize={1} isVisible={true}></IconText>
					<IconText text={data.petName} fontSize={1.5} isVisible={true}></IconText>
					<IconText text={data.age + ' years old' } fontSize={1} isVisible={true}></IconText>
					<IconText text={dateOfBirth} fontSize={1} isVisible={true}></IconText>
					<IconText text={data.gender} fontSize={1} isVisible={true}></IconText>
					<IconText text={data.weight + ' kg'} fontSize={1} isVisible={true}></IconText>
					<IconText text={data.color} fontSize={1} isVisible={true}></IconText>
				</div>
			</section>
			<section className={styles.infoContainer2}>
			<div className={styles.wrapperFlex}>
				{/* //TODO: adding description of pet */}
				<IconText text={'funny'} fontSize={1.5} isVisible={true}></IconText>
				<IconText text={'git'} fontSize={1.5} isVisible={true}></IconText>
				<IconText text={'hello'} fontSize={1.5} isVisible={true}></IconText>
			</div>
			</section>
			{/* //!Vaccine Records Section */}
			<section className={styles.vaccineContainer}>
				<VaccineRecords 
				vaccinationName={data.vaccinationName} 
				vaccinationDate={vaccineDateObjects}></VaccineRecords>
			</section>
			{/* //!Features Section */}
			<section className={styles.featuresContainer}>
				<Features features={data.features}></Features>
			</section>
			{/* //!Button/Request Section */}
			<section className={styles.bottomContainer}>
				<DeleteButton 
				onClick={handleDeleteClick}
				setTriggerDelete={setTriggerDelete}
				triggerDelete={triggerDelete}
				apiResponse={apiResponse}/>
			</section>
		</div>
	)
}
