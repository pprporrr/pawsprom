import styles from './requestDisplay.module.css'
import { IconText } from '../IconText/iconText'
import { useEffect } from 'react'

interface RequestDisplayProps {
    adoptionApplications: {
        [key:string] : {
            firstName: string,
            lastName: string,
            phoneNo: string,
            address: string,
        }
    }
}

export const RequestDisplay: React.FC<RequestDisplayProps> = ({adoptionApplications}) => {

    console.log(Object.values(adoptionApplications))
    
    return (
        <div className={styles.vaccineMap}>
        {Object.keys(adoptionApplications).map((key, _) => {

            return <div key={key} className={styles.singleRequest}>
            <div className={styles.leftInfo}>
                <p>{adoptionApplications[key].firstName}</p>
                <IconText text={adoptionApplications[key].phoneNo} fontSize={1.2} svgName='phone-symbol.svg'></IconText>
				<IconText text={adoptionApplications[key].address} fontSize={1.2} svgName='location-symbol.svg'></IconText>
            </div>
            <div className={styles.rightInfo}>
                <button>Reject</button>
                <button>Approve</button>
            </div>
        </div>
        })}
        </div>
        // <div className={styles.singleRequest}>
        //     <div className={styles.leftInfo}>
        //         <p>Karnpitcha</p>
        //         <IconText text='09435935345802' fontSize={1.2} svgName='phone-symbol.svg'></IconText>
		// 		<IconText text="Bangkok hello woeld mock data" fontSize={1.2} svgName='location-symbol.svg'></IconText>
        //     </div>
        //     <div className={styles.rightInfo}>
        //         <p>Date</p>
        //         <button>Reject</button>
        //         <button>Approve</button>
        //     </div>
        // </div>
    )
}