import styles from './petProfileFull.module.css'
import speciesIcon from '../../assets/Icons/Pets/species-symbol.svg'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { slides } from '../../MockData/carouselData.json'

interface PetProfileFullProps {
    page: string
    petID: number
}

export const PetProfileFull: React.FC<PetProfileFullProps> = ({page, petID}) => {

    if (page === 'PetProfileOwned' && petID === 102) {
        console.log(page, petID)
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
                    <h1>Hello</h1>
                </section>
                <section className={styles.infoContainer2}>
                    <h1>Pet Profile</h1>
                </section>
                {/* Vaccine Records Section */}
                <section className={styles.vaccineContainer}>
                    <h1>Pet Profile</h1>
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
