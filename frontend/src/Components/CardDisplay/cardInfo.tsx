import { IconText } from "../IconText/iconText"
import styles from "./cardInfo.module.css"

type CardInfoProps = {
  breed: string
  petName: string
  address: string
  username: string
  phoneNo: string
}

export const CardInfo: React.FC<CardInfoProps> = ({breed, petName, address, username, phoneNo}) => {

  return (
    <div className={styles.infoDeco}>
      <p>{breed}</p>
      <p>{petName}</p>
      <div className={styles.addressContainer}>
        <span className={styles.image}>
          <img src="/location-short-symbol.svg" />
        </span>
        <span className={styles.address}>
          {address}
        </span>
      </div>
      <IconText text={username} fontSize={1} svgName='/owner-short-symbol.svg'></IconText>
      <IconText text={phoneNo} fontSize={1} svgName='/phone-short-symbol.svg'></IconText>
    </div>
  )
}