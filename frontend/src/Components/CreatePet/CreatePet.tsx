import styles from './CreatePet.module.css'
import {UploadPhoto} from '../UploadPhoto/UploadPhoto'
import { InfoPet } from '../InfoPet/InfoPet'

export const CreatePet = () => {
  return (
    <section className={styles.create_pet_container}>
      <h1 className={styles.head}>Create Pet Profile</h1>
      <form action="" method='post'>
        <section className={styles.photo_area}>
          <UploadPhoto/>
          <UploadPhoto/>
          <UploadPhoto/>
        </section>
        {/* <section> */}
          <InfoPet/>
        {/* </section> */}
        <section>
          <button>
            cancel
          </button>
          <button>
            save
          </button>
        </section>
      </form>
    </section>
  )
}
