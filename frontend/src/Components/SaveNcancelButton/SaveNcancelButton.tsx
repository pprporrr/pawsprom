import styles from './SaveNcancelButton.module.css'

export const SaveNcancelButton = () => {
  return (
    <section className={styles.btn_container}>
      <button className={styles.cancel_btn}>
        cancel
      </button>
      <button className={styles.save_btn}>
        save
      </button>
    </section>
  )
}
