import styles from './CreatePet.module.css'
import { UploadPhoto } from './UploadPhoto'
import { InfoPet } from '../InfoPet/InfoPet'
import { SaveNcancelButton } from '../SaveNcancelButton/SaveNcancelButton'

export const CreatePet = () => {
  return (
    <section className={styles.createpet_container}>
      <h1 className={styles.head}>Create Pet Profile</h1>
      <form>
        <section className={styles.photo_area}>
          <UploadPhoto/>
          <UploadPhoto/>
          <UploadPhoto/>
        </section>
        <InfoPet/>
        <SaveNcancelButton/>
      </form>
    </section>
  )
}
