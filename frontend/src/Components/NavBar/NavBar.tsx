import styles from './NavBar.module.css'
import { Link, useLoaderData } from 'react-router-dom'

// export async function loader() {
//   const username = localStorage.getItem('ID')
//   return { username };
// }

export function NavBar() {
  // const { username } = useLoaderData();
  const checkUsername = localStorage.getItem('ID')
  // const displayUsername = JSON.parse(checkUsername).username
  return (
    <div className={styles.nav_container}>
      <section className={styles.left_side}>
        <section >pic</section>
        <p>PawsPr้om</p>
      </section>
      <section className={styles.right_side}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        {/* <p>
          <Link to="/login">Login</Link> / <Link to="/signup">Register</Link>
        </p> */}
        { checkUsername === null ? 
          <p>
            <Link to="/login">Login</Link> / <Link to="/signup">Register</Link>
          </p>
        : 
          <p>
            {/* <Link to="/login">{displayUsername}</Link> */}
            <Link to="/login">l</Link>
          </p>
        }
      </section>
    </div>
  )
}
