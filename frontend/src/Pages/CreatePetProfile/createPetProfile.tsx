import styles from './createPetProfile.module.css'
import { CreatePet } from '../../Components/CreatePet/CreatePet'

export const CreatePetProfile = () => {
  return (
    <div className={styles.main_container}>
      <section className={styles.header}>header</section>
      {/* <section className={styles.container}> */}
      <CreatePet/>
      {/* </section> */}
      <section className={styles.bottom}>bottom</section>
    </div>
  )
}
