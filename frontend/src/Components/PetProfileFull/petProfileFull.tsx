import styles from './petProfileFull.module.css'
import speciesIcon from '../../assets/Icons/Pets/species-symbol.svg'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { slides } from '../../MockData/carouselData.json'
import { IconText } from '../IconText/iconText'
import { VaccineRecords } from '../VaccineRecords/vaccineRecords'

interface PetProfileFullProps {
    page: string
}

export const PetProfileFull: React.FC<PetProfileFullProps> = ({page}) => {

    if (page === 'PetProfileOwned' ) {
        console.log(page)
    }

    return (
        <div className={styles.cardWrapper}>
                {/* Title Section */}
                <section className={styles.topContainer}>
                    <div className={styles.titleContainer}>
                        <p className={styles.title}>Pet Profile</p>
                        <img src={speciesIcon}></img>
                        <p className={styles.title}>Edit pet profile</p>
                        <img src={speciesIcon}></img>
                    </div>
                </section>
                {/* General Information Section */}
                <section className={styles.infoContainer1}>
                    <ImageSlider data={slides}></ImageSlider>
                    <div className={styles.wrapperFlex}>
                        <IconText></IconText>
                        <IconText></IconText>
                        <IconText></IconText>
                    </div>
                </section>
                <section className={styles.infoContainer2}>
                <div className={styles.wrapperFlex}>
                        <IconText></IconText>
                        <IconText></IconText>
                        <IconText></IconText>
                    </div>
                </section>
                {/* Vaccine Records Section */}
                <section className={styles.vaccineContainer}>
                    <VaccineRecords></VaccineRecords>
                </section>
                {/* Features Section */}
                <section className={styles.featuresContainer}>
                    <h1>Pet Profile</h1>
                </section>
                {/* Button/Request Section */}
                <section className={styles.bottomContainer}>
                    <h1>Pet Profile</h1>
                </section>
            </div>
    )
}
