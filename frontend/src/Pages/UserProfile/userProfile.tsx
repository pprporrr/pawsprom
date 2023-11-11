import styles from './userProfile.module.css'
import { useRef } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { StyledCardDisplay } from '../../Components/CardDisplay/Card.styles' 
import { baseAPI } from '../../main'

type LoaderState = {
  username:string
  firstName:string
  lastName:string
  phoneNumber:string
  address:string
  role:string
  pets:any
}

type singleResult = {
  petName: string
  species: string
  breed: string
  availabilityStatus: string
  imageIDs: number[]
  features: {
  feature1: boolean
  feature2: boolean
  feature3: boolean
  feature4: boolean
  feature5: boolean
  feature6: boolean
  feature7: boolean
  feature8: boolean
  feature9: boolean
  feature10: boolean
  feature11: boolean
  },
  name: string
  phone: string
  address: string
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
  const req = {"username": username, "userRole": role}
  const response = await baseAPI.post('/petAPI/dashboard/info/', req)
  const defaultPets = response.data.data
  // console.log(defaultPets)
  
  const resOptions: any = response
  const pets = Object.entries(resOptions)
      .filter(([key, value]) => key != 'color')
  const defaultSpecies = pets.map(([key, _]) => ({
      label: key,
      value: key
    }))
  const defaultBreed = pets
    .map(([_, value]) => value).flat()
    .map((value) => ({
      label: value,
      value: value
    }))
  const defaultColor = Object.entries(resOptions)
    .filter(([key, _]) => key === 'color')
    .map(([_, value]) => (value)).flat()
    .map((value) => ({
      label: value,
      value: value
    }))

  return {username, firstName, lastName, phoneNumber, address, role,
          species: defaultSpecies, 
          breed: defaultBreed,
          color: defaultColor,
          pets: defaultPets
};
}

const sideScroll = (
  element: HTMLDivElement,
  speed: number,
  distance: number,
  step: number
) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  },speed);
}

//todo: add profile pic
export const UserProfile = () => {
  const cardWrapper = useRef(null);
  const requestCardWrapper = useRef(null);
  const { username, firstName, lastName, phoneNumber,address,pets} = useLoaderData() as LoaderState
  const userPetData = {
    "username" : username,
    "phone": phoneNumber,
    "address": address}
  const petsOwnedLength = pets.Owned.length
  const petsReqLength = pets.Requested.length
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        <img className={styles.profile_pic} src="/testpic.jpg" alt="profile" />
        <div className={styles.user_info}>
          <h2>{username}</h2>
          <p>{firstName} {lastName}</p>
          <p>{address}</p>
          <p>{phoneNumber}</p>
          {/* <p>number pets</p> */}
        </div>
        <Link to={`/edit/${username}`}>
          <p>Edit user profile</p>
          <button>&#43;</button> 
        </Link>
      </section>
      <section className={styles.owned_pet}>
        <h3>Pets</h3>
        { petsOwnedLength === 0 ? 
          (
            <Link to='/'>
              <button>&#43;</button> 
              <p>Start adding your pet!</p>
            </Link>
          )
          :
          (
            <div className={styles.cards_container}>
              <button onClick={() => {sideScroll(cardWrapper.current,1,350,-10)}}>l</button>
              <div className={styles.cards_wrapper} ref={cardWrapper}>
                {pets.Owned.map((petData: singleResult)=>{
                  // console.log(userPetData)
                  // console.log(petData)
                  return (
                    <StyledCardDisplay 
                    width='16rem'
                    height='fit-content'
                    bg='#FFE9DA'
                    border='none'
                    url="https://www.google.com"
                    key={petData.breed + petData.petName} 
                    data={petData}
                    userData={userPetData}/>
                  )
                })}
              </div>
              <button onClick={() => {sideScroll(cardWrapper.current,1,350,13)}}>r</button>
              <Link to='/'>
                <button>&#43;</button> 
                <p>Adding more pets</p>
              </Link>
            </div>
          )
        }
      </section>
      <section className={styles.requested_pet}>
        <h3>Request</h3>
        { petsReqLength === 0 ? 
          (
            <Link to='/'>
              <button>&#43;</button> 
              <p>No request</p>
            </Link>
          )
          :
          (
          <div className={styles.request_card_container}>
            <button onClick={() => {sideScroll(requestCardWrapper.current,1,350,-10)}}>l</button>
            <div className={styles.cards_wrapper} ref={requestCardWrapper}>
            {pets.Requested.map((petData: singleResult)=>{
              return (
                <StyledCardDisplay 
                width='16rem'
                height='fit-content'
                bg='#FFE9DA'
                border='none'
                url="https://www.google.com"
                key={petData.breed + petData.petName} 
                data={petData}
                userData={userPetData}/>
              )
            })}
            </div>
            <button onClick={() => {sideScroll(requestCardWrapper.current,1,350, 10)}}>r</button>
          </div>
          )
        }
      </section>
    </div>
  )
}
