import styles from './imageSlider.module.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs"
import { useEffect, useState } from 'react';
import { AxiosInstance, AxiosResponse } from 'axios';

interface ImageSliderProps {
    imageIDs: number[]
    baseAPI: AxiosInstance
    availabilityStatus: string
}

export const ImageSlider: React.FC<ImageSliderProps> = ({imageIDs, baseAPI, availabilityStatus}) => {
    // export const ImageSlider: React.FC<ImageSliderProps> = ({data}) => {


    //TODO: test with data from API and change from blob file to display as img

    const [slideIndex, setSlideIndex] = useState(0)
    const [imageURLs, setImageURLs] = useState<string[]>([])
    const [statusText, setStatusText] = useState<string>()

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

            const imageURL = `/imageAPI/get-petImage/${imageID}/`

            try {
                const response: AxiosResponse<Blob> = await 
                baseAPI.get(imageURL, {
                    responseType: 'blob'
                })

                if (response.data.type === "image/jpeg") {
                    const blobURL = URL.createObjectURL(response.data)
                    setImageURLs((imageURLs => [...imageURLs, blobURL]))
                } else {
                    setImageURLs((imageURLs => [...imageURLs, 
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"]))  
                }
    
            } catch (error) {
                throw error
            }
        }}
     // *---------------- GET IMAGE FROM API ----------------* //
        
    // reset var
    useEffect(() => {
        setImageURLs([])

    },[])

    useEffect(() => {
        console.log('imageid', imageIDs)
        requestImage(imageIDs)
    }, [imageIDs])

    useEffect(() => {

        if (availabilityStatus === 'Available' || availabilityStatus === 'Adopted') {
            setStatusText("Owned")
        } else {
            setStatusText(availabilityStatus)
        }

    }, [availabilityStatus])

    return (
        <div className={styles.slider}>
            {statusText !== undefined && (<div className={styles.status}>
                <p style={{ fontSize: '18px' }}>{statusText}</p>
            </div>)}
            { imageIDs.length > 1 && (
            <BsArrowLeftCircleFill className={styles.arrowLeft} onClick={prevSlide}/>)}
            {imageURLs.map((image, index) => {

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
            })}
            { imageIDs.length > 1 && (
            <BsArrowRightCircleFill className={styles.arrowRight} onClick={nextSlide}/>)}
            { imageIDs.length > 1 && (
                <span className={styles.dotIndicators}>
                {imageIDs.map((_, index) => {
                return <button 
                key={index}
                onClick={() => setSlideIndex(index)}
                className={slideIndex === index ? styles.dot : styles.dotInactive}
                ></button>
            })}
                </span>
            )}
        </div>
    )
} 