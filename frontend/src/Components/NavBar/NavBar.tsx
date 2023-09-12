import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <div className={styles.nav_container}>
      <section className={styles.left_side}>
        <section >pic</section>
        <p>PawsPr้om</p>
      </section>
      <section className={styles.right_side}>
        <a href='/'>Home</a>
        <a href='/create'>create</a>
        <a href='/p'>username</a>
      </section>
    </div>
  )
}
