import styles from './LoginPage.module.css'
import axios from 'axios'
import { useNavigate,Form } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

export const LoginPage = () => {
  const navigate = useNavigate()
  
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { username, password } = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
      //! test
      userRole: { value: string }
    }
    // axios.post()
    // const hash = await bcrypt.hash(password.value,saltOrRounds)
    localStorage.setItem('ID', JSON.stringify({
      username: username.value,
      // password: bcrypt.hash(password.value, 10),
      password: password.value,
      userRole: "user"
    }))
    navigate(`/login/PetProfileOwned/${username.value}`)
    localStorage.clear()
  }

  return (
    <div className={styles.container}>
      <h1>PawsPr้om</h1>
      {/* <button onClick={() => { localStorage.clear() }}>clear</button> */}
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
