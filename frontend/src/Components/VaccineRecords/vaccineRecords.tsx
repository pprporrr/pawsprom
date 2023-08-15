import styles from './vaccineRecords.module.css'

export const VaccineRecords = () => {

    const vaccinationName = ['mock vaccine1', 'mock vaccine2']
    const date = new Date(2023, 7, 15, 12, 30, 0, 0);

    return (
        <div className={styles.vaccineWrapper}>
            {/* <div className={styles.vaccineMap}>
                {vaccinationName.map((vaccine, index) => {
                    return <p>{vaccine}</p>
                })}
            </div>
            <div className={styles.dateMap}>
                {vaccinationName.map((vaccine, index) => {
                    return <p>{vaccine}</p>
                })}
            </div> */}
        </div>
    )
}

// "<io_.BufferedWriter name='fjnsofs.JPG'>"