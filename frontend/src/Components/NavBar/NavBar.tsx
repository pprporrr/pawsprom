import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className={styles.nav_container}>
      <section className={styles.left_side}>
        <section >pic</section>
        <p>PawsPr้om</p>
      </section>
      <section className={styles.right_side}>
        <Link to="/">Home</Link>
        <Link to="/create">create</Link>
        <p>
          <Link to="/login">Login</Link> / <Link to="/signup">Register</Link>
        </p>
      </section>
    </div>
  )
}
