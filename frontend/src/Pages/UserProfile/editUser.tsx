import styles from './editUser.module.css'
import { Form } from 'react-router-dom'

export const EditUser = () => {

  return (
    <div className={styles.container}>
      <h1>Edit User Profile</h1>
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
