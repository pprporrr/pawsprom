import styles from './shelterProfile.module.css'
import { useState, useRef } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { StyledCardDisplay } from '../../Components/CardDisplay/Card.styles'
import { baseAPI } from '../../main'
import { toNumber } from 'lodash'

type LoaderState = {
  username:string
  shelterName:string
  shelterAddress:string
  sheltercontactInfo:string
  shelterphoneNumber:string
  role:string
  pets:any
  shelterID: number
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

export async function loader({params}:any) {
  const local = localStorage.getItem('ID')
  const shelterID = toNumber(params.shelterID)
  // const shelterID = '501'
  let username: string = ""
  let shelterName: string = ""
  let shelterAddress: string = ""
  let sheltercontactInfo: string = ""
  let shelterphoneNumber: string = ""
  let role: string = ""
  let defaultPets: any = []
  let defaultSpecies: any = []
  let defaultBreed: any = []
  let defaultColor: any = []
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

  const req = {"username": username, "userRole": role}
  const userReq = {"username": username, "userRole": role,"shelterID": shelterID}
  console.log(userReq)
  try {
    if (role === "ShelterStaff") {
      const response = await baseAPI.post('/petAPI/dashboard/info/', req)
      defaultPets = response.data.data
      console.log(defaultPets)
      const resOptions: any = response
      const pets = Object.entries(resOptions)
          .filter(([key, _]) => key != 'color')
    
      defaultSpecies = pets.map(([key, _]) => ({
          label: key,
          value: key
        }))
      defaultBreed = pets
        .map(([_, value]) => value).flat()
        .map((value) => ({
          label: value,
          value: value
        }))
      defaultColor = Object.entries(resOptions)
        .filter(([key, _]) => key === 'color')
        .map(([_, value]) => (value)).flat()
        .map((value) => ({
          label: value,
          value: value
        }))
    } else {
      const response = await baseAPI.post('/petAPI/dashboard/info/', userReq)
      defaultPets = response.data.data
      console.log(defaultPets)
      const resOptions: any = response
      const pets = Object.entries(resOptions)
          .filter(([key, _]) => key != 'color')
    
      defaultSpecies = pets.map(([key, _]) => ({
          label: key,
          value: key
        }))
      defaultBreed = pets
        .map(([_, value]) => value).flat()
        .map((value) => ({
          label: value,
          value: value
        }))
      defaultColor = Object.entries(resOptions)
        .filter(([key, _]) => key === 'color')
        .map(([_, value]) => (value)).flat()
        .map((value) => ({
          label: value,
          value: value
        }))
    }
  }
  catch (error) {
    defaultPets = null
    console.error("Error wrong user:", error)
  }

  return { username, shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber, 
    role, shelterID, 
    species: defaultSpecies, 
    breed: defaultBreed,
    color: defaultColor,
    pets: defaultPets};
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
export const ShelterProfile = () => {
  const [hide, setHide] = useState(true)
  const cardWrapper = useRef(null);
  const requestCardWrapper = useRef(null);
  const { shelterName, shelterAddress, shelterphoneNumber, pets, role, shelterID} = useLoaderData() as LoaderState
  const shelterPetData = {
    "username" : shelterName,
    "phone": shelterphoneNumber,
    "address": shelterAddress}
  // const petsAvailableLength = pets.Available.length
  // const petsReqLength = pets.Requested.length
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        <img className={styles.profile_pic} src="/testpic.jpg" alt="profile" />
        <div className={styles.user_info}>
          <h2>{shelterName}</h2>
          <p><img src="/location-symbol.svg" alt="" />{shelterAddress}</p>
          <p><img src="/phone-symbol.svg" alt="" />{shelterphoneNumber}</p>
        </div>
      </section>
      <section className={styles.owned_pet}>
        <h3>Pets</h3>
        { role !== 'ShelterStaff' && pets.Available.length === 0? 
          (
            <div className={styles.cards_container}>
              <button onClick={() => {sideScroll(cardWrapper.current!,1,350,-10)}}>l</button>
              <div className={styles.cards_wrapper} ref={cardWrapper}>
                {pets.Available.map((petData: singleResult)=>{
                  return (
                    <StyledCardDisplay 
                    width='16rem'
                    height='fit-content'
                    bg='#FFE9DA'
                    border='none'
                    url={`petprofileshelter/${petData.petName}`}
                    key={petData.breed + petData.petName} 
                    data={petData}
                    userData={shelterPetData}/>
                  )
                })}
              </div>
              <button onClick={() => {sideScroll(cardWrapper.current!,1,350,13)}}>r</button>
            </div>
          )
          : role !== 'ShelterStaff' && pets.Available.length !== 0?
          (
            <p>Nothing here</p>
          )
          : role === 'ShelterStaff' && pets.Available.length === 0?
          (
            <Link to='/'>
              <button>&#43;</button> 
              <p>Start adding your pet!</p>
            </Link>
          ) 
          : 
          (
            <div className={styles.cards_container}>
              <button onClick={() => {sideScroll(cardWrapper.current!,1,350,-10)}}>l</button>
              <div className={styles.cards_wrapper} ref={cardWrapper}>
                {pets.Available.map((petData: singleResult)=>{
                  return (
                    <StyledCardDisplay 
                    width='16rem'
                    height='fit-content'
                    bg='#FFE9DA'
                    border='none'
                    url={`petprofileshelter/${petData.petName}`}
                    key={petData.breed + petData.petName} 
                    data={petData}
                    userData={shelterPetData}/>
                  )
                })}
              </div>
              <button onClick={() => {sideScroll(cardWrapper.current!,1,350,13)}}>r</button>
              <Link to='/'>
                <button>&#43;</button> 
                <p>Adding more pets</p>
              </Link>
            </div>
          )
          
        }
      </section>
      <section className={styles.request_for_pet} >
      <h3>Requests waiting for</h3>
      {role !== 'ShelterStaff' ? 
        (
          // setHide(false)
          <>
          </>
        )
        : role === 'ShelterStaff' && pets.Requested.length === 0?
        (
          <Link to='/'>
            <button>&#43;</button> 
            <p>No request</p>
          </Link>
        ) : (
        <div className={styles.request_card_container}>
          <button onClick={() => {sideScroll(requestCardWrapper.current!,1,350,-10)}}>l</button>
          <div className={styles.cards_wrapper} ref={requestCardWrapper}>
          {pets.Requested.map((petData: singleResult)=>{
            return (
              <StyledCardDisplay 
              width='16rem'
              height='fit-content'
              bg='#FFE9DA'
              border='none'
              url={`petprofileshelter/${petData.petName}`}
              key={petData.breed + petData.petName} 
              data={petData}
              userData={shelterPetData}/>
            )
          })}
          </div>
          <button onClick={() => {sideScroll(requestCardWrapper.current!,1,350, 10)}}>r</button>
        </div>
        )
      }
      </section>
    </div>
  )
}