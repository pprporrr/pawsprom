import styles from './InfoPet.module.css'
import { AddVacinationRecord } from './AddVacinationRecord'
import { FeaturesPet } from './FeaturesPet'

type InfoPetProps = {
  handleVaccine: (vaccines: string[], dates: Date[]) => Promise<void>
}

export const InfoPet: React.FC<InfoPetProps> = ({handleVaccine}) => {

  return (
    <div className={styles.main_container}>
      <section className={styles.container}>
        <div className={styles.name_con}>
          <label htmlFor="name">Name *</label>
          <input type="text" id='name' required/>
        </div>
        <div className={styles.dob_con}>
          <label htmlFor="dob">Date of Birth *</label>
          <input type="Date" id='dob' required/>
        </div>
        <div className={styles.age_con}>
          <label htmlFor="age">Age *</label>
          <input type="number" id='age' required/>
        </div>
        <div className={styles.bio_con}>
          <label htmlFor="bio">Bio</label>
          {/* <input type="text" id='address' required/> */}
          <textarea id='bio'required></textarea>
        </div>
        <div className={styles.gender_con}>
          <label htmlFor="gender">Gender *</label>
          <input type="text" id='gender' required/>
        </div>
        <div className={styles.weight_con}>
          <label htmlFor="weight">Weight *</label>
          <input type="number" id='weight' required/>
        </div>
        <div className={styles.breed_con}>
          <label htmlFor="breed">Breed</label>
          <input type="text" id='breed'/>
        </div>
        {/* <div className={styles.address_con}>
          <label htmlFor="address">Address *</label>
          <textarea id='address'required></textarea>
        </div> */}
        <div className={styles.color_con}>
          <label htmlFor="color">Color</label>
          <input type="text" id='color'/>
        </div>
        <div className={styles.species_con}>
          <label htmlFor="species">Species</label>
          <input type="text" id='species'/>
        </div>
      </section>
      <AddVacinationRecord handleVaccine={handleVaccine}/>
      <FeaturesPet/>
    </div>
  )
}
