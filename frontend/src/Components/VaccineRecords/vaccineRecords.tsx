import styles from './vaccineRecords.module.css'

interface VaccineRecordsProps {
    vaccinationName: string[]
    vaccinationDate: Date[]
}

export const VaccineRecords: React.FC<VaccineRecordsProps> = ({vaccinationName, vaccinationDate}) => {

    // const vaccinationName = ['mock vaccine1', 'mock vaccine2']
    // const date = new Date(2023, 7, 15, 12, 30, 0, 0);


    return (
        <div className={styles.vaccineWrapper}>
            <div className={styles.vaccineMap}>
                {vaccinationName.map((vaccine, index) => {
                    return <p  key={index} >{vaccine}</p>
                })}
            </div>
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