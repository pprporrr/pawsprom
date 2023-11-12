import styles from './EditRecord.module.css'

type EditRecordProps = {
  index: number
  onVaccineChange: (text: string, index: number) => void
  onDateChange: (date: string, index: number) => void
  currentVaccine: string
  currentDate: string
  id: string
}

export const EditRecord: React.FC<EditRecordProps> = 
({id, index, onVaccineChange, onDateChange, currentDate, currentVaccine}) => {
  // const [vaccineName, setVaccineName] = useState<string | null>(currentVaccine)

  function onChangeVaccine() {
    let ele = document.getElementById('vaccine' + id) as HTMLInputElement | null
    if (ele != null) {
      let text = ele?.value.toString()
      onVaccineChange(text, index)
    }
  }

  function onChangeDate() {
    let ele = document.getElementById('dateVaccine' + id) as HTMLInputElement | null
    if (ele != null) {
      let text = (ele?.value).split('-')
      let date = new Date(Number(text[0]), Number(text[1]), Number(text[2]))
      const year = date.getFullYear();
      const month = String(date.getMonth()).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      onDateChange(formattedDate, index)
    }
  }

  return (
  <div className={styles.vaccine_con}>
    <label htmlFor={'vaccine' + id}>Vaccine</label>
    <input type="text" id={'vaccine' + id}
    placeholder={currentVaccine} onChange={onChangeVaccine}/>
    <label htmlFor={'dateVaccine' + id}>Date</label>
    <input type="date" id={'dateVaccine' + id} 
    placeholder={currentDate !== undefined ? 
    currentDate.toString() : ''} onChange={onChangeDate}/>
  </div>
  )
}