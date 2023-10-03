import styles from './SignUpPage.module.css'
import axios from 'axios'
import { Form, useNavigate } from 'react-router-dom'
import { FormEvent } from 'react'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const baseAPI = axios.create({
    baseURL: "http://10.26.10.55"
  });
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { username_signup, password_signup, name_signup,
      lastName_signup, phone_signup, address_signup } = event.target as typeof event.target & {
        username_signup: { value: string }
        password_signup: { value: string }
        name_signup: { value: string }
        lastName_signup: { value: string }
        phone_signup: { value: string }
        address_signup: { value: string }
      }
    baseAPI.post('/userAPI/register/',
      {
        username: username_signup.value, password: password_signup.value,
        firstName: name_signup.value, lastName: lastName_signup.value,
        phoneNumber: phone_signup.value, address: address_signup.value
      })
      .then((response) => {
        console.log(response.data)
      })
    navigate(`/login`)
  }

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Form onSubmit={evt => { sendForm(evt) }} className={styles.create_form}>
        <label htmlFor="profile_image">img</label>
        <input type="file" id='profile_image' hidden />
        <div className={styles.input_container}>
          <div className={styles.username_signup}>
            <label htmlFor="username_signup">Username</label>
            <input type="text" id='username_signup' />
          </div>
          <div className={styles.phone_signup}>
            <label htmlFor="phone_signup">Phone</label>
            <input type="text" id='phone_signup' />
          </div>
          <div className={styles.password_signup}>
            <label htmlFor="password_signup">Password</label>
            <input type="password" id='password_signup' />
          </div>
          <div className={styles.check_password_signup}>
            <label htmlFor="check_password_signup">Confirm Password</label>
            <input type="password" id='check_password_signup' />
          </div>
          <div className={styles.name_signup}>
            <label htmlFor="name_signup">Name</label>
            <input type="text" id='name_signup' />
          </div>
          <div className={styles.surname_signup}>
            <label htmlFor="lastName_signup">LastName</label>
            <input type="text" id='lastName_signup' />
          </div>
          <div className={styles.address_signup}>
            <label htmlFor="address_signup">Address</label>
            <input type="text" id='address_signup' />
          </div>
        </div>
        <div className={styles.button_container}>
          <input type="button" className={styles.cancel_btn} value={"Cancel"} />
          <input type="submit" className={styles.submit_btn} />
        </div>
      </Form>
    </div>
  )
}
