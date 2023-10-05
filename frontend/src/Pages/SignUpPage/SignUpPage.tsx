import styles from './SignUpPage.module.css'
import { Form, redirect } from 'react-router-dom'
import { baseAPI } from '../../main'
import { useState } from 'react'

export async function action({ request }: { request: any }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  console.log(updates)
  await baseAPI.post('/userAPI/register/', updates)
  .then((response) => {
    console.log(response.data.data)
  })
  return redirect(`/login`)
}

export const SignUpPage = () => {
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const PasswordHandler = evt => {
    setPassword(evt.target.value)

    // console.log(evt.target.value)
  }
  const CheckPasswordHandler = evt => {
    setCheckPassword(evt.target.value)
    if (checkPassword === password && checkPassword !== "") {
      console.log('pass')
    } else {
      console.log('not matched')
    }
    // console.log(evt.target.value)
  }

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Form method='post' className={styles.create_form}>
        <label htmlFor="profile_image">img</label>
        <input type="file" id='profile_image' hidden />
        <div className={styles.input_container}>
          <div className={styles.username_signup}>
            <label htmlFor="username_signup">Username</label>
            <input type="text" id='username_signup' name='username' required />
          </div>
          <div className={styles.phone_signup}>
            <label htmlFor="phone_signup">Phone</label>
            <input type="text" id='phone_signup' name='phoneNumber' required />
          </div>
          <div className={styles.password_signup}>
            <label htmlFor="password_signup">Password</label>
            {/* <input type="password" id='password_signup' name='password' required /> */}
            <input onBlur={PasswordHandler} type="password" id='password_signup' name='password' required />
          </div>
          <div className={styles.check_password_signup}>
            <label htmlFor="check_password_signup">Confirm Password</label>
            {/* <input type="password" id='check_password_signup' required /> */}
            <input onBlur={CheckPasswordHandler} type="password" id='check_password_signup' required />
          </div>
          <div className={styles.name_signup}>
            <label htmlFor="name_signup">Name</label>
            <input type="text" id='name_signup' name='firstName' required />
          </div>
          <div className={styles.surname_signup}>
            <label htmlFor="lastName_signup">LastName</label>
            <input type="text" id='last_name_signup' name='lastName' required />
          </div>
          <div className={styles.address_signup}>
            <label htmlFor="address_signup">Address</label>
            <input type="text" id='address_signup' name='address' required />
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
