import styles from './cardDisplay.module.css'
import { CardInfo } from './cardInfo'
import { FeaturesIcon } from './featuresIcon'

type cardDisplayProps = {
    data: {
        petName: string,
        species: string,
        breed: string,
        availabilityStatus: string,
        imageIDs: number[]
        features: {
            feature1: boolean
            feature2: boolean
            feature3:boolean
            feature4: boolean
            feature5: boolean
            feature6: boolean
            feature7: boolean
            feature8: boolean
            feature9: boolean
            feature10: boolean
            feature11: boolean
        },
        name: string,
        phone: string,
        address: string,
    }
}

export const CardDisplay: React.FC<cardDisplayProps> = ({data}) => {
    const imageMock = 'https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg'

    return (
        <div className={styles.cardWrapper}>
            <img className={styles.imageWrapper} src={imageMock}></img>
            <div className={styles.infoWrapper}>
                <CardInfo
                breed={data.breed}
                petName={data.petName}
                address={data.address}
                username={data.name}
                phoneNo={data.phone}></CardInfo>
                <FeaturesIcon features={data.features}></FeaturesIcon>
            </div>
        </div>
    )
}