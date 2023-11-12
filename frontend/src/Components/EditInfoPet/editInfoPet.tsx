import styles from './editInfoPet.module.css'
import { EditVacinationRecord } from './EditVacinationRecord'
import { EditFeaturesPet } from './EditFeaturesPet'
import { useState } from 'react'

type EditInfoPetProps = {
  handleVaccine: (vaccines: string[], dates: string[]) => Promise<void>
  data: any
  handleRecord: (noRecord: boolean) => Promise<void>
}

export const EditInfoPet: React.FC<EditInfoPetProps> = ({handleVaccine, data, handleRecord}) => {
  const [inputData, setInputData] = useState<any>(data)

  const handleValueChange = (event: any) => {
    const value = event.target.value
    const id = event.target.id
    let tempData = inputData
    if (inputData[id] === undefined) {
      setInputData({...tempData, id: value})
    } else {
      let tempData = data
      tempData[id] = value
      // console.log(tempData)
      setInputData(tempData)
    }}

  return (
    <div className={styles.main_container}>
      <section className={styles.container}>
        <div className={styles.name_con}>
          <label htmlFor="petName">Name *</label>
          <input type="text" id='petName' 
          placeholder={data.petName} 
          onChange={handleValueChange}/>
        </div>
        <div className={styles.dob_con}>
          <label htmlFor="dateofbirth">Date of Birth *</label>
          <input 
          type="Date" id='dateofbirth'
          placeholder={data.dateofbirth} 
          onChange={handleValueChange}/>
        </div>
        <div className={styles.age_con}>
          <label htmlFor="age">Age *</label>
          <input type="number" id='age' 
          placeholder={data.age} 
          onChange={handleValueChange}/>
        </div>
        <div className={styles.bio_con}>
          <label htmlFor="description">Bio</label>
          {/* <input type="text" id='address' required/> */}
          <textarea id='description'
          placeholder={data.description} 
          onChange={handleValueChange}></textarea>
        </div>
        <div className={styles.gender_con}>
          <label htmlFor="gender">Gender *</label>
          <input type="text" id='gender'
          placeholder={data.gender} 
          onChange={handleValueChange}/>
        </div>
        <div className={styles.weight_con}>
          <label htmlFor="weight">Weight *</label>
          <input type="number" id='weight'
          placeholder={data.weight} 
          onChange={handleValueChange}/>
        </div>
        <div className={styles.breed_con}>
          <label htmlFor="breed">Breed</label>
          <input type="text" id='breed'
          placeholder={data.breed}
          onChange={handleValueChange}/>
        </div>
        {/* <div className={styles.address_con}>
          <label htmlFor="address">Address *</label>
          <textarea id='address'
          value={data.address} 
          onChange={handleValueChange}></textarea>
        </div> */}
        <div className={styles.color_con}>
          <label htmlFor="color">Color</label>
          <input type="text" id='color'
          placeholder={data.color}
          onChange={handleValueChange}/>
        </div>
        <div className={styles.species_con}>
          <label htmlFor="species">Species</label>
          <input type="text" id='species'
          placeholder={data.species}
          onChange={handleValueChange}/>
        </div>
      </section>
      <EditVacinationRecord
      handleRecord={handleRecord}
      currentDate={data.vaccinationDate}
      currentVaccine={data.vaccinationName}
      currentBooklet='https://files.jotform.com/jotformapps/dog-shot-record-template-b51438242ac27fb9ebe9b558646589b9_og.png'
      handleVaccine={handleVaccine}/>
      <EditFeaturesPet currentFeatures={data.features}/>
    </div>
  )
}
