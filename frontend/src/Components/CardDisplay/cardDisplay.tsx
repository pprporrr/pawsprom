import { Link, useNavigate } from 'react-router-dom'
import styles from './cardDisplay.module.css'
import { CardInfo } from './cardInfo'
import { FeaturesIcon } from './featuresIcon'
import { useEffect, useState } from 'react'
import { baseAPI } from '../../main'
import { AxiosResponse } from 'axios'

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
        },
        name: string,
        phone: string,
        address: string,
    }
    url: string
}

export const CardDisplay: React.FC<cardDisplayProps> = ({data, url}) => {
    const navigate = useNavigate()
    const [petData, setPetData] = useState(data)
    const [imageURL, setImageURL] = useState<string>()

    async function requestImage(imageID: number) {

        const imageURL = `/imageAPI/get-petImage/${imageID}/`

        // ! test
        if (imageID === 2) {
            setImageURL('https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg')
        } else {
            setImageURL('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*')
        }
        
        try {
            const response: AxiosResponse<Blob> = await 
            baseAPI.get(imageURL, {
                responseType: 'blob'
            })

            if (response.data.type === "image/jpeg") {
                const blobURL = URL.createObjectURL(response.data)
                setImageURL(blobURL)
            } else {
                setImageURL(
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930")  
            }

        } catch (error) {
            throw error
        }
    }
    
    const handleClick = () => {
        window.location.href = url
    }

    useEffect(() => {
        if (data.imageIDs.length !== 0) {
            requestImage(data.imageIDs[0])
        } else {
            setImageURL(
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930")
        }  
    }, [])
    
    // useEffect(() => {
    //     setPetData(data)
    // }, [triggerDefault])
    
    return (
        <div className={styles.cardWrapper} onClick={handleClick}>
            <img className={styles.imageWrapper} src={imageURL}></img>
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