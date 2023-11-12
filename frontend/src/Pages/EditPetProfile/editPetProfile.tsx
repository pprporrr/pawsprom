// import styles from'./editPetProfile.module.css'
import { EditPet } from '../../Components/EditPet/EditPet'
import { baseAPI } from '../../main'
// import { useLoaderData } from 'react-router-dom'

export async function petDataLoader() {
    
    const petID = 103
    let response = await baseAPI.post('/petAPI/info-long/', { petID })
    console.log(response.data.data)
    return null
}

export const EditPetProfile = () => {

    return (
    <>
    <EditPet/>
    </>
    )
}
