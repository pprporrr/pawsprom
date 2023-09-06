import React from 'react'
import styles from './InfoPet.module.css'

export const InfoPet = () => {
  return (
    <div className={styles.main_container}>
      <section className={styles.container}>
        <div className={styles.name_con}>
          <label htmlFor="name">Name</label>
          <input type="text" name='name'/>
        </div>
        <div className={styles.dob_con}>
          <label htmlFor="dob">Date of Birth</label>
          <input type="text" name='dob'/>
        </div>
        <div className={styles.age_con}>
          <label htmlFor="age">Age</label>
          <input type="text" name='age'/>
        </div>
        <div className={styles.address_con}>
          <label htmlFor="address">Address</label>
          <input type="text" name='address'/>
        </div>
        <div className={styles.gender_con}>
          <label htmlFor="gender">Gender</label>
          <input type="text" name='gender'/>
        </div>
        <div className={styles.weight_con}>
          <label htmlFor="weight">Weight</label>
          <input type="text" name='weight'/>
        </div>
        <div className={styles.breed_con}>
          <label htmlFor="breed">Breed</label>
          <input type="text" name='breed'/>
        </div>
        <div className={styles.bio_con}>
          <label htmlFor="bio">Bio</label>
          <input type="text" name='bio'/>
        </div>
        <div className={styles.color_con}>
          <label htmlFor="color">Color</label>
          <input type="text" name='color'/>
        </div>
        <div className={styles.species_con}>
          <label htmlFor="species">Species</label>
          <input type="text" name='species'/>
        </div>
      </section>
      <section className={styles.vaccines_con}>
        <label htmlFor="vaccines">Vaccines</label>
        <input type="text" />
      </section>
      <section className={styles.features_con}>
        <p>Features</p>
        <div className={styles.seperate_lab_box}>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature1">Can live with children of any age</label>
            <input type="checkbox" name='feature1'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature2">Can live with other dogs</label>
            <input type="checkbox" name='feature2'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature3">Can live with other cats</label>
            <input type="checkbox" name='feature3'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature4">Shots up to date</label>
            <input type="checkbox" name='feature4'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature5">Microchipped</label>
            <input type="checkbox" name='feature5'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature6">House-trained</label>
            <input type="checkbox" name='feature6'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature7">Purebred</label>
            <input type="checkbox" name='feature7'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature8">Special Needs</label>
            <input type="checkbox" name='feature8'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature9">Behavioral Issues</label>
            <input type="checkbox" name='feature9'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature10">Neutered</label>
            <input type="checkbox" name='feature10'/>
          </div>
          <div className={styles.flex_seperate}>
            <label htmlFor="feature11">Handicap</label>
            <input type="checkbox" name='feature11'/>
          </div>
        </div>
      </section>
    </div>
  )
}
