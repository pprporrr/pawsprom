import styles from './vaccineRecords.module.css'

interface VaccineRecordsProps {
    vaccinationName: string[]
    vaccinationDate: Date[]
}

export const VaccineRecords: React.FC<VaccineRecordsProps> = ({vaccinationName, vaccinationDate}) => {

    //* receive 'vaccinationName' for vaccine name array
    //* 'vaccinationDate' for the date pet recieved each vaccine


    return (
        <div className={styles.vaccineWrapper}>
            {/* //! vaccine Name */}
            <div className={styles.vaccineMap}>
                {vaccinationName.map((vaccine, index) => {
                    return <p  key={index} >{vaccine}</p>
                })}
            </div>
            {/* //! vaccine Date */}
            <div className={styles.dateMap}>
                {vaccinationDate.map((date, index) => {
                    const formattedDate = date.toLocaleDateString('en-GB', 
                    { day: '2-digit', month: 'short', year: 'numeric' })
                    .split(' ').join('-')
    
                    return <p  key={index}>{formattedDate}</p>
                })}
            </div>
        </div>
    )
}

// "<io_.BufferedWriter name='fjnsofs.JPG'>"