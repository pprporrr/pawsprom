import styles from './EditVacinationRecord.module.css'
import { EditRecord } from './EditRecord'
import { useEffect, useState } from 'react'

type EditVacinationProps = {
  handleVaccine: (vaccines: string[], dates: string[]) => Promise<void>
  currentBooklet: string
  currentVaccine: string[]
  currentDate: string[]
  handleRecord: (noRecord: boolean) => Promise<void>
}

export const EditVacinationRecord: React.FC<EditVacinationProps> = 
  ({handleVaccine, currentBooklet, 
    currentVaccine, currentDate, handleRecord}) => {
  // const [vaccineRecordList, setVaccineList] = useState([])
  const [vaccineComponents, setVaccineComponents] = useState<string[]>(["init"])
  const [vaccineName, setVaccineName] = useState<string[]>(currentVaccine)
  const [vaccineDate, setVaccineDate] = useState<string[]>(currentDate)
  const [file, setFile] = useState<string>(currentBooklet)
  const [counter, setCounter] = useState<number>(currentDate.length-1)

  const handleFileChange = (event: any) => {
    let blob = new Blob([event.target.files[0]])
    if (blob.size > 9) {
    setFile(URL.createObjectURL(blob))
  }}

  function onClickAdd() {
    handleRecord(false)
    if (currentVaccine[vaccineComponents.length] !== undefined) {
      const tempVaccineName = [...vaccineName, currentVaccine[vaccineComponents.length]]
      const tempVaccineDate = [...vaccineDate, currentDate[vaccineComponents.length]]
      setVaccineName(tempVaccineName)
      setVaccineDate(tempVaccineDate)
      handleVaccine(tempVaccineName, tempVaccineDate)
    }
    if (vaccineName[counter] !== undefined && vaccineDate[counter] != undefined) {
      setCounter(counter + 1)
      setVaccineComponents([...vaccineComponents, "add"])
    }}

  function onClickRemove() {
    console.log(counter)
    if (counter > 0) {
      setCounter(counter - 1) }
    const tempVaccineCompo: string[] = vaccineComponents.slice()
    tempVaccineCompo.pop()
    setVaccineComponents(tempVaccineCompo)
    const tempVaccineDate: string[] = vaccineDate.slice()
    tempVaccineDate.pop()
    const tempVaccineName: string[] = vaccineName.slice()
    tempVaccineName.pop()
    if (tempVaccineCompo.length === 0) {
      handleRecord(true)
    } else {
      if (currentVaccine[counter] !== undefined){
        setVaccineDate(tempVaccineDate)
        setVaccineName(tempVaccineName)
        handleVaccine(tempVaccineName, tempVaccineDate)
      }
    }}

  const handleVaccineChange = (name: string, index: number) => {
    const tempVaccineName = [...vaccineName]
    tempVaccineName[index] = name
    setVaccineName(tempVaccineName)
    handleVaccine(tempVaccineName, vaccineDate)
  }

  const handleDateChange = (date: string, index: number) => {
    const tempVaccineDate = [...vaccineDate]
    tempVaccineDate[index] = date
    setVaccineDate(tempVaccineDate)
    handleVaccine(vaccineName, tempVaccineDate)
  }

  useEffect(() => {
    setVaccineComponents(new Array(currentVaccine.length).fill("add"));
  }, []);

  return (
  <section className={styles.vaccines_con}>
    <p>Vaccination Records</p>
    <p className={styles.booklet}>Vaccination Booket *</p>
    <div className={styles.cameraWrapper}>
    <label htmlFor="booklet" className={styles.photo_form}>
    {file !== undefined && 
        (<img src={file}
        className={styles.previewImg}/>)}</label>
    <input type="file" id='booklet'
    onChange={handleFileChange}
    accept="image/*"
    hidden/>
    </div>
    {/* <VaccineRecord/> */}
    <p>Vaccine Details</p>
    {vaccineComponents.map((_, index) => (
    <div key={'vaccine' + index}>
    <EditRecord
      id={'vaccine' + index}
      index={index}
      onVaccineChange={handleVaccineChange}
      onDateChange={handleDateChange}
      currentVaccine={currentVaccine[index]}
      currentDate={currentDate[index]}
    ></EditRecord>
    </div>))}
    <div className={styles.buttonWrapper}>
    <button type='button' className={styles.add_btn} 
    onClick={onClickAdd} >
    </button>
    <button type='button' className={styles.remove_btn} 
    onClick={onClickRemove} >-</button>
    </div>
  </section>
  )
}
