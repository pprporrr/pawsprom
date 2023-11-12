import { useNavigate } from 'react-router-dom'
import styles from './cardDisplay.module.css'
import { CardInfo } from './cardInfo'
import { FeaturesIcon } from './featuresIcon'
import { useEffect, useState } from 'react'
import { baseAPI } from '../../main'
import { AxiosResponse } from 'axios'

type cardDisplayProps = {
  petID: number
  className?: string,
  triggerDefault?: boolean,
  userData?:{
    username: string,
    phone: string,
    address: string
  }
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
  url: string,
}

export const CardDisplay: React.FC<cardDisplayProps> = ({className, data, url, userData}) => {
  const navigate = useNavigate()
  const petData = data
  const [imageURL, setImageURL] = useState<string>()
  const errorImage = '/pet-image.jpg'

  async function requestImage(imageIDs: number) {
    // const imageURL = `/imageAPI/get-petImage/${imageID}/`
    let imageURL = `/imageAPI/get-petImage/${imageIDs}/`
    // const pullImage = await baseAPI.get('/imageAPI/get-petImage/1/')

    try {
      const response: AxiosResponse<Blob> = await 
      baseAPI.get(imageURL)
      // console.log(response)
      // console.log(response.status)

      if (response.status === 200) {
          const blobURL = URL.createObjectURL(response.data)
          // console.log(blobURL)
          setImageURL(blobURL)
      } else {
          setImageURL(errorImage)  
      }

    } catch (error) {
      throw error
    }
  }
    
  const handleClick = () => {
    navigate(`/${url}`)
  }

  useEffect(() => {
    if (data.imageIDs.length !== 0) {
        requestImage(data.imageIDs[0])
    } else {
        setImageURL(errorImage)
    }  
  }, [])


  return (
    <div className={className} onClick={handleClick}>
      <img className={styles.imageWrapper} src={imageURL}></img>
      <div className={styles.infoWrapper}>
        {
          userData === undefined ? 
          (
            <CardInfo
            breed={petData.breed}
            petName={petData.petName}
            address={petData.address}
            username={petData.name}
            phoneNo={petData.phone}></CardInfo>
          ) :
          (
            <CardInfo
            breed={petData.breed}
            petName={petData.petName}
            address={userData.address}
            username={userData.username}
            phoneNo={userData.phone}></CardInfo>
          )
        }
        <FeaturesIcon features={petData.features}></FeaturesIcon>
      </div>
    </div>
  )
}