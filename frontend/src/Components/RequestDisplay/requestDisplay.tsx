import styles from './requestDisplay.module.css'
import { IconText } from '../IconText/iconText'
import { useEffect, useState } from 'react'
import { AxiosInstance } from 'axios'

type RequestDisplayProps = {
    baseAPI: AxiosInstance,
    petID: number,
    adoptionApplications: {
        [key:string] : {
            firstName: string,
            lastName: string,
            phoneNo: string,
            address: string,
            dateofapplication: string,
        }
    },
}

export const RequestDisplay: React.FC<RequestDisplayProps> = (
    {baseAPI, petID, adoptionApplications}) => {

    console.log(Object.values(adoptionApplications))

    const handleReject = (event: React.MouseEvent<HTMLButtonElement>) => {
        
        const userID = Number((event.currentTarget.id).split("-")[1]);
        const date = adoptionApplications[userID].dateofapplication

        console.log('date', date)

        baseAPI.put('/adoptionAPI/update-application/', { 
            petID, 
            userID, 
            dateofapplication: date,
            approvalStatus:"Rejected"
        })
        .then(response => {
			console.log(response.data)
            console.log('status from api', response.data.success)
            if (response.data.success){
            location.reload()
            }
        })
        .catch(error => {
			console.error(error);
        })

    }

    useEffect(() => {

    },[adoptionApplications])

    const handleApprove = (event: React.MouseEvent<HTMLButtonElement>) => {

        const userID = Number((event.currentTarget.id).split("-")[1]);
        const date = adoptionApplications[userID].dateofapplication

        baseAPI.put('/adoptionAPI/update-application/', { 
            petID, 
            userID,
            dateofapplication: date,
            approvalStatus:"Approved"
        })
        .then(response => {
			console.log(response.data)
            console.log('status from api', response.data.success)
            if (response.data.success){
                location.reload()
                }
        })
        .catch(error => {
			console.error(error);
        })
    }

    if (Object.keys(adoptionApplications).length <= 0 ) {
        return null
    }

    return (
        <div className={styles.vaccineMap}>
        {Object.keys(adoptionApplications).map((key, _) => {

            return <div key={key} className={styles.singleRequest}>
            <div className={styles.leftInfo}>
                <h3>{adoptionApplications[key].firstName + " " + adoptionApplications[key].lastName}</h3>
                <IconText text={adoptionApplications[key].phoneNo} fontSize={1} svgName='phone-symbol.svg'></IconText>
				<IconText text={adoptionApplications[key].address} fontSize={1} svgName='location-symbol.svg'></IconText>
            </div>
            <div className={styles.pawsBg}></div>
            <div className={styles.rightInfo}>
            <div className={styles.dateWrapper}>
                <p>{adoptionApplications[key].dateofapplication}</p>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.rejectButton} id={"Reject-" + key} onClick={handleReject}>Reject</button>
                <button className={styles.approveButton} id={"Approve-" + key} onClick={handleApprove}>Approve</button>
            </div>
            {/* <button onClick={handleApprove()}>Approve</button> */}
            </div>
        </div>
        })}
        </div>
    )
}