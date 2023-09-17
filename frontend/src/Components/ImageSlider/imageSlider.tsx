import styles from './imageSlider.module.css'
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
        // ! test =======
        setImageURLs(['https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg'])
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
            {statusText !== undefined && (
            <div className={styles.status}>
                {statusText}
            </div>)}
            { imageIDs.length > 1 && (
            <button className={styles.arrowLeft} onClick={prevSlide}>
                <img src="left-arrow.svg"></img>
            </button>)}
            {imageURLs.map((image, index) => {

            if (image) {
                return <img 
                src={image} 
                key={index}
                className={slideIndex === index ? styles.slide : styles.hiddenSlide}
                ></img>
            } else {
                return null
            }
            })}
            { imageIDs.length > 1 && (
            <button className={styles.arrowRight} onClick={nextSlide}>
                <img src="right-arrow.svg"></img>
            </button>)}
            { imageIDs.length > 1 && (
                <div className={styles.dotIndicators}>
                {imageIDs.map((_, index) => {
                return <button 
                key={index}
                onClick={() => setSlideIndex(index)}
                className={slideIndex === index ? styles.dot : styles.dotInactive}
                ></button>
            })}
                </div>
            )}
        </div>
    )
} 