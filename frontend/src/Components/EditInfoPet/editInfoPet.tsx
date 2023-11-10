import styles from './editInfoPet.module.css'
import { EditVacinationRecord } from './EditVacinationRecord'
import { EditFeaturesPet } from './EditFeaturesPet'

type EditInfoPetProps = {
  handleVaccine: (vaccines: string[], dates: Date[]) => Promise<void>
  data: any
}

export const EditInfoPet: React.FC<EditInfoPetProps> = ({handleVaccine, data}) => {

  return (
    <div className={styles.main_container}>
      <section className={styles.container}>
        <div className={styles.name_con}>
          <label htmlFor="name">Name *</label>
          <input type="text" id='name' 
          placeholder={data.petName} required/>
        </div>
        <div className={styles.dob_con}>
          <label htmlFor="dob">Date of Birth *</label>
          <input type="Date" id='dob' 
          placeholder={data.dateofbirth} required/>
        </div>
        <div className={styles.age_con}>
          <label htmlFor="age">Age *</label>
          <input type="number" id='age' 
          placeholder={data.age} required/>
        </div>
        <div className={styles.bio_con}>
          <label htmlFor="bio">Bio</label>
          {/* <input type="text" id='address' required/> */}
          <textarea id='bio'
          placeholder={data.description} required></textarea>
        </div>
        <div className={styles.gender_con}>
          <label htmlFor="gender">Gender *</label>
          <input type="text" id='gender'
          placeholder={data.gender} required/>
        </div>
        <div className={styles.weight_con}>
          <label htmlFor="weight">Weight *</label>
          <input type="number" id='weight'
          placeholder={data.weight} required/>
        </div>
        <div className={styles.breed_con}>
          <label htmlFor="breed">Breed</label>
          <input type="text" id='breed'
          placeholder={data.breed}/>
        </div>
        <div className={styles.address_con}>
          <label htmlFor="address">Address *</label>
          {/* <input type="text" id='bio'/> */}
          <textarea id='address'
          placeholder={data.address} required></textarea>
        </div>
        <div className={styles.color_con}>
          <label htmlFor="color">Color</label>
          <input type="text" id='color'
          placeholder={data.color}/>
        </div>
        <div className={styles.species_con}>
          <label htmlFor="species">Species</label>
          <input type="text" id='species'
          placeholder={data.species}/>
        </div>
      </section>
      <EditVacinationRecord handleVaccine={handleVaccine}/>
      <EditFeaturesPet currentFeatures={data.features}/>
    </div>
  )
}
