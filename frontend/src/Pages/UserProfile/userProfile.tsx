import styles from './userProfile.module.css'
import { useLoaderData, Link } from 'react-router-dom'

type LoaderState = {
  username:string,
  firstName:string,
  lastName:string,
  phoneNumber:string,
  address:string,
  role:string
}

export async function loader() {
  const local = localStorage.getItem('ID')
  let username: string = ""
  let firstName: string = ""
  let lastName: string = ""
  let phoneNumber: string = ""
  let address: string = ""
  let role: string = ""
  try {
    if (local !== null) {
      const parseData = JSON.parse(local)
      username = parseData.username
      firstName = parseData.firstName
      lastName = parseData.lastName
      phoneNumber = parseData.phoneNumber
      address = parseData.address
      role = parseData.role
    }
  }
  catch (error) {
    console.error('Error parsing localStorage data:', error)
  }
  return { username, firstName, lastName, phoneNumber, address, role };
}

//todo: add profile pic
export const UserProfile = () => {
  const { username, firstName, lastName, phoneNumber,address} = useLoaderData() as LoaderState
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        {/* <img src="" alt="" /> */}
        <p>pic</p>
        <div className={styles.user_info}>
          <h2>{username}</h2>
          <p>{firstName} {lastName}</p>
          <p>{address}</p>
          <p>{phoneNumber}</p>
          {/* <p>number pets</p> */}
        </div>
      </section>
      <section className={styles.owned_pet}>
        <h3>Pets</h3>
        {
          username === '' ? 
          (
            <Link to='/'>
              <button>&#43;</button> 
              <p>Start adding your pet!</p>
            </Link>
          )
          :
          (
            <div>
              
            </div>
          )
        }
      </section>
      <section className={styles.requested_pet}>
        <h3>Request</h3>
        <Link to='/'>
          <button>&#43;</button> 
          <p>No request</p>
        </Link>
      </section>
    </div>
  )
}
