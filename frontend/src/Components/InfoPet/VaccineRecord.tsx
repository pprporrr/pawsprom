import styles from './VaccineRecord.module.css'

export const VaccineRecord = () => {
  return (
  <div className={styles.vaccine_con}>
    <label htmlFor="vaccine">Vaccines</label>
    <input type="text" id='vaccine' required/>
    <label htmlFor="date">Date</label>
    <input type="text" id='date' />
  </div>
  )
}
