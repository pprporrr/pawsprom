import styles from './SignUpPage.module.css'
import { Form } from 'react-router-dom'

export const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Form className={styles.create_form}>
        <label htmlFor="profile_image">img</label>
        <input type="file" id='profile_image' hidden/>
        <div className={styles.input_container}>
          <div className={styles.username_signup}>
            <label htmlFor="username_signup">Username</label>
            <input type="text" id='username_signup'/>
          </div>
          <div className={styles.phone_signup}>
            <label htmlFor="phone_signup">Phone</label>
            <input type="text" id='phone_signup'/>
          </div>
          <div className={styles.password_signup}>
            <label htmlFor="password_signup">Password</label>
            <input type="text" id='password_signup'/>
          </div>
          <div className={styles.check_password_signup}>
            <label htmlFor="check_password_signup">Confirm Password</label>
            <input type="text" id='check_password_signup'/>
          </div>
          <div className={styles.name_signup}>
            <label htmlFor="name_signup">Name</label>
            <input type="text" id='name_signup'/>
          </div>
          <div className={styles.surname_signup}>
            <label htmlFor="surname_signup">Surname</label>
            <input type="text" id='surname_signup'/>
          </div>
          <div className={styles.address_signup}>
            <label htmlFor="address_signup">Address</label>
            <input type="text" id='address_signup'/>
          </div>
        </div>
        <div className={styles.button_container}>
          <input type="button" className={styles.cancel_btn} value={"Cancel"} />
          <input type="submit" className={styles.submit_btn}/>
        </div>
      </Form>
    </div>
  )
}
