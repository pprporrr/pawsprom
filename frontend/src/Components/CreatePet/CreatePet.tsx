import styles from './CreatePet.module.css'
import { UploadPhoto } from './UploadPhoto'
import { InfoPet } from '../InfoPet/InfoPet'
import { SaveNcancelButton } from '../SaveNcancelButton/SaveNcancelButton'
import { FormEvent } from 'react'
import { Form } from 'react-router-dom'
import { baseAPI } from '../../main'

export const CreatePet = () => {
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: post picture
    const { name, dob, age, address, gender, weight, breed, bio, color, species } = event.target as typeof event.target & {
      name: { value: string }
      dob: { value: string }
      age: { value: string }
      address: { value: string }
      gender: { value: string }
      weight: { value: string }
      breed: { value: string }
      bio: { value: string }
      color: { value: string }
      species: { value: string }
    }
    //! vvvvv check vvvv
    baseAPI.post('/petAPI/create-profile/byUser/',
      {
        name: name.value, dateOfBirth: dob.value,
        age: age.value, address: address.value,
        gender: gender.value, weight: weight.value,
        breed: breed.value, bio: bio.value,
        color: color.value, species: species.value
      })
      .then((response) => {
        console.log(response.data)
      })
    // navigate(`/petprofileowned/${username.value}`)
  }
  return (
    <section className={styles.create_pet_container}>
      <h1 className={styles.head}>Create Pet Profile</h1>
      <Form onSubmit={evt => { sendForm(evt) }}>
        <section className={styles.photo_area}>
          <UploadPhoto />
          <UploadPhoto />
          <UploadPhoto />
        </section>
        <InfoPet />
        <SaveNcancelButton />
      </Form>
    </section>
  )
}
