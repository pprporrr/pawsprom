import { IconText } from '../IconText/iconText'
import styles from './shelterCard.module.css'

type ShelterCardProps = {
    name: string,
    phone: string,
    address: string,
    url: string
}

export const ShelterCard: React.FC<ShelterCardProps> = ({url, name, phone, address}) => {
    let imageURL = 'https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg'

    const handleClick = () => {
        window.location.href = url
    }

    return (
        <div className={styles.cardWrapper} onClick={handleClick}>
            <img className={styles.imageWrapper}
            src={imageURL}></img>
            <div className={styles.infoWrapper}>
                <p>{name}</p>
                <IconText text={address} fontSize={1} svgName='location-short-symbol.svg'></IconText>
                <IconText text={phone} fontSize={1} svgName='phone-short-symbol.svg'></IconText>
            </div>
        </div>
    )
}