import styles from './AddVacinationRecord.module.css'
import { VaccineRecord } from './VaccineRecord'
import { ChangeEvent, useState } from 'react'

export const AddVacinationRecord = () => {
  const [vaccineRecordList, setVaccineList] = useState([])
  const [vaccineComponents, setVaccineComponents] = useState<string[]>(["init"])
  const [vaccineName, setVaccineName] = useState<string[]>([])
  const [vaccineDate, setVaccineDate] = useState<Date[]>([])


  function onClickHandler() {
    console.log('click')
    setVaccineComponents([...vaccineComponents, "add"])
    console.log(vaccineComponents)
  }

  const handleVaccineChange = (name: string, index: number) => {
    const tempVaccineName = [...vaccineName]
    tempVaccineName[index] = name
    setVaccineName(tempVaccineName)
  }

  const handleDateChange = (date: Date, index: number) => {
    const tempVaccineDate = [...vaccineDate]
    tempVaccineDate[index] = date
    setVaccineDate(tempVaccineDate)

  }

  console.log(vaccineName)
  console.log("Date:  ",vaccineDate)

  return (
  <section className={styles.vaccines_con}>
    <p>Vaccination Records</p>
    <p className={styles.booklet}>Vaccination Booket</p>
    <label htmlFor="booklet"> upload photo</label>
    <input type="file" id='booklet' hidden/>
    {/* <VaccineRecord/> */}
    {}
    {vaccineComponents.map((_, index) => (
    <VaccineRecord key={index} 
    index={index} 
    onVaccineChange={handleVaccineChange}
    onDateChange={handleDateChange}
    ></VaccineRecord>
    ))}
    <button type='button' className={styles.add_btn} onClick={onClickHandler} >+</button>
  </section>
  )
}
