import styles from './petProfileFull.module.css'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { IconText } from '../IconText/iconText'
import { VaccineRecords } from '../VaccineRecords/vaccineRecords'
import { Features } from '../FeaturesDisplay/featuresDisplay'
import { DeleteButton } from '../DeleteButton/deleteButton'
import { AdoptionButton } from '../AdoptionButton/adoptionButton.tsx'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'
import { RequestDisplay } from '../RequestDisplay/requestDisplay.tsx'


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
			feature1: boolean | null,
			feature2: boolean | null,
			feature3: boolean | null,
			feature4: boolean | null,
			feature5: boolean | null,
			feature6: boolean | null,
			feature7: boolean | null,
			feature8: boolean | null,
			feature9: boolean | null,
			feature10: boolean | null,
		}
		availabilityStatus: string
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
	const vaccineDateObjects = data.vaccinationDate.map(dateString => new Date(dateString))
	const dateOfBirth = new Date(data.dateofbirth)
	// response from api when click delete button
	const [apiResponseDEL, setAPIResponseDEL] = useState(null)
	const [apiResponseADOPT, setAPIResponseADOPT] = useState(null)
	

	//* sending request to API from button (start) ================================= 

	//* delete button
	const handleDeleteClick = () => {

		// test
		// setAPIResponse(true)

		console.log('send delete request')
		// test petID = 106 , // ! dont forget to change
        baseAPI.delete(`/petAPI/delete-profile/${petID}`)
        .then(response => {
            console.log('response from api', response.data.success)
			setAPIResponseDEL(response.data.success)
        })
        .catch(error => {
            console.error(error);
        })
	}

	//* adopt button
	
	const handleAdoptionClick = () => {
		// test
		// setAPIResponse(true)
		const dateofapplication = new Date();
		const year = dateofapplication.getFullYear();
		const month = String(dateofapplication.getMonth() + 1).padStart(2, '0');
		const day = String(dateofapplication.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
		
		console.log('send adoption request')
		const petID = 106
		const userID = 202
		baseAPI.post('/adoptionAPI/create-application/', { petID, userID, dateofapplication: formattedDate })
        .then(response => {
			console.log(response.data)
            console.log('response from api', response.data.success)
			setAPIResponseADOPT(response.data.success)
        })
        .catch(error => {
			console.error(error);
        })
	}

	//* sending request to API from button (end) =================================
	
	//* reset var
	useEffect(() => {
		setAPIResponseDEL(null)
		setAPIResponseADOPT(null)
    }, []);
	
	return (
		<div className={styles.cardWrapper}>
			{/* //!Title Section */}
			<section className={styles.topContainer}>
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>Pet Profile</h1>
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
			<section className={styles.firstRowWrapper}>
				{/* <ImageSlider imageIDs={data.imageIDs} baseAPI={baseAPI}></ImageSlider> */}
				{/* <div className={styles.infoContainer1}> */}
					<div className={styles.imageAndInfo}>
						<ImageSlider
						imageIDs={data.imageIDs} 
						baseAPI={baseAPI} 
						availabilityStatus={data.availabilityStatus}
						></ImageSlider>
							<div className={styles.infoText}>
								<h3>{data.breed}</h3>
								<div className={styles.NameText}>
									<h2>{data.petName}</h2>
								</div>
								<IconText text={data.age + ' years old' } fontSize={1.2} svgName='age-symbol.svg'></IconText>
								<IconText text={dateOfBirth} fontSize={1.2} svgName='birthday-symbol.svg'></IconText>
								<IconText text={data.gender} fontSize={1.2} svgName='gender-symbol.svg'></IconText>
								<IconText text={data.weight + ' kg'} fontSize={1.2} svgName='weight-symbol.svg'></IconText>
								<IconText text={data.color} fontSize={1.2} svgName='color-symbol.svg'></IconText>
							</div>
					</div>
					{ page != 'PetProfileOwned' && <div className={styles.moreInfo}>
						<IconText text={data.age + ' years old' } fontSize={1.2} svgName='owner-symbol.svg'></IconText>
						<IconText text={dateOfBirth} fontSize={1.2} svgName='phone-symbol.svg'></IconText>
						<IconText text={data.address} fontSize={1.2} svgName='location-symbol.svg'></IconText>
					</div>}
				<div className={styles.descriptionBox}>
					<h3>Bio</h3>
					<p>{data.description}</p>
				</div>
			</section>
			
			<div className={styles.secondRowWrapper}>
			{/* //!Vaccine Records Section */}
			<section className={styles.vaccineContainer}>
				<h2>Vaccine Records</h2>
				<VaccineRecords 
				vaccinationName={data.vaccinationName} 
				vaccinationDate={vaccineDateObjects}></VaccineRecords>
			</section>
			{/* //!Features Section */}
			<section className={styles.featuresContainer}>
				<h2>Features</h2>
				<Features features={data.features}></Features>
			</section>
			</div>
			<div>
			{/* //!Button/Request Section */}
			<section className={styles.bottomContainer}>
				{page === 'PetProfileOwned' && <DeleteButton 
				onClick={handleDeleteClick}
				apiResponse={apiResponseDEL}/>}
				{page === 'PetProfileOthers' && <AdoptionButton 
				onClick={handleAdoptionClick}
				apiResponse={apiResponseADOPT}/>}
			</section>
			<RequestDisplay></RequestDisplay>
			</div>
		</div>
	)
}
