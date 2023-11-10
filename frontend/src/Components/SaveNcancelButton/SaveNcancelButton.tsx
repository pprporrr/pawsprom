import { useNavigate } from 'react-router-dom'
import styles from './SaveNcancelButton.module.css'

export const SaveNcancelButton = () => {
  const navigate = useNavigate()
  
  const navigateAfterDelay = () => {
    setTimeout(() => {
      navigate("userprofile/:username")
      // navigate(`userprofile/${username}`)
    }, 2000)
  }
  return (
    <section className={styles.btn_container}>
      <input type='button' 
      className={styles.cancel_btn} 
      value={"Cancel"}
      onClick={navigateAfterDelay}/>
      <input type='submit' 
      className={styles.save_btn} 
      value={"Save"}/>
    </section>
  )
}
