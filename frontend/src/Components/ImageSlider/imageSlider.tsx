import styles from './imageSlider.module.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs"
import { useEffect, useState } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Slide {
    src: string;
    alt: string;
  }

// interface ImageSliderProps {
//     data: Slide[];
// }

interface ImageSliderProps {
    imageIDs: number[]
    baseAPI: AxiosInstance
}

export const ImageSlider: React.FC<ImageSliderProps> = ({imageIDs, baseAPI}) => {

    //TODO: test with data from API and change from blob file to display as img

    const [slideIndex, setSlideIndex] = useState(0)
    const [currentImage, setCurrentImage] = useState('')
    const [imageURLs, setImageURLs] = useState<string[]>([])

    useEffect(()=> {

        requestImage(imageIDs)

    }, [imageIDs])

    // * Identify next image

    const nextSlide = () => {
        setSlideIndex(slideIndex === imageIDs.length - 1 ? 0 : slideIndex + 1)
    }

    const prevSlide = () => {
        setSlideIndex(slideIndex === 0 ? imageIDs.length - 1 : slideIndex - 1)
    }

    // *---------------- GET IMAGE FROM API ----------------* //

    async function requestImage(imageIDs: number[] ) {
        
        for (let i in imageIDs) {
            const imageID = imageIDs[i]

            const imageURL = `/petAPI/pet/image/${imageID}/`

            try {
                const response: AxiosResponse<Blob> = await 
                axios.get(imageURL, {
                    responseType: 'blob'
                })
    
                const blobURL = URL.createObjectURL(response.data)

                setImageURLs((imageURLs => [...imageURLs, blobURL]))
    
            } catch (error) {
                throw error
            }
    
        }

        console.log(imageURLs)

        }
     // *---------------- GET IMAGE FROM API ----------------* //



    return (
        <div className={styles.slider}>
            <div className={styles.status}>
                <p style={{ fontSize: '18px' }}>Owned</p>
            </div>
            <BsArrowLeftCircleFill className={styles.arrowLeft} onClick={prevSlide}/>
            {/* {imageIDs.map((id, index) => {

            const image = requestImage(id)

            if (image) {
                return <img 
                src={image} 
                key={index}
                className={slideIndex === index ? styles.slide : styles.hiddenSlide}
                // TODO: POST imageID to get image
                ></img>
            } else {
                return null
            }
            })} */}
            <BsArrowRightCircleFill className={styles.arrowRight} onClick={nextSlide}/>
            <span className={styles.dotIndicators}>
                {/* {data.map((_, index) => {
                    return <button 
                    key={index} 
                    onClick={() => setSlideIndex(index)} 
                    className={slideIndex === index ? styles.dot : styles.dotInactive}
                    ></button>
                })} */}
            </span>
        </div>
    )
} 