import styles from './UploadPhoto.module.css'
// import upload_icon from '../../../public/camera-symbol.svg'
import { useRef} from 'react'

export const UploadPhoto = () => {
  // const iconRef = useRef<HTMLInputElement>(null!);

  return (
    <>
      <label className={styles.photo_form} htmlFor="photo">file</label>
      <input  type='file' id='photo'  hidden/>
    </>
    
  )
}
