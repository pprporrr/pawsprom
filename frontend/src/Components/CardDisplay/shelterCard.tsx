import { useNavigate } from 'react-router-dom'
import { IconText } from '../IconText/iconText'
import styles from './shelterCard.module.css'

type ShelterCardProps = {
    name: string,
    phone: string,
    address: string,
    url: string
}

export const ShelterCard: React.FC<ShelterCardProps> = ({url, name, phone, address}) => {
    const navigate = useNavigate()  
    let imageURL = '/shelter-image.jpg'

    const handleClick = () => {
        navigate(`/${url}`)
    }

    return (
        <div className={styles.cardWrapper} onClick={handleClick}>
            <img className={styles.imageWrapper}
            src={imageURL}></img>
            <div className={styles.infoWrapper}>
                <p>{name}</p>
                <IconText text={address} fontSize={1} svgName='/location-short-symbol.svg'></IconText>
                <IconText text={phone} fontSize={1} svgName='/phone-short-symbol.svg'></IconText>
            </div>
        </div>
    )
}