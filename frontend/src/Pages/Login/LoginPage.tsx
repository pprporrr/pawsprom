import styles from './LoginPage.module.css'
import axios from 'axios'
import { useNavigate, Form } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

export const LoginPage = () => {
  const navigate = useNavigate()
  const baseAPI = axios.create({
    baseURL: "http://10.26.10.55"
  });

  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { username, password } = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    }
    baseAPI.post('/userAPI/login/',
      { username: username.value, password: password.value })
      .then((response) => {
        console.log(response.data)
      })
    localStorage.setItem('ID',JSON.stringify({
      username: username.value
    }))
    navigate(`/petprofileowned/${username.value}`)
  }

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
