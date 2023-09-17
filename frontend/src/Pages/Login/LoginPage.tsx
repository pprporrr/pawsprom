import styles from './LoginPage.module.css'
import { FormEvent, useState } from 'react'

const sendForm = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const {username, password} = event.target as typeof event.target & {
    username: {value:string}
    password: {value:string}
  }
  localStorage.setItem('ID',JSON.stringify({
    username: username.value,
    password: password.value
  }))  
}


export const LoginPage = () => {

  return (
    <div className={styles.container}>
      <h1>PawsPr้om</h1>
      <form onSubmit={evt => {sendForm(evt)}}>
        <section>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password"id='password' required/>
          </div>
        </section>
        <button>Log in</button>
      </form>
      <p>Don't have account? <a href="/signup">Sign up</a></p>
    </div>
  )
}
