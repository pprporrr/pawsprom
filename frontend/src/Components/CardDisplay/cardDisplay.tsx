import { Link, useNavigate } from 'react-router-dom'
import styles from './cardDisplay.module.css'
import { CardInfo } from './cardInfo'
import { FeaturesIcon } from './featuresIcon'
import { useEffect, useState } from 'react'

type cardDisplayProps = {
    triggerDefault: boolean,
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
        },
        name: string,
        phone: string,
        address: string,
    }
    url: string
}

export const CardDisplay: React.FC<cardDisplayProps> = ({data, url, triggerDefault}) => {
    const imageMock = 'https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg'
    const navigate = useNavigate()
    const [petData, setPetData] = useState(data)
    
    const handleClick = () => {
        window.location.href = url
    }

    useEffect(() => {
        setPetData(data)
    }, [triggerDefault])
    

    return (
        <div className={styles.cardWrapper} onClick={handleClick}>
            <img className={styles.imageWrapper} src={imageMock}></img>
            <div className={styles.infoWrapper}>
                <CardInfo
                breed={petData.breed}
                petName={petData.petName}
                address={petData.address}
                username={petData.name}
                phoneNo={petData.phone}></CardInfo>
                <FeaturesIcon features={petData.features}></FeaturesIcon>
            </div>
        </div>
    )
}