import styles from './InfoPet.module.css'

export const InfoPet = () => {
  return (
    <div className={styles.main_container}>
      <section className={styles.container}>
        <div className={styles.name_con}>
          <label htmlFor="name">Name</label>
          <input type="text" id='name'/>
        </div>
        <div className={styles.dob_con}>
          <label htmlFor="dob">Date of Birth</label>
          <input type="text" id='dob'/>
        </div>
        <div className={styles.age_con}>
          <label htmlFor="age">Age</label>
          <input type="text" id='age'/>
        </div>
        <div className={styles.address_con}>
          <label htmlFor="address">Address</label>
          <input type="text" id='address'/>
        </div>
        <div className={styles.gender_con}>
          <label htmlFor="gender">Gender</label>
          <input type="text" id='gender'/>
        </div>
        <div className={styles.weight_con}>
          <label htmlFor="weight">Weight</label>
          <input type="text" id='weight'/>
        </div>
        <div className={styles.breed_con}>
          <label htmlFor="breed">Breed</label>
          <input type="text" id='breed'/>
        </div>
        <div className={styles.bio_con}>
          <label htmlFor="bio">Bio</label>
          <input type="text" id='bio'/>
        </div>
        <div className={styles.color_con}>
          <label htmlFor="color">Color</label>
          <input type="text" id='color'/>
        </div>
        <div className={styles.species_con}>
          <label htmlFor="species">Species</label>
          <input type="text" id='species'/>
        </div>
      </section>
      <section className={styles.vaccines_con}>
        <p>Vaccination Records</p>
        <div>
          <label htmlFor="vaccine">Vaccines</label>
          <input type="text" id='vaccine'/>
          <label htmlFor="date">Date</label>
          <input type="text" id='date' />
        </div>
      </section>
      <section className={styles.features_con}>
        <p>Features</p>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature1">Can live with children of any age</label>
          <input type="checkbox" id='feature1'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature2">Can live with other dogs</label>
          <input type="checkbox" id='feature2'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature3">Can live with other cats</label>
          <input type="checkbox" id='feature3'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature4">Shots up to date</label>
          <input type="checkbox" id='feature4'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature5">Microchipped</label>
          <input type="checkbox" id='feature5'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature6">House-trained</label>
          <input type="checkbox" id='feature6'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature7">Purebred</label>
          <input type="checkbox" id='feature7'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature8">Special Needs</label>
          <input type="checkbox" id='feature8'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature9">Behavioral Issues</label>
          <input type="checkbox" id='feature9'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature10">Neutered</label>
          <input type="checkbox" id='feature10'/>
        </div>
        <div className={styles.flex_seperate}>
          <label htmlFor="feature11">Handicap</label>
          <input type="checkbox" id='feature11'/>
        </div>
      </section>
    </div>
  )
}
