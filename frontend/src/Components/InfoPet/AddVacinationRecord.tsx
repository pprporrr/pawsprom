import styles from './AddVacinationRecord.module.css'

export const AddVacinationRecord = () => {
  return (
  <section className={styles.vaccines_con}>
    <p>Vaccination Records</p>
    <div className={styles.vaccine_con}>
      <label htmlFor="vaccine">Vaccines</label>
      <input type="text" id='vaccine'/>
      <label htmlFor="date">Date</label>
      <input type="text" id='date' />
    </div>
  </section>
  )
}
