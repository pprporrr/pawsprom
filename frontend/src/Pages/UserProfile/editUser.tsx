import { baseAPI } from '../../main'
import styles from './editUser.module.css'
import { Form, redirect } from 'react-router-dom'

export async function action({ request }: { request: any }) {
  const formData = await request.formData()
  let updates = Object.fromEntries(formData)
  const local:any = localStorage.getItem('ID')
  const username = JSON.parse(local).username
  const userID = JSON.parse(local).userID
  updates =  {...updates, "userID":userID}
  console.log(updates) 
  await baseAPI.put('/userAPI/user/', updates)
    .then((response) => {
      console.log(response)
      localStorage.setItem('ID', JSON.stringify({
        username: updates.username,
        userID: userID,
        role: "User",
        firstName: updates.firstName,
        lastName: updates.lastName,
        phoneNumber: updates.phoneNumber,
        address: updates.address
    }))
  })
  return redirect(`/userprofile/${username}`)
}

export const EditUser = () => {
  
  return (
    <div className={styles.container}>
      <h1>Edit User Profile</h1>
      <Form method='post' className={styles.create_form}>
        <div className={styles.profile_container}>
          <label htmlFor="profile_image">
						<img className={styles.photo_icon} src="/change-pic-button.svg" alt="" />
            <img className={styles.profile_image} src="/testpic.jpg" alt="" />
          </label>
          <input type="file" id='profile_image' hidden />
        </div>
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
            <input type="text" id='address_signup' name='address'/>
          </div>
        </div>
        <div className={styles.button_container}>
          <input type="button" className={styles.cancel_btn} value={"Cancel"} />
          <input type="submit" className={styles.submit_btn}  value={"Save"}/>
        </div>
      </Form>
    </div>
  )

}
