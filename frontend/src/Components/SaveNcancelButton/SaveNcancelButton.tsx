import styles from './SaveNcancelButton.module.css'

export const SaveNcancelButton = () => {
  return (
    <section className={styles.btn_container}>
      <input type='button' className={styles.cancel_btn} value={"Cancel"}/>
      <input type='submit' className={styles.save_btn} value={"Save"}/>
    </section>
  )
}
