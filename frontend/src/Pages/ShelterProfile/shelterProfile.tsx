import styles from './shelterProfile.module.css'
import { useLoaderData } from 'react-router-dom'

type LoaderState = {
  username:string,
  shelterName:string,
  shelterAddress:string,
  sheltercontactInfo:string,
  shelterphoneNumber:string,
  role:string
}

export async function loader() {
  const local = localStorage.getItem('ID')
  let username: string = ""
  let shelterName: string = ""
  let shelterAddress: string = ""
  let sheltercontactInfo: string = ""
  let shelterphoneNumber: string = ""
  let role: string = ""
  try {
    if (local !== null) {
      const parseData = JSON.parse(local)
      username = parseData.username
      shelterName = parseData.shelterName
      shelterAddress = parseData.shelterAddress
      sheltercontactInfo = parseData.sheltercontactInfo
      shelterphoneNumber = parseData.shelterphoneNumber
      role = parseData.role
    }
  }
  catch (error) {
    console.error('Error parsing localStorage data:', error)
  }
  return { username, shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber, role };
}

//todo: add profile pic
export const ShelterProfile = () => {
  const { username, shelterName, shelterAddress, sheltercontactInfo,shelterphoneNumber} = useLoaderData() as LoaderState
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        {/* <img src="" alt="" /> */}
        <p>pic</p>
        <div className={styles.user_info}>
          <h2>{shelterName}</h2>
          <p>{shelterAddress}</p>
          <p>{shelterphoneNumber}</p>
          {/* <p>{sheltercontactInfo}</p> */}
          {/* <p>number pets</p> */}
        </div>
      </section>
      <section className={styles.owned_pet}>
        <h2>Pets</h2>
      </section>
      <section className={styles.request_for_pet}>
        <h2>Request</h2>
      </section>
    </div>
  )
}