import styles from './NavBar.module.css'
import { Link, useLoaderData } from 'react-router-dom'

type LoaderState = {
  username:string,
  role:string
}

export async function loader() {
  const local = localStorage.getItem('ID')
  let username: string = ""
  let role: string = ""
  try {
    if (local !== null) {
      const parseData = JSON.parse(local)
      username = parseData.username
      role = parseData.role
    }
  }
  catch (error) {
    console.error('Error parsing localStorage data:', error)
  }
  return { username, role };
}

export function NavBar() {
  const { username, role } = useLoaderData() as LoaderState
  return (
    <div className={styles.nav_container}>
      <section className={styles.left_side}>
        <img src="/pawsprom_logo.svg" />
        <p>PawsPr้om</p>
      </section>
      <section className={styles.right_side}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        {username === "" ?
          (
            <p>
              <Link to="/login">Login</Link> / <Link to="/signup">Register</Link>
            </p>
          ) : role === "User" ?
            (
              <Link to={`/userprofile/${username}`}>{username}</Link>
            ) : (
              <Link to={`/shelterprofile/${username}`}>{username}</Link>
            )
        }
      </section>
    </div>
  )
}
