import styles from './CreatePet.module.css'
import { UploadPhoto } from './UploadPhoto'
import { InfoPet } from '../InfoPet/InfoPet'
import { SaveNcancelButton } from '../SaveNcancelButton/SaveNcancelButton'
import { FormEvent, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { baseAPI } from '../../main'

export const CreatePet = () => {
  const navigate = useNavigate()
  const [VaccineName, setVaccineName] = useState<string[]>()
  const [VaccineDate, setVaccineDate] = useState<Date[]>()
  
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: post picture
    const { name, dob, age, gender, weight, breed, bio, color, species,
      feature1, feature2, feature3, feature4, feature5, feature6, feature7,
      feature8, feature9, feature10, feature11, 
      photoUpload1, photoUpload2, photoUpload3,
      // booklet
    } = event.target as typeof event.target & {
      name: { value: string }
      dob: { value: string }
      age: { value: number }
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
      // booklet: { files: any }
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
        age: age.value,
        gender: gender.value, weight: weight.value,
        breed: breed.value, description: bio.value,
        color: color.value, species: species.value,
        availabilityStatus: 'Available',
        features: {
          feature1: feature1.checked,
          feature2: feature2.checked,
          feature3: feature3.checked,
          feature4: feature4.checked,
          feature5: feature5.checked,
          feature6: feature6.checked,
          feature7: feature7.checked,
          feature8: feature8.checked,
          feature9: feature9.checked,
          feature10: feature10.checked,
          feature11: feature11.checked,
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
          <UploadPhoto id={'photoUpload1'}/>
          <UploadPhoto id={'photoUpload2'}/>
          <UploadPhoto id={'photoUpload3'}/>
        </section>
        <InfoPet handleVaccine={submitVaccine}/>
        <SaveNcancelButton />
      </Form>
    </section>
  )
}


