import styles from './userProfile.module.css'

//todo: add profile pic
export const UserProfile = () => {
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        {/* <img src="" alt="" /> */}
        <p>pic</p>
        <div className={styles.user_info}>
          <h2>NONGNOON</h2>
          <p>NONGNOON INWZA</p>
          <p>209 Mantika Soi 1 Bangbon 3 Rd. Bangbon Bangkok</p>
          <p>1235426987932</p>
          <p>number pets</p>
        </div>
      </section>
      <section className={styles.owned_pet}>
        <h2>Pets</h2>
      </section>
      <section className={styles.requested_pet}>
        <h2>Request</h2>
      </section>
    </div>
  )
}
