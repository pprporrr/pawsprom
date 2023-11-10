import styles from './EditPet.module.css'
import { EditPhoto } from './EditPhoto'

import { SaveNcancelButton } from '../SaveNcancelButton/SaveNcancelButton'
import { FormEvent, useState } from 'react'
import { Form, useLoaderData, useNavigate } from 'react-router-dom'
import { baseAPI } from '../../main'
import { InfoPet } from '../InfoPet/InfoPet'
import { EditInfoPet } from '../EditInfoPet/editInfoPet'
import { mockPet } from '../mockData/mockData'


export const EditPet = () => {
  const navigate = useNavigate()
  const [VaccineName, setVaccineName] = useState<string[]>()
  const [VaccineDate, setVaccineDate] = useState<Date[]>()
  
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const currentData: any = useLoaderData()
    // TODO: post picture
    const { name, dob, age, address, gender, weight, breed, bio, color, species,
      feature1, feature2, feature3, feature4, feature5, feature6, feature7,
      feature8, feature9, feature10, feature11, 
      photoUpload1, photoUpload2, photoUpload3, booklet} = event.target as typeof event.target & {
      name: { value: string }
      dob: { value: string }
      age: { value: number }
      address: { value: string }
      gender: { value: string }
      weight: { value: number }
      breed: { value: string }
      bio: { value: string }
      color: { value: string }
      species: { value: string }
      feature1: { checked: boolean }
      feature2: { checked: boolean }
      feature3: { checked: boolean }
      feature4: { checked: boolean }
      feature5: { checked: boolean }
      feature6: { checked: boolean }
      feature7: { checked: boolean }
      feature8: { checked: boolean }
      feature9: { checked: boolean }
      feature10: { checked: boolean }
      feature11: { checked: boolean }
      photoUpload1: { files: any }
      photoUpload2: { files: any }
      photoUpload3: { files: any }
      booklet: { files: any }
    }
    
    //! vvvvv check vvvv

    let photoList = [photoUpload1.files[0], 
    photoUpload2.files[0], photoUpload3.files[0]]

    const formData = new FormData();
    for (let i = 0; i < 3; i++) {
      if (photoList[i] !== undefined){
        formData.append('imageFiles', photoList[i])
      }
    }

    // * ================= API ======================
    // * post general info 
    await baseAPI.post('/petAPI/create-profile/byUser/',
      {
        petName: name.value, dateofbirth: dob.value,
        age: age.value, address: address.value,
        gender: gender.value, weight: weight.value,
        breed: breed.value, description: bio.value,
        color: color.value, species: species.value,
        availabilityStatus: 'Available',
        features: {
          feature1: feature1.checked,
          feature2: feature1.checked,
          feature3: feature1.checked,
          feature4: feature1.checked,
          feature5: feature1.checked,
          feature6: feature1.checked,
          feature7: feature1.checked,
          feature8: feature1.checked,
          feature9: feature1.checked,
          feature10: feature1.checked,
          feature11: feature1.checked,
        },
        userID: 202,
      })
      .then((response) => {
        console.log(response.data)
      })
      
    //* post images
    //! test
    let petID = 102
    await baseAPI.post(`/imageAPI/upload-petImage/${petID}/`,
      formData)
      .then((response) => {
        console.log(response.data)
    })

    if (VaccineDate !== undefined) {
    const formattedDate = []
    for (let i = 0; i < VaccineDate.length; i++) {
      formattedDate.push(VaccineDate[i].toISOString().split('T')[0])
    }
    //* post vaccine
    await baseAPI.post(`/vaccinationAPI/vaccination/`,
      { petID: petID,
        vaccinationName: VaccineName,
        vaccinationDate: formattedDate,})
      .then((response) => {
        console.log(response.data)
    })

    }

    navigateAfterDelay()
  }
  // * ================= API ======================

    const navigateAfterDelay = () => {
      setTimeout(() => {
        navigate("userprofile/:username")
        // navigate(`userprofile/${username}`)
      }, 2000)
    }

    const submitVaccine = async(vaccines: string[], dates: Date[]) => {
      setVaccineDate(dates)
      setVaccineName(vaccines)
    }
    

  return (
    <section className={styles.create_pet_container}>
      <h1 className={styles.head}>Create Pet Profile</h1>
      <Form onSubmit={evt => { sendForm(evt) }}>
        <section className={styles.photo_area}>
          <EditPhoto id={'photoUpload1'}
          currentPhoto={'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'}/>
          <EditPhoto id={'photoUpload2'}
          currentPhoto={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg'}/>
          <EditPhoto id={'photoUpload3'}
          currentPhoto={'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg'}/>
        </section>
        <EditInfoPet
        data={mockPet}
        handleVaccine={submitVaccine}/>
        <SaveNcancelButton />
      </Form>
    </section>
  )
}
function async() {
  throw new Error('Function not implemented.')
}


