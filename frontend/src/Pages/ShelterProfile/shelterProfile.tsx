import styles from './shelterProfile.module.css'
import { useRef } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { StyledCardDisplay } from '../../Components/CardDisplay/Card.styles'

type LoaderState = {
  username:string,
  shelterName:string,
  shelterAddress:string,
  sheltercontactInfo:string,
  shelterphoneNumber:string,
  role:string
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
  const response = {
    'Dog': ['Labrador Retriever','German Shepherd','Golden Retriever',
            'Bulldog','Poodle','Beagle','Rottweiler','Yorkshire Terrier',
            'Boxer','Dachshund'],
    'Cat': ['Siamese','Maine Coon','Persian','Ragdoll','British Shorthair',
            'Bengal','Sphynx','Abyssinian','Scottish Fold','Burmese'],
  
    'color' : ['Black','White','Gray','Brown','Orange']}
      // ! test
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
    // ! test
  const defaultPets = [{
    petName: 'Max',
    species: 'Dog',
    breed: 'Labrador',
    age: 1,
    availabilityStatus: 'Available',
    imageIDs: [1],
    features: {
    feature1: true,
    feature2: false,
    feature3: true,
    feature4: false,
    feature5: true,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
    feature10: false,
    feature11: false,
    },
    name: 'Happy Paws',
    phone: '0922607795',
    address: 'bangkok soi 1 thailand pathumwan'
},{
    petName: 'Max',
    species: 'Dog',
    breed: 'Shiba',
    availabilityStatus: 'Available',
    age: 5,
    imageIDs: [2],
    features: {
    feature1: true,
    feature2: false,
    feature3: true,
    feature4: false,
    feature5: true,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
    feature10: false,
    feature11: false,
    },
    name: 'Hapy Paws',
    phone: '0922607795',
    address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
},{
    petName: 'Max',
    species: 'Dog',
    breed: 'Siba',
    availabilityStatus: 'Available',
    imageIDs: [2],
    features: {
    feature1: true,
    feature2: false,
    feature3: true,
    feature4: false,
    feature5: true,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
    feature10: false,
    feature11: false,
    },
    name: 'Happy',
    phone: '0922607795',
    address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
},{
    petName: 'Max',
    species: 'Dog',
    breed: 'Siba',
    availabilityStatus: 'Available',
    imageIDs: [2],
    features: {
    feature1: true,
    feature2: false,
    feature3: true,
    feature4: false,
    feature5: true,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
    feature10: false,
    feature11: false,
    },
    name: 'Happy',
    phone: '0922607795',
    address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
},{
    petName: 'Max',
    species: 'Dog',
    breed: 'Siba',
    availabilityStatus: 'Available',
    imageIDs: [2],
    features: {
    feature1: true,
    feature2: false,
    feature3: true,
    feature4: false,
    feature5: true,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
    feature10: false,
    feature11: false,
    },
    name: 'Happy',
    phone: '0922607795',
    address: '209 Mantika Bangbon 3 Rd. Bangbon Bnagkok 10150'
}
]
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
  return { username, shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber, role, 
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
  const cardWrapper = useRef(null);
  const requestCardWrapper = useRef(null);
  const { username, shelterName, shelterAddress, sheltercontactInfo,shelterphoneNumber, pets} = useLoaderData() as LoaderState
  return (
    <div className={styles.container}>
      <section className={styles.profile_info}>
        <img className={styles.profile_pic} src="/testpic.jpg" alt="profile" />
        <div className={styles.user_info}>
          <h2>{shelterName}</h2>
          <p>{shelterAddress}</p>
          <p>{shelterphoneNumber}</p>
          {/* <p>{sheltercontactInfo}</p> */}
          {/* <p>number pets</p> */}
        </div>
      </section>
      <section className={styles.owned_pet}>
        <h3>Pets</h3>
        { username === '' ? 
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
                {pets.map((petData: singleResult)=>{
                  return (
                    <StyledCardDisplay 
                    width='16rem'
                    height='fit-content'
                    bg='#FFE9DA'
                    border='none'
                    url="https://www.google.com"
                    key={petData.breed + petData.petName} 
                    data={petData}/>
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
      <section className={styles.request_for_pet}>
      <h3>Requests waiting for</h3>
        { username === '' ? 
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
            {pets.map((petData: singleResult)=>{
              return (
                <StyledCardDisplay 
                width='16rem'
                height='fit-content'
                bg='#FFE9DA'
                border='none'
                url="https://www.google.com"
                key={petData.breed + petData.petName} 
                data={petData}/>
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