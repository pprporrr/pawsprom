import styles from './LoginPage.module.css'
import axios from 'axios'
import { useNavigate, Form } from 'react-router-dom'
import { FormEvent } from 'react'
import { baseAPI } from '../../main'

export const LoginPage = () => {
  const navigate = useNavigate();
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { username, password } = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    };
    baseAPI.post('/userAPI/login/',
      { username: username.value, password: password.value })
      .then((response) => {
        console.log(response.data)
        const clientUsername = response.data.data.username
        const clientRole = response.data.data.role
        // localStorage.setItem('ID', JSON.stringify({
        //   username: clientUsername,
        //   role: clientRole
        // }))
        if (clientRole === "User") {
          navigate(`/userprofile`)
        }
        else if (clientRole === "ShelterStaff") {
          navigate(`/shelterprofile`)
        }
      });
    // navigate(`/petprofileowned/${username.value}`)
  };
  return (
    <div className={styles.container}>
      <h1>PawsPr้om</h1>
      <Form onSubmit={evt => { sendForm(evt) }}>
        <section>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' required />
          </div>
        </section>
        <button >Log in</button>
      </Form>
      <p>Don't have account? <a href="/signup"> Sign up</a></p>
    </div>
  )
}
