
import styles from './VaccineRecord.module.css'

interface VaccineRecordProps {
  index: number
  onVaccineChange: (text: string, index: number) => void;
  onDateChange: (date: Date, index: number) => void;
}

export const VaccineRecord: React.FC<VaccineRecordProps> = ({index, onVaccineChange, onDateChange}) => {
  // const [vaccineName, setVaccineName] = useState<string | null>()

  function onChangeVaccine() {
    let ele = document.getElementById('vaccine' + index.toString()) as HTMLInputElement | null
    if (ele != null) {
      let text = ele?.value.toString()
      onVaccineChange(text, index)
    }
  }

  function onChangeDate() {
    let ele = document.getElementById('dateVaccine' + index.toString()) as HTMLInputElement | null
    if (ele != null) {
      let text = (ele?.value).split('-')
      let date = new Date(Number(text[0]), Number(text[1]), Number(text[2]))
      onDateChange(date, index)
    }
  }

  return (
  <div className={styles.vaccine_con}>
    <label htmlFor={'vaccine' + index.toString()}>Vaccine</label>
    <input type="text" id={'vaccine' + index.toString()} required onChange={onChangeVaccine}/>
    <label htmlFor={'dateVaccine' + index.toString()}>Date</label>
    <input type="date" id={'dateVaccine' + index.toString()} required onChange={onChangeDate}/>
  </div>
  )
}