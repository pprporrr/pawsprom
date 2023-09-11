import styles from './vaccineRecords.module.css'

interface VaccineRecordsProps {
    vaccinationName: string[]
    vaccinationDate: Date[]
}

export const VaccineRecords: React.FC<VaccineRecordsProps> = ({vaccinationName, vaccinationDate}) => {

    //* receive 'vaccinationName' for vaccine name array
    //* 'vaccinationDate' for the date pet recieved each vaccine


    return (
            <div className={styles.vaccineMap}>
                {vaccinationName.map((vaccine, index) => {

                    const formattedDate = vaccinationDate[index].toLocaleDateString('en-GB', 
                    { day: '2-digit', month: 'short', year: 'numeric' })
                    .split(' ').join('-')
                    return  <div key={index} className={styles.vaccine}>
                    <p>{vaccine}</p>
                    <p>{formattedDate}</p>
                    </div>
                })}
            </div>
    )
}
