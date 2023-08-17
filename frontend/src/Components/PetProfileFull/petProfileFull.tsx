import styles from './petProfileFull.module.css'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { slides } from '../../MockData/carouselData.json'
import { IconText } from '../IconText/iconText'
import { VaccineRecords } from '../VaccineRecords/vaccineRecords'
import { SpeciesSymbol } from '../../assets/Icons/Pets/speciesSymbol'
import { EditPetSymbol } from '../../../public/editPetSymbol'
import { LoveChildrenSymbol } from '../../assets/Icons/Features/loveChildrenSymbol'
import { Features } from '../Features/features'


interface PetProfileFullProps {
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
		image: any[]
		features: {
				feature1: boolean
		}
		availabiltyStatus: string
		vaccinationRecord: null
		shelterID: number
		vaccinationName: string[]
		vaccinationDate: string[]
		address: string
	}
}

export const PetProfileFull: React.FC<PetProfileFullProps> = ({page, data}) => {

	if (page === 'PetProfileOwned' ) {
			// console.log(page)
			// console.log('Data example')
			// console.log(data)
	}

	const vaccineDateObjects = data.vaccinationDate.map(dateString => new Date(dateString))
	const dateOfBirth = new Date(data.dateofbirth)
	

	return (
		<div className={styles.cardWrapper}>
			{/* Title Section */}
			<section className={styles.topContainer}>
				<div className={styles.titleContainer}>
					<p className={styles.title}>Pet Profile</p>
					<div style={{ width: '2.813rem', height: '2.813rem' }}>
						<SpeciesSymbol></SpeciesSymbol>
					</div>
					<p className={styles.title}>Edit pet profile</p>
					<div  style={{ width: '1.563rem', height: '1.563rem' }}>
						{/* // change later na vvvvvvvvvvv  */}
						<img src="../../public/edit-symbol.svg" alt="" />
					</div>
				</div>
			</section>
			{/* General Information Section */}
			<section className={styles.infoContainer1}>
				<ImageSlider data={slides}></ImageSlider>
				<div className={styles.wrapperFlex}>
					<IconText text={data.breed} fontSize={1}></IconText>
					<IconText text={data.petName} fontSize={1.5}></IconText>
					<IconText text={data.age + ' years old' } fontSize={1}></IconText>
					<IconText text={dateOfBirth} fontSize={1}></IconText>
					<IconText text={data.gender} fontSize={1}></IconText>
					<IconText text={data.weight + ' kg'} fontSize={1}></IconText>
					<IconText text={data.color} fontSize={1}></IconText>
				</div>
			</section>
			<section className={styles.infoContainer2}>
			<div className={styles.wrapperFlex}>
				<IconText text={'funny'} fontSize={1.5}></IconText>
				<IconText text={'git'} fontSize={1.5}></IconText>
				<IconText text={'hello'} fontSize={1.5}></IconText>
			</div>
			</section>
			{/* Vaccine Records Section */}
			<section className={styles.vaccineContainer}>
				<VaccineRecords 
				vaccinationName={data.vaccinationName} 
				vaccinationDate={vaccineDateObjects}></VaccineRecords>
			</section>
			{/* Features Section */}
			<section className={styles.featuresContainer}>
				<Features></Features>
			</section>
			{/* Button/Request Section */}
			<section className={styles.bottomContainer}>
				<h1>Pet Profile</h1>
			</section>
		</div>
	)
}
