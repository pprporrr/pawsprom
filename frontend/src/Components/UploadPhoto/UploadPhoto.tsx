import styles from './UploadPhoto.module.css'
// import upload_icon from '../../../public/camera-symbol.svg'
import { useRef} from 'react'

export const UploadPhoto = () => {
  // const iconRef = useRef<HTMLInputElement>(null!);


  return (
    <>
      <label htmlFor="file">file</label>
      <input className={styles.photo_form} type='file' name='file'/>
    </>
    
  )
}
