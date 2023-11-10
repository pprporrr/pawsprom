import styles from './EditVacinationRecord.module.css'
import { VaccineRecord } from './VaccineRecord'
import { ChangeEvent, useEffect, useState } from 'react'

type EditVacinationProps = {
  handleVaccine: (vaccines: string[], dates: Date[]) => Promise<void>
}

export const EditVacinationRecord: React.FC<EditVacinationProps> = ({handleVaccine}) => {
  const [vaccineRecordList, setVaccineList] = useState([])
  const [vaccineComponents, setVaccineComponents] = useState<string[]>(["init"])
  const [vaccineName, setVaccineName] = useState<string[]>([])
  const [vaccineDate, setVaccineDate] = useState<Date[]>([])
  const [previewImage, setPreviewImage] = useState(null)
  const [file, setFile] = useState<string>();

  const handleFileChange = (event: any) => {
    let blob = new Blob([event.target.files[0]])
    if (blob.size > 9) {
    setFile(URL.createObjectURL(blob))}
  }

  function onClickAdd() {
    setVaccineComponents([...vaccineComponents, "add"])
  }

  function onClickRemove() {
    const tempVaccineCompo: string[] = vaccineComponents.slice()
    let popEle = tempVaccineCompo.pop()
    if (popEle !== 'init'){
    setVaccineComponents(tempVaccineCompo)

    const tempVaccineDate: Date[] = vaccineDate.slice()
    tempVaccineDate.pop()
    setVaccineDate(tempVaccineDate)

    const tempVaccineName: string[] = vaccineName.slice()
    tempVaccineName.pop()
    setVaccineName(tempVaccineName)
    }
  }

  const handleVaccineChange = (name: string, index: number) => {
    const tempVaccineName = [...vaccineName]
    tempVaccineName[index] = name
    setVaccineName(tempVaccineName)
    handleVaccine(tempVaccineName, vaccineDate)
  }

  const handleDateChange = (date: Date, index: number) => {
    const tempVaccineDate = [...vaccineDate]
    tempVaccineDate[index] = date
    setVaccineDate(tempVaccineDate)

    handleVaccine(vaccineName, tempVaccineDate)
  }

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
    hidden required/>
    </div>
    {/* <VaccineRecord/> */}
    <p>Vaccine Details</p>
    {vaccineComponents.map((_, index) => (
    <VaccineRecord key={index} 
    index={index} 
    onVaccineChange={handleVaccineChange}
    onDateChange={handleDateChange}
    ></VaccineRecord>
    ))}
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
