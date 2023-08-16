import styles from './petProfileFull.module.css'
import { ImageSlider } from '../ImageSlider/imageSlider'
import { slides } from '../../MockData/carouselData.json'
import { IconText } from '../IconText/iconText'
import { VaccineRecords } from '../VaccineRecords/vaccineRecords'
import { SpeciesSymbol } from '../../assets/Icons/Pets/speciesSymbol'
import { EditPetSymbol } from '../../assets/Icons/Others/editPetSymbol'
import { LoveChildrenSymbol } from '../../assets/Icons/Features/loveChildrenSymbol'
import { Features } from '../Features/features'

// interface Data {
//     petName: string
//     species: string | null
//     breed: string | null
//     age: number
//     gender: string
//     weight: number
//     color: string | null
//     // dateofbirth: Date
//     // description: string | null
//     // image: []
//     // features: {
//     //     feature1: boolean
//     // }

//     // availabiltyStatus: string
//     // vaccinationRecord: null
// }



interface PetProfileFullProps {
    page: string
    data: { petName: string
    species: string | null
    breed: string | null
    age: number
    gender: string
    weight: number
    color: string | null
    // dateofbirth: Date
    // description: string | null
    // image: []
    // features: {
    //     feature1: boolean
    // }

    // availabiltyStatus: string
    // vaccinationRecord: null
    }

}

export const PetProfileFull: React.FC<PetProfileFullProps> = ({page, data}) => {

    if (page === 'PetProfileOwned' ) {
        // console.log(page)
        // console.log('Data example')
        // console.log(data)
    }


    return (
        <div className={styles.cardWrapper}>
                {/* Title Section */}
                <section className={styles.topContainer}>
                    <div className={styles.titleContainer}>
                        <p className={styles.title}>Pet Profile</p>
                        <div style={{ width: '45px', height: '45px' }}>
                            <SpeciesSymbol></SpeciesSymbol>
                        </div>
                        <p className={styles.title}>Edit pet profile</p>
                        <div  style={{ width: '25px', height: '25px' }}>
                            <EditPetSymbol></EditPetSymbol>
                        </div>
                    </div>
                </section>
                {/* General Information Section */}
                <section className={styles.infoContainer1}>
                    <ImageSlider data={slides}></ImageSlider>
                    <div className={styles.wrapperFlex}>
                        {Object.entries(data).map(([key, value]) => {
                            return <IconText key={key} 
                            text={value}></IconText>
                        })
                        }
                    </div>
                </section>
                <section className={styles.infoContainer2}>
                <div className={styles.wrapperFlex}>
                        <IconText text={'funny'}></IconText>
                        <IconText text={'git'}></IconText>
                        <IconText text={'hello'}></IconText>
                    </div>
                </section>
                {/* Vaccine Records Section */}
                <section className={styles.vaccineContainer}>
                    <VaccineRecords></VaccineRecords>
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
