import styles from './requestDisplay.module.css'
import { IconText } from '../IconText/iconText'

export const RequestDisplay = () => {


    return (
        <div className={styles.singleRequest}>
            <div className={styles.leftInfo}>
                <p>Karnpitcha</p>
                <IconText text='09435935345802' fontSize={1.2} svgName='phone-symbol.svg'></IconText>
				<IconText text="Bangkok hello woeld mock data" fontSize={1.2} svgName='location-symbol.svg'></IconText>
            </div>
            <div className={styles.rightInfo}>
                <p>Date</p>
                <button>Reject</button>
                <button>Approve</button>
            </div>
        </div>
    )
}