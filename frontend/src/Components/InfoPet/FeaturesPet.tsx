import styles from './FeaturesPet.module.css'

export const FeaturesPet = () => {
  return (
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
  )
}
