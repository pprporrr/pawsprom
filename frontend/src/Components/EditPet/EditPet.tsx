import styles from './EditPet.module.css'
import { EditPhoto } from './EditPhoto'
import { SaveNcancelButton } from '../SaveNcancelButton/SaveNcancelButton'
import { FormEvent, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { baseAPI } from '../../main'
import { EditInfoPet } from '../EditInfoPet/editInfoPet'
import { mockPet } from '../mockData/mockData'
import cloneDeep from 'lodash/cloneDeep'

type InputFormat = {
  petName: string,
  dateofbirth: string,
  age: number, 
  gender: string, 
  weight: number,
  breed: string, 
  description?: string,
  color: string,
  species: string,
}

export const EditPet = ({params}:any) => {
  const navigate = useNavigate()
  const [VaccineName, setVaccineName] = useState<string[]>()
  const [VaccineDate, setVaccineDate] = useState<string[]>()
  const inputData: any = cloneDeep(mockPet)
  const [noRecord, setNoRecord] = useState<boolean>(false)
  
  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const currentData: any = useLoaderData()
    
    const { petName, dateofbirth, age, gender, weight, breed, description, color, species,
      feature1, feature2, feature3, feature4, feature5, feature6, feature7,
      feature8, feature9, feature10, feature11, 
      photoUpload1, photoUpload2, photoUpload3, 
      //booklet

      } = event.target as typeof event.target & {
      petName: { value: string, id: keyof InputFormat }
      dateofbirth: { value: string, id: keyof InputFormat}
      age: { value: number, id: keyof InputFormat }
      gender: { value: string, id: keyof InputFormat }
      weight: { value: number, id: keyof InputFormat }
      breed: { value: string, id: keyof InputFormat }
      description: { value: string, id: keyof InputFormat }
      color: { value: string, id: keyof InputFormat }
      species: { value: string, id: keyof InputFormat }
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

    // * check string if no input
    const checkList: InputFormat = {petName: petName.value, 
    dateofbirth: dateofbirth.value, age: age.value,
    gender: gender.value, weight: weight.value, 
    breed: breed.value, description: description.value, 
    color: color.value, species: species.value}
    const nameList: (keyof InputFormat)[] = ['petName','dateofbirth', 'age', 
      'gender', 'weight', 'breed', 'description', 'color', 'species']
      // ! test
    const petID = params.petID
    let tempData: any= {petID: petID}
    for (let i = 0; i < Object.keys(checkList).length; i++) {
      if (checkList[nameList[i]] === '') {
        if (inputData[nameList[i]] !== undefined) {
        tempData = { ...tempData, [nameList[i]]:inputData[nameList[i]]}
      }
      } else {
        tempData = { ...tempData, [nameList[i]]: checkList[nameList[i]]}
      }
    }

    //* check vaccination
    let inputVaccine: any = []
    let inputVaccineDate: any = []
    if (VaccineName !== undefined && VaccineName.length === 0) {
      if (noRecord === false){
        inputVaccine = mockPet['vaccinationName']
        inputVaccineDate = mockPet['vaccinationDate']
      } 
    } else {
      if (VaccineName === undefined) {
        inputVaccine = mockPet['vaccinationName']
        inputVaccineDate = mockPet['vaccinationDate']
      } else {
        if (noRecord === false) {
        inputVaccine = VaccineName
        inputVaccineDate = VaccineDate
        } else {
        inputVaccine = []
        inputVaccineDate = []
    }}}
    
    //* check fetaures
    let tempFeatures = {
      feature1: feature1.checked, feature2: feature2.checked, 
      feature3: feature3.checked, feature4: feature4.checked, 
      feature5: feature5.checked, feature6: feature6.checked,
      feature7: feature7.checked, feature8: feature8.checked,
      feature9: feature9.checked, feature10: feature10.checked,
      feature11: feature11.checked}
    tempData = { ...tempData, features: tempFeatures}

    //* check images
    const formData = new FormData()
    let EditPhoto = [photoUpload1.files[0], photoUpload2.files[0], photoUpload3.files[0]]

    for (let i=0; i<EditPhoto.length; i++)
    if (EditPhoto[i] !== undefined) {
      formData.append('imageFiles', EditPhoto[i])
    }
    if (inputVaccine[0] === inputVaccine[1]) {
      inputVaccine = inputVaccine.slice(1)
      inputVaccineDate = inputVaccineDate.slice(1)
    }

    //! vvvvv check vvvv
    // * ================= API ======================
    // * post general info 
    await baseAPI.put('/petAPI/update-profile/',
      tempData)
      .then((response) => {
        console.log(response.data)
    })

    //* post images
    //! test
    if (Object.entries(formData).length !== 0) {
    await baseAPI.post(`/imageAPI/upload-petImage/${petID}/`,
    formData)
      .then((response) => {
        console.log(response.data)
    })}

    //* post vaccine
    // await baseAPI.post(`/vaccinationAPI/vaccination/`,
    //   { petID: petID,
    //     vaccinationName: inputVaccine,
    //     vaccinationDate: inputVaccineDate,})
    //   .then((response) => {
    //     console.log(response.data)
    // })
  
    navigateAfterDelay()
  }
  // * ================= API ======================

    const navigateAfterDelay = () => {
      setTimeout(() => {
        navigate("userprofile/:username")
        // navigate(`userprofile/${username}`)
      }, 2000)
    }

    const submitVaccine = async(vaccines: string[], dates: string[]) => {
        setVaccineDate(dates)
        setVaccineName(vaccines)
      }

    const handleRecord = async(noRecord: boolean) => {
      setNoRecord(noRecord)
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
    handleVaccine={submitVaccine}
    handleRecord={handleRecord}/>
    <SaveNcancelButton />
    </Form>
  </section>
  )
}


