import styles from './AddVacinationRecord.module.css'
import { VaccineRecord } from './VaccineRecord'
import { useState } from 'react'

export const AddVacinationRecord = () => {
  const [vaccineRecordList, setVaccineList] = useState([])

  function onClickHandler(){
    
  }

  return (
  <section className={styles.vaccines_con}>
    <p>Vaccination Records</p>
    <p className={styles.booklet}>Vaccination Booket</p>
    <label htmlFor="booklet"> upload photo</label>
    <input type="file" id='booklet' hidden/>
    <VaccineRecord/>
    {}
    <button type='button' className={styles.add_btn} onClick={onClickHandler} >+</button>
  </section>
  )
}
