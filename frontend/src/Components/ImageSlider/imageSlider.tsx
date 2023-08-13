import styles from './imageSlider.module.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs"
import { useState } from 'react';

interface Slide {
    src: string;
    alt: string;
  }

interface ImageSliderProps {
    data: Slide[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({data}) => {
    // console.log(data)

    const [slideIndex, setSlideIndex] = useState(0)

    const nextSlide = () => {
        setSlideIndex(slideIndex === data.length - 1 ? 0 : slideIndex + 1)
    }

    const prevSlide = () => {
        setSlideIndex(slideIndex === 0 ? data.length - 1 : slideIndex - 1)
    }

    return (
        <div className={styles.slider}>
            <div className={styles.status}>
                <p style={{ fontSize: '18px' }}>Owned</p>
            </div>
            <BsArrowLeftCircleFill className={styles.arrowLeft} onClick={prevSlide}/>
            {data.map((item, index) => {
            return <img 
            src={item.src} 
            alt={item.alt} 
            key={index}
            className={slideIndex === index ? styles.slide : styles.hiddenSlide}
            ></img>
            })}
            <BsArrowRightCircleFill className={styles.arrowRight} onClick={nextSlide}/>
            <span className={styles.dotIndicators}>
                {data.map((_, index) => {
                    return <button 
                    key={index} 
                    onClick={() => setSlideIndex(index)} 
                    className={slideIndex === index ? styles.dot : styles.dotInactive}
                    ></button>
                })}
            </span>
        </div>
    )
} 